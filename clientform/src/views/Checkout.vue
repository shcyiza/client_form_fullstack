<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { userOrder } from '../graphql/order';
import { Card, createToken } from 'vue-stripe-elements-plus';

import LayoutConnected from './components/LayoutConnected.vue';
import { TIME_FRAME } from '../helpers/constants';
import { notifyError } from '../helpers/toast_notification';

export default {
    name: 'Checkout',
    data() {
        return {
            order: {},
            card_validated: false,
        };
    },
    components: {
        LayoutConnected,
        Card,
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
        pay() {
            // createToken returns a Promise which resolves in a result object with
            // either a token or an error key.
            // See https://stripe.com/docs/api#tokens for the token object.
            // See https://stripe.com/docs/api#errors for the error object.
            // More general https://stripe.com/docs/stripe.js#stripe-create-token.
            createToken().then((data) => console.log(data.token));
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
};
</script>

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
                    <div ref="stripe" id="card-element">
                        <h1>Please give us your payment details:</h1>
                        <card class='stripe-card'
                              :class='{ card_validated }'
                              stripe='pk_test_FJWLzLqmP5sCjWTyW3UUsepT00LyZIDl9Z'
                              @change='card_validated = $event.complete'
                        />
                        <button class='pay-with-stripe' @click='pay' :disabled='!card_validated'>
                            Pay with credit card
                        </button>
                    </div>
                </div>

                <!-- Used to display Element errors. -->
                <div id="card-errors" role="alert"></div>
            </div>
        </form>
    </layout-connected>
</template>

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
    .stripe-card {
        width: 100%;
        border: 1px solid #cfd7df;
        box-shadow: 0 1px 3px 0 #cfd7df;
        padding: 5px;
        border-radius: 4px;
    }
    .stripe-card.card_validated {
        border-color: green;
    }
</style>
