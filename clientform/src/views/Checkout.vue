<template>
    <layout-connected>
        <form id="payment-form">
                <h2>Checkout</h2>
            <div class="columns">
                <div class="column is-4"/>
                <div class="column is-4">
                    <label for="card-element">
                        Credit or debit card
                    </label>
                    <div ref="card" id="card-element">
                        <!-- A Stripe Element will be inserted here. -->
                    </div>
                </div>

                <!-- Used to display Element errors. -->
                <div id="card-errors" role="alert"></div>
            </div>

            <button>Submit Payment</button>
        </form>
    </layout-connected>
</template>

<script>
import { mapGetters } from 'vuex';
import LayoutConnected from "./components/LayoutConnected";

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
        }),
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
