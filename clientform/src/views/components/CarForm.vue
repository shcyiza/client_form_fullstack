<script>
/* eslint-disable import/no-unresolved */
import { mapGetters } from 'vuex';
import ColorPicker from 'vue-color-picker-wheel';

import validateInput from '../../lib/validator_service';
import ValidationInstruction from '../components/form/ValidationInstruction';
import CarSelector from './form/CarSelector.vue';
import BrandAutoComplete from './form/BrandAutoComplete';


const initCarDraft = () => ({
    plate_number: '',
    brand: '',
    model: '',
    color: '',
});

const validators = {
    plate_number: [
        { validate: 'required', instruction: 'a plate number is required.' },
    ],
    brand: [
        { validate: 'required', instruction: 'an brand is required.' },
    ],
    model: [
        { validate: 'required', instruction: 'an model is required.' },
    ],
    color: [
        { validate: 'required', instruction: 'an color is required.' },
    ],
};

export default {
    name: 'CarForm',
    components: {
        CarSelector,
        ValidationInstruction,
        BrandAutoComplete,
        ColorPicker,
    },
    data() {
        return {
            car_draft: initCarDraft(),
            validators,
            brand_autocomplete: {
                show: false,
                last_selected: '',
            },
        };
    },
    computed: {
        ...mapGetters({
            cars: 'getCars',
            user: 'getAuthedUser',
        }),
        plateNumberErrors() {
            return validateInput(this.car_draft.plate_number, 'text', this.validators.plate_number);
        },
        brandErrors() {
            return validateInput(this.car_draft.brand, 'text', this.validators.brand);
        },
        modelErrors() {
            return validateInput(this.car_draft.model, 'text', this.validators.model);
        },
        colorErrors() {
            return validateInput(this.car_draft.color, 'text', this.validators.color);
        },
        showAutocomplete() {
            const { car_draft, brand_autocomplete } = this;
            return brand_autocomplete.show || brand_autocomplete.last_selected !== car_draft.brand;
        },
    },
    methods: {
        addCar(event) {
            event.preventDefault();
            this.$store.dispatch('addCar', this.car_draft);
            this.car_draft = initCarDraft();
        },
        autocompleteBrand(brand_name) {
            this.car_draft.brand = brand_name;
            this.brand_autocomplete.last_selected =  this.car_draft.brand;
            this.brand_autocomplete.show = false;
        },
        closeAutocomplete(event) {
            if (!event.target.classList.contains('ac-el')) {
                this.brand_autocomplete.show = false;
                this.brand_autocomplete.last_selected =  this.car_draft.brand;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.closeAutocomplete);
        this.car_draft.color = '';
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeAutocomplete);
    },
};
</script>

<template>
    <div class="custom-form">
        <h2>Car Form</h2>

        <car-selector :cars="cars" v-if="cars.length > 0"/>

        <form
        id="add-car"
        @submit="addCar"
        >
            <div class="field_div">
                <label class="label">plate number</label>
                <input
                class="input"
                type="text"
                v-model="car_draft.plate_number"
                />
                <validation-instruction
                :errors="plateNumberErrors"
                :validators="validators.plate_number"
                />
            </div>

            <div id="brand-input" class="field_div">
                <label class="label">brand</label>
                <input
                class="input ac-el"
                type="text"
                v-model="car_draft.brand"
                @focus="brand_autocomplete.show = true"
                />
                <brand-auto-complete
                v-if="showAutocomplete"
                :query="car_draft.brand"
                :last_selected="brand_autocomplete.last_selected"
                @input="autocompleteBrand"
                />
                <validation-instruction
                :errors="brandErrors"
                :validators="validators.brand"
                />
            </div>

            <div class="field_div">
                <label class="label">model</label>
                <input
                class="input"
                type="text"
                v-model="car_draft.model"
                />
                <validation-instruction
                :errors="modelErrors"
                :validators="validators.model"
                />
            </div>

            <div class="field_div">
                <label class="label">color car</label>
                <span v-if="car_draft.color">
                    <svg height="32" width="32">
                      <circle cx="16" cy="16" r="15" :fill="car_draft.color" />
                    </svg>
                </span>
                <p style="font-size: 22px" v-else>Please select a color...</p>
                <color-picker v-model="car_draft.color">
                </color-picker>
                <validation-instruction
                :errors="colorErrors"
                :validators="validators.color"
                />
            </div>

            <button class="button" type="submit">Add Car</button>
        </form>
    </div>
</template>

<style lang="sass" scoped>
</style>
