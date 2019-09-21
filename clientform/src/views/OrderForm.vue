<script>
import { mapGetters } from 'vuex';

import OfferForm from './components/OfferForm.vue';
import CarForm from './components/CarForm.vue';
import AddressForm from './components/AddressForm.vue';
import InterventionDateField from './components/InterventionDateField.vue';
import LayoutConnected from './components/LayoutConnected.vue';

export default {
    name: 'OrderForm',
    data() {
        return {
            intervention_date: null,
        };
    },
    components: {
        OfferForm,
        CarForm,
        AddressForm,
        InterventionDateField,
        LayoutConnected,
    },
    computed: {
        ...mapGetters({
            user: 'getAuthedUser',
            validation: 'checkValidity',
            offers: 'getOffers',
        }),
    },
    methods: {
        submitOrder() {
            this.$store.dispatch('checkoutOrder');
        },
    },
};
</script>

<template>
    <layout-connected>
        <div class="columns">
            <offer-form class="column form-container"/>
            <car-form class="column form-container"/>
            <address-form class="column form-container"/>
            <intervention-date-field class="column"/>
        </div>
        <button
        class="button is-large is-success"
        :disabled="!validation.ok"
        @click="submitOrder"
        >
            To checkout!
        </button>
    </layout-connected>
</template>

<style lang="sass" scoped>
.form-container
    padding: 0px 50px 0px 50px
</style>
