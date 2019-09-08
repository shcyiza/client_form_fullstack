<script>
/* eslint-disable no-undef */

import { mapGetters } from 'vuex';
import AddressSelector from './form/AddressSelector.vue';
import ValidZipCodes from '../../../public/cities.json';
import { notifyError } from '../../helpers/toast_notification';

const initAddressDraft = () => ({
    street: '',
    city: '',
    zip: '',
    name: '',
});
// TODO validation
const validators = {
    address_query: [
        { validate: 'required', instruction: 'an address is required.' },
    ],
};

let onPlaceChange;

export default {

    name: 'AddressForm',
    data() {
        return {
            company_mode: false,
            address_draft: initAddressDraft(),
            address_query: '',
        };
    },
    components: {
        AddressSelector,
    },
    computed: {
        ...mapGetters({
            user_addresses: 'getUserAddresses',
            company_addresses: 'getCompanyAddresses',
        }),
        companyMode() {
            return this.company_addresses.length > 0;
        },
        addresses() {
            if (this.companyMode) return this.company_addresses;
            return this.user_addresses;
        },
        addressAttr() {
            return Object.keys(this.address_draft);
        },
    },
    methods: {
        addOrUpdateAddress(event) {
            event.preventDefault();
            this.$store.dispatch('addAddress', this.address_draft);
            this.address_draft = initAddressDraft();
            this.address_query = '';
        },
        buildAddressDraft() {
            const place = this.gMapsAutocomplete.getPlace();
            const { address_components } = place;

            const relevent_data_types = ['country', 'postal_code', 'street_number', 'route', 'locality'];
            const place_error = [];
            const work_copy = {};

            relevent_data_types.forEach((type) => {
                const data = address_components.find((compo) => compo.types.includes(type));
                if (data) {
                    work_copy[type] = data && data.short_name;
                } else {
                    place_error.push(type);
                }
            });

            if (place_error.length < 1) {
                const {
                    country, postal_code: zip, street_number, route, locality: city,
                } = work_copy;

                const is_valide_place = ValidZipCodes.find((valide_place) => (
                    valide_place.country === country
                    && valide_place.zip_code === zip
                ));

                if (is_valide_place) {
                    this.address_draft = { street: `${route} ${street_number}`, city, zip: `${country}-${zip}` };
                    this.address_query = place.formatted_address;
                } else {
                    notifyError(`We have no service in ${work_copy.locality} ${work_copy.country}`);
                    this.address_query = '';
                }
            } else {
                notifyError(`!Your address is missing ${place_error}!`);
            }
        },
    },
    mounted() {
        const query_el = document.querySelector('#AddressQuery');
        this.gMapsAutocomplete = new google.maps.places.Autocomplete(
            (query_el),
            { types: ['geocode'] },
        );

        this.gMapsAutocomplete.addListener('place_changed', this.buildAddressDraft);
    },
    beforeDestroy() {
        google.maps.event.clearInstanceListeners(this.gMapsAutocomplete);
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
            </div>
            <div class="field_div">
                <label class="label">Name</label>
                <input
                class="input"
                v-model="address_draft.name"
                />
            </div>

            <button class="button" type="submit">Add address</button>
        </form>
    </div>
</template>

<style scoped>

</style>
