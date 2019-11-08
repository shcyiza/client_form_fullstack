<script>
import { chargePayment, getChargeInfo } from '../graphql/payment';
import { notifyError } from '../helpers/toast_notification';
import router from '../router';

import LayoutConnected from './components/LayoutConnected.vue';

export default {
    name: 'ProcessPayment',
    data() {
        return {
            stripe_pk: process.env.VUE_APP_STRIPE_PK,
            payment_info: null,
            is_loading: true,
            message: 'Processing your payment, please wait...',
        };
    },
    components: {
        LayoutConnected,
    },
    computed: {
        user() {
            return this.$store.getters.getAuthedUser;
        },
    },
    methods: {
        PaymentErrorNotification(messasge) {
            const msg = messasge || 'Your payment did not went through, Please contact support!';

            this.message = `!! Error !! ${msg}`;
            this.is_loading = false;
            notifyError(msg);
        },
        getOrderInfo() {
            const { source, client_secret } = this.$route.query;

            getChargeInfo({ payment_ref: source, payment_client_secret: client_secret })
                .then(({ GetChargeInfo }) => {
                    this.payment_info = GetChargeInfo;
                })
                .catch((err) => {
                    this.PaymentErrorNotification('Could not find you order, Please contact support.');
                    throw err;
                });
        },
        processPayment() {
            const stripe = Stripe(this.stripe_pk);

            const MAX_POLL_COUNT = 10;
            let pollCount = 0;

            const pollForSourceStatus = async () => {
                const { payment_ref, payment_client_secret, order_id } = this.payment_info;

                const { source } = await stripe.retrieveSource(
                    {
                        id: payment_ref,
                        client_secret: payment_client_secret,
                    },
                );

                if (source.status === 'chargeable') {
                    this.message = 'OK!';
                    this.is_loading = false;

                    const charge_result = await chargePayment(payment_ref, order_id);

                    if (charge_result.ChargePayment.is_paid) {
                        localStorage.removeItem(`order:${this.user.email}`);
                        router.push('/order_confirmed');
                    } else {
                        this.PaymentErrorNotification();
                    }
                } else if (source.status === 'pending' && pollCount < MAX_POLL_COUNT) {
                    // Try again in a second, if the Source is still `pending`:
                    pollCount += 1;
                    setTimeout(pollForSourceStatus, 1000);
                } else {
                    this.PaymentErrorNotification();
                }
            };

            pollForSourceStatus();
        },
    },
    mounted() {
    },
    watch: {
        payment_info(val) {
            if (val.order_id) {
                this.processPayment();
            }
        },
        user(val) {
            if (val.email) {
                this.getOrderInfo();
            }
        },
    },
};
</script>

<template>
    <layout-connected>
        <div>
            <b-notification :closable="false">
                {{message}}
                <b-loading :is-full-page="false" :active="is_loading" :can-cancel="true"/>
            </b-notification>
        </div>
    </layout-connected>
</template>

<style scoped>

</style>
