<script>
/* eslint-disable no-undef */

import { mapGetters } from 'vuex';
import AddressSelector from './form/AddressSelector.vue';
import VALID_LOCALITIES from '../../../public/cities.json';
import { notifyError } from '../../helpers/toast_notification';
import ValidationInstruction from './form/ValidationInstruction.vue';

const initAddressDraft = () => ({
    street: '',
    city: '',
    zip: '',
    name: '',
    country_code: '',
});

const validators = [
    { validate: 'country', instruction: 'a country is missing...' },
    { validate: 'postal_code', instruction: 'a postal code is missing...' },
    { validate: 'street_number', instruction: 'a street number is missing...' },
    { validate: 'route', instruction: 'a street is missing...' },
    { validate: 'locality', instruction: 'a locality is missing...' },
];
export default {

    name: 'AddressForm',
    data() {
        return {
            company_mode: false,
            address_draft: initAddressDraft(),
            address_query: '',
            place_error: [],
            validators,
            autocomplete_el: null,
            autocomplete_active: false,
        };
    },
    components: {
        AddressSelector,
        ValidationInstruction,
    },
    computed: {
        ...mapGetters({
            user_addresses: 'getUserAddresses',
            addresses: 'getValidAddresses',
            company_addresses: 'getCompanyAddresses',
        }),
        companyMode() {
            return this.company_addresses.length > 0;
        },
    },
    methods: {
        addOrUpdateAddress(event) {
            event.preventDefault();
            this.$store.dispatch('addAddress', this.address_draft);
            this.address_draft = initAddressDraft();
            this.address_query = '';
        },
        toggleActiveAutocomplete() {
            this.autocomplete_active = true;
        },
        buildAddressDraft(placeObj) {
            if (this.autocomplete_active) {
                const place = this.autocompleter.getPlace() || placeObj;
                const { address_components } = place;

                const relevent_data_types = ['country', 'postal_code', 'street_number', 'route', 'locality'];
                this.place_error = [];
                const work_copy = {};

                this.address_query = place.formatted_address;

                relevent_data_types.forEach((type) => {
                    const data = address_components.find((compo) => compo.types.includes(type));
                    if (data) {
                        work_copy[type] = data && data.short_name;
                    } else {
                        this.place_error.push(type);
                    }
                });

                if (this.place_error.length < 1) {
                    const {
                        country, postal_code: zip, street_number, route, locality: city,
                    } = work_copy;

                    const is_valide_place = VALID_LOCALITIES.find((valide_place) => (
                        valide_place.country === country
                        && valide_place.zip_code === zip
                    ));

                    if (is_valide_place) {
                        this.address_draft = {
                            street: `${route} ${street_number}`, city, zip: `${country}-${zip}`, country_code: `${is_valide_place.country_code}`,
                        };
                    } else {
                        notifyError(`We have no service in ${work_copy.locality} ${work_copy.country}`);
                        this.address_query = '';
                    }
                }
                this.toggleActiveAutocomplete = false;
            }
        },
        handlePlaceChange() {
            if (this.autocomplete_active) {
                // eslint-disable-next-line no-underscore-dangle
                const place_string = this.autocompleter.gm_accessors_.place.Wc.predictions[0].ki;
                const geocoder = new google.maps.Geocoder();

                geocoder.geocode({ address: place_string }, ([place]) => {
                    this.buildAddressDraft(place);
                });
            }
        },
    },
    mounted() {
        this.autocomplete_el = document.querySelector('#AddressQuery');
        this.autocompleter = new google.maps.places.Autocomplete(
            (this.autocomplete_el),
            { types: ['address'] },
        );

        this.autocomplete_el.addEventListener('focusout', this.handlePlaceChange);
        this.autocomplete_el.addEventListener('focusin', this.toggleActiveAutocomplete);

        this.autocompleter.addListener('place_changed', this.buildAddressDraft);
    },
    beforeDestroy() {
        google.maps.event.clearInstanceListeners(this.autocompleter);
        this.autocomplete_el.removeEventListener('blur', this.handlePlaceChange);
        this.autocomplete_el.removeEventListener('focusin', this.toggleActiveAutocomplete);
    },
};
</script>

<template>
    <div>
        <h2>Address</h2>
        <address-selector :addresses="addresses"/>

        <form
        v-if="!companyMode"
        id="add-address"
        @submit="addOrUpdateAddress"
        >
            <div class="field_div">
                <label class="label">search</label>
                <input
                id="AddressQuery"
                class="input"
                v-model="address_query"
                />
                <validation-instruction
                :errors="place_error"
                :validators="validators"
                />
            </div>
            <div class="field_div">
                <label class="label">Name</label>
                <input
                class="input"
                v-model="address_draft.name"
                />
            </div>

            <button
            class="button"
            type="submit"
            :disabled="place_error.length > 0 || !address_query"
            >
                Add address
            </button>
        </form>
    </div>
</template>

<style scoped>

</style>
