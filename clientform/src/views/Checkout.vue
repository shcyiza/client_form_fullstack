<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { Card, createToken } from 'vue-stripe-elements-plus';
import { userOrder } from '../graphql/order';
import BillingAddressForm from './components/BillingAddressForm.vue';
import router from '../router';

import LayoutConnected from './components/LayoutConnected.vue';
import { TIME_FRAME } from '../helpers/constants';
import { notifyError } from '../helpers/toast_notification';
import bancontactImg from '../assets/bancontact.svg';
import creditCardImg from '../assets/cards.jpeg';

export default {
    name: 'Checkout',
    data() {
        return {
            order: {},
            card_validated: false,
            activePaymentTab: 0,
            bancontactImg,
            creditCardImg
        };
    },
    components: {
        LayoutConnected,
        Card,
        BillingAddressForm,
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
        totalPrice() {
            return this.order.offer.nominal_price * (1 + this.order.offer.vat);
        },
        fullName() {
            return `${this.user.first_name} ${this.user.last_name}`;
        },
    },
    methods: {
        getOrderInfo() {
            if (this.user.email) {
                const order_id = localStorage.getItem(`order:${this.user.email}`);
                userOrder(order_id)
                    .then(({ UserOrder }) => {
                        this.order = UserOrder;
                        this.$store.commit('setOrderAddress', UserOrder.address.id);
                        this.$store.commit('setOrderBillingAddress', UserOrder.billing_address_id);
                    })
                    .catch((err) => {
                        notifyError('An error occurred, try again later...');
                        throw err;
                    });
            }
        },
        payWithCard() {
            // createToken returns a Promise which resolves in a result object with
            // either a token or an error key.
            // See https://stripe.com/docs/api#tokens for the token object.
            // See https://stripe.com/docs/api#errors for the error object.
            // More general https://stripe.com/docs/stripe.js#stripe-create-token.
            createToken().then((data) => console.log(data.token)).catch((err) => { throw err; });
        },
        payWithBC() {
            const stripe = Stripe('pk_test_FJWLzLqmP5sCjWTyW3UUsepT00LyZIDl9Z');

            stripe.createSource({
                type: 'bancontact',
                amount: Math.round(this.totalPrice * 100),
                currency: 'eur',
                owner: {
                    name: this.fullName,
                },
                redirect: {
                    return_url: `http://localhost:8080/order_confirmed?order=${this.order.id}`,
                },
            }).then(({ source }) => {
                window.open(source.redirect.url, '_blank');
            });
        },
        unpaidAction() {
            router.push('/order_confirmed');
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
        <div class="checkout_container" v-if="user.email">
            <h2>Checkout</h2>
            <hr>
            <div class="columns">
                <div class="column has-text-left">
                    <div v-if="order.id">
                        <h2>Recap</h2>
                        <br>
                        - {{order.offer.name}}
                        <br>
                        - {{order.car.brand}} {{order.car.model}} / {{order.car.plate_number}}
                        <br>
                        - {{order.address.name}}
                        {{order.address.street}},
                        {{order.address.city}},
                        {{order.address.zip}}
                        <br>
                        - {{orderInterventionTime}}
                        <hr>
                        <b>total:</b> {{totalPrice}} €
                        <hr>
                    </div>
                    <billing-address-form class="column form-container"/>
                </div>
                <div class="column">
                    <div class="column">
                        <h2>Payment</h2>
                        <h3>Please choose a payment method:</h3>
                        <hr>
                        <section>
                            <div v-model="activePaymentTab" v-if="user.email && order.id">
                                <div>
                                    <h3>Bancontact</h3>
                                    <div
                                    class="box selector"
                                    @click="payWithBC"
                                    >
                                        <img :src="bancontactImg" width="300">
                                    </div>
                                </div>
                                <hr>
                                <div>
                                    <h3>Visa/Master-Card/AMEX</h3>
                                    <img :src="creditCardImg" width="300">
                                    <form id="payment-form">
                                        <div ref="stripe" id="card-element">
                                            <card
                                            class='stripe-card'
                                            :class='{ card_validated }'
                                            stripe='pk_test_FJWLzLqmP5sCjWTyW3UUsepT00LyZIDl9Z'
                                            @change='card_validated = $event.complete'
                                            />
                                            <button
                                            v-on:click.prevent="payWithCard"
                                            class="pay-with-stripe button is-primary"
                                            :disabled="!card_validated"
                                            >
                                                Pay with credit card
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <hr>
                                <div>
                                    <div
                                    class="box selector"
                                    @click="unpaidAction"
                                    >
                                        Pay later... (we will contact you later)
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <hr>
            <div class="columns payments" v-if="order.offer">
                <div class="column"></div>

                <div class="column"></div>
                <!-- Used to display Element errors. -->
                <div id="card-errors" role="alert"></div>
            </div>
        </div>
    </layout-connected>
</template>

<style scoped>
    .checkout_container{
        padding: 50px;
    }
    .payments{
        min-height: 250px;
    }
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
        border-color: #00d1b2;
    }
</style>
