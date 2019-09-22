<template>
    <layout-connected>
        <form id="payment-form" v-if="user.email">
                <h2>Checkout</h2>
            <div class="columns">
                <div class="column is-4 has-text-left">
                    <div v-if="order.id">
                        <b>recap:</b>
                        <br>
                        - {{order.offer.name}}
                        <br>
                        - {{order.car.brand}} {{order.car.model}} / {{order.car.plate_number}}
                        <br>
                        - {{order.address.street}}, {{order.address.city}}, {{order.address.zip}}
                        <br>
                        - {{orderInterventionTime}}
                        <hr>
                        <b>total:</b> {{order.offer.nominal_price * (1 + order.offer.vat)}} €
                    </div>
                </div>
                <div class="column is-4" v-if="order.offer">
                    <label for="card-element">
                        Credit or debit card
                    </label>
                    <div ref="stripe" id="card-element">
                        <!-- A Stripe Element will be inserted here. -->
                    </div>
                    <button>Submit Payment</button>
                </div>

                <!-- Used to display Element errors. -->
                <div id="card-errors" role="alert"></div>
            </div>
        </form>
    </layout-connected>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { userOrder } from '../graphql/order';

import LayoutConnected from './components/LayoutConnected.vue';
import { TIME_FRAME } from '../helpers/constants';
import { notifyError } from '../helpers/toast_notification';

const stripe = Stripe('pk_test_FJWLzLqmP5sCjWTyW3UUsepT00LyZIDl9Z');
const elements = stripe.elements();

export default {
    name: 'Checkout',
    data() {
        return {
            order: {},
        };
    },
    components: {
        LayoutConnected,
    },
    computed: {
        ...mapGetters({
            user: 'getAuthedUser',
            validation: 'checkValidity',
            offers: 'getOffers',
        }),
        orderInterventionTime() {
            const date = moment(this.order.intervention_date, 'YYYY-MM-DD').format('LL');
            const timeframe = TIME_FRAME.find((t) => t.value === this.order.intervention_timeframe);

            return `${date} between ${timeframe.from}h and ${timeframe.till}h`;
        },
    },
    methods: {
        getOrderInfo() {
            if (this.user.email) {
                const order_id = localStorage.getItem(`order:${this.user.email}`);
                userOrder(order_id)
                    .then(({ UserOrder }) => {
                        this.order = UserOrder;
                    })
                    .catch((err) => {
                        notifyError('An error occurred, try again later...');
                        throw err;
                    });
            }
        },
    },
    watch: {
        user() {
            this.getOrderInfo();
        },
    },
    created() {
        this.getOrderInfo();
    },
    mounted() {
        const card = elements.create('card');
        card.mount(this.$refs.stripe);
    },
};
</script>

<style scoped>
    .StripeElement {
        box-sizing: border-box;

        height: 40px;

        padding: 10px 12px;

        border: 1px solid black;
        border-radius: 4px;
        background-color: white;

        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
        border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
</style>
