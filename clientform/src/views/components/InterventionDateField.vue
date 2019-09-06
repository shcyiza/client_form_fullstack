<script>
import { DatePicker } from 'v-calendar';
import moment from 'moment';
import { mapGetters } from 'vuex';
import {TIME_FRAME} from '../../helpers/constants';

export default {
    name: 'InterventionDateField',
    data() {
        return {
            time_frames: TIME_FRAME,
        };
    },
    components: {
        DatePicker,
    },
    computed: {
        ...mapGetters({
            interventionDate: 'interventionDate',
            interventionTimeFrame: 'interventionTimeFrame',
        }),
        datePickerMinimum() {
            return moment().add(2, 'days').format('YYYY-MM-DD');
        },
    },
    methods: {
        selectDate(date) {
            const formated_date = moment(date).format('YYYY-MM-DD');
            this.$store.commit('setInterventionDate', formated_date);
        },
        selectTimeFrame(e) {
            this.$store.commit('setInterventionTimeFrame', e.target.value);
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
        <br>
        <br>
        <h4>Choose a time frame</h4>
        <div class="field">
            <div class="control">
                <div class="select is-info">
                    <select @change="selectTimeFrame" :value="interventionTimeFrame">
                        <option value=""></option>
                        <option
                            v-for="(time_frame, i) in time_frames"
                            :key="i"
                            :value="time_frame.value"
                        >
                            {{time_frame.value}}: {{time_frame.from}} till {{time_frame.till}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>
