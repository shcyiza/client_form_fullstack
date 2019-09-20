<script>
import { mapGetters } from 'vuex';

import ServiceForm from './components/ServiceForm.vue';
import CarForm from './components/CarForm.vue';
import AddressForm from './components/AddressForm.vue';
import InterventionDateField from './components/InterventionDateField.vue';
import LayoutConnected from './components/LayoutConnected';

export default {
    name: 'OrderForm',
    data() {
        return {
            intervention_date: null,
        };
    },
    components: {
        ServiceForm,
        CarForm,
        AddressForm,
        InterventionDateField,
        LayoutConnected,
    },
    computed: {
        ...mapGetters({
            user: 'getAuthedUser',
            validation: 'checkValidity',
            offers: 'getOffers'
        }),
    },
    methods: {
        submitOrder() {
            this.$router.push('checkout_order');
        },
    },
};
</script>

<template>
    <layout-connected>
        <div class="columns">
            <service-form class="column form-container"/>
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
