<script>
import { mapGetters } from 'vuex';
import { DatePicker } from 'v-calendar';
import moment from 'moment';

import ServiceForm from './components/ServiceForm.vue';
import CarForm from './components/CarForm.vue';
import AddressForm from './components/AddressForm.vue';
import InterventionDateField from './components/InterventionDateField.vue';
import { notifySuccess } from '../helpers/toast_notification';

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
    },
    computed: {
        ...mapGetters({
            user: 'getAuthedUser',
        }),
        datePickerMinimum() {
            return moment().add(2, 'days').format('YYYY-MM-DD');
        },
    },
    methods: {
        getAuthedUser() {
            this.$store.dispatch(
                'fetchAuthedUser',
                this.endSession.bind(this),
            );
        },
        endSession() {
            localStorage.removeItem('user_session_token');
            this.$router.push('/');
        },
        logout() {
            this.endSession();
            notifySuccess('Thank you, see you soon!');
        },
    },
    created() {
        this.getAuthedUser();
    },
};
</script>

<template>
    <div>
        <div class="has-text-left">
            <h5><b>Hey,</b> {{user.first_name}} {{user.last_name}}</h5>
        </div>

        <div class="has-text-right">
            <a class="button is-danger" @click="logout">log out</a>
        </div>

        <hr>

        <div class="columns">
            <service-form class="column form-container"/>
            <car-form class="column form-container"/>
            <address-form class="column form-container"/>
            <intervention-date-field class="column"/>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.form-container
    padding: 0px 50px 0px 50px
</style>
