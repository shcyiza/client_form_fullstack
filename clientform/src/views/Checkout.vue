<template>
    <div>
        <div class="has-text-left">
            <h5><b>Hey,</b> {{user.first_name}} {{user.last_name}}</h5>
        </div>

        <hr>

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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

const stripe = Stripe('pk_test_FJWLzLqmP5sCjWTyW3UUsepT00LyZIDl9Z');
const elements = stripe.elements();

export default {
    name: 'Checkout',
    computed: {
        ...mapGetters({
            user: 'getAuthedUser',
        }),
    },
    mounted() {
        // Custom styling can be passed to options when creating an Element.
        const style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        };

        // Create an instance of the card Element.
        const card = elements.create('card', { style });

        // Add an instance of the card Element into the `card-element` <div>.
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
