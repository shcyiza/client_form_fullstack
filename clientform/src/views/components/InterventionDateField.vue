<script>
import { DatePicker } from 'v-calendar';
import moment from 'moment';
import { mapGetters } from 'vuex';

import { TIME_FRAME } from '../../helpers/constants';
import validateInput from '../../lib/validator_service';
import ValidationInstruction from './form/ValidationInstruction';

const validators = {
    intervention_date: [
        { validate: 'required', instruction: 'an intervention date is required.' },
        {
            validate: 'min',
            expected: moment().add(2, 'days').format('YYYYMMDD'),
            instruction: 'We only accept intervention within 48hours.',
        },
    ],
    time_frame: [
        { validate: 'required', instruction: 'a time frame for your intervention is required.' },
    ],
};

export default {
    name: 'InterventionDateField',
    data() {
        return {
            time_frames: TIME_FRAME,
            validators,
        };
    },
    components: {
        DatePicker,
        ValidationInstruction,
    },
    computed: {
        ...mapGetters({
            interventionDate: 'interventionDate',
            interventionTimeFrame: 'interventionTimeFrame',
        }),
        datePickerMinimum() {
            return moment().add(2, 'days').format('YYYY-MM-DD');
        },
        interventionDateErrors() {
            return validateInput(this.interventionDate, 'date', validators.intervention_date);
        },
        timeFrameErrors() {
            return validateInput(this.interventionTimeFrame, 'select', validators.time_frame);
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
            is-inline
            @input="selectDate"
        />
        <validation-instruction
        :errors="interventionDateErrors"
        :validators="validators.intervention_date"
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
                <validation-instruction
                :errors="timeFrameErrors"
                :validators="validators.time_frame"
                />
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>
