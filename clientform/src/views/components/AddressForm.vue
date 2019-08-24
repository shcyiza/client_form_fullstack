<script>
import { mapGetters } from 'vuex';
import AddressSelector from './form/AddressSelector.vue';

const initAddressDraft = () => ({
    street: '',
    city: '',
    zip: '',
    name: '',
});

export default {
    name: 'AddressForm',
    data() {
        return {
            company_mode: false,
            address_draft: initAddressDraft(),
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
        },
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
            <div v-for="(attr, i) in addressAttr" :key="i">
                <label class="label">{{attr}}</label>
                <input class="input"
                       v-model="address_draft[attr]"
                />
            </div>

            <button class="button" type="submit">Add address</button>
        </form>
    </div>
</template>

<style scoped>

</style>
