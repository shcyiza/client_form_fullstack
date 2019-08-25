<script>
import { DatePicker } from 'v-calendar';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    name: 'InterventionDateField',
    components: {
        DatePicker,
    },
    computed: {
        ...mapGetters({
            interventionDate: 'interventionDate',
        }),
        datePickerMinimum() {
            return moment().add(2, 'days').format('YYYY-MM-DD');
        },
    },
    methods: {
        selectDate(date) {
            const formated_date = moment(date).format('YYYY-MM-DD');
            this.$store.commit('setIntervetionDate', formated_date);
        },
    },
};
</script>

<template>
    <div>
        <h2>Choose Date</h2>
        <date-picker
            :value="new Date(interventionDate)"
            :min-date="datePickerMinimum"
            :disabled-dates='{ weekdays: [1] }'
            is-inline
            @input="selectDate"
        />
    </div>
</template>


<style scoped>

</style>
