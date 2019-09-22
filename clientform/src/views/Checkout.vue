<template>
    <layout-connected>
        <form id="payment-form">
                <h2>Checkout</h2>
            <div class="columns">
                <div class="column is-4 has-text-left">
                    <b>recap:</b>
                    <br>
                    - {{orderOffer.name}}
                    <br>
                    - {{orderCar.brand}} {{orderCar.model}} / {{orderCar.plate_number}}
                    <br>
                    - {{orderAddress.street}}, {{orderAddress.city}}, {{orderAddress.zip}}
                    <br>
                    - {{orderInterventionTime}}
                    <hr>
                    <b>total:</b> {{orderOffer.nominal_price * (1 + orderOffer.vat)}} €
                </div>
                <div class="column is-4">
                    <label for="card-element">
                        Credit or debit card
                    </label>
                    <div ref="card" id="card-element">
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
import { mapGetters } from 'vuex';
import moment from 'moment';
import LayoutConnected from './components/LayoutConnected.vue';

import { TIME_FRAME } from '../helpers/constants';

const stripe = Stripe('pk_test_FJWLzLqmP5sCjWTyW3UUsepT00LyZIDl9Z');
const elements = stripe.elements();

export default {
    name: 'Checkout',
    components: {
        LayoutConnected,
    },
    computed: {
        ...mapGetters({
            user: 'getAuthedUser',
            company: 'getCompanyInfo',
            order_offer_id: 'offerId',
            offers: 'getOffers',
            cars: 'getCars',
            carId: 'carId',
            addresses: 'getValidAddresses',
            addressId: 'addressId',
            interventionDate: 'interventionDate',
            interventionTimeFrame: 'interventionTimeFrame',
        }),
        orderOffer() {
            return this.offers.find((offer) => offer.id === this.order_offer_id);
        },
        orderCar() {
            return this.cars.find((car) => car.id === this.carId);
        },
        orderAddress() {
            return this.addresses.find((address) => address.id === this.addressId);
        },
        orderInterventionTime() {
            const date = moment(this.interventionDate, 'YYYY-MM-DD').format('LL');
            const timeframe = TIME_FRAME.find((tf) => tf.value === this.interventionTimeFrame);

            return `${date} between ${timeframe.from}h and ${timeframe.till}h`;
        },
    },
    mounted() {
        const card = elements.create('card');
        card.mount(this.$refs.card);
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
