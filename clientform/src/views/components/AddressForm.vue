<script>
    import AddressSelector from './form/AddressSelector'
    import { mapGetters } from "vuex"

    const initAddressDraft = () => Object.assign({}, {
        street: '',
        city: '',
        zip: '',
        name: ''
    });

    export default {
        name: 'AddressForm',
        data() {
            return {
                address_draft: initAddressDraft()
            }
        },
        components: {
            AddressSelector
        },
        computed: {
            ...mapGetters({
                addresses: "getUserAddresses",
                user: "getAuthedUser"
            }),
            addressAttr() {
                return Object.keys(this.address_draft)
            }
        },
        methods: {
            addOrUpdateAddress(event) {
                event.preventDefault();
                this.$store.dispatch('addAddress', this.address_draft);
                this.address_draft = initAddressDraft()
            }
        },
    }
</script>

<template>
    <div>
        <h2>Address</h2>
        <address-selector :addresses="addresses"/>

        <form
                id="add-address"
                @submit="addOrUpdateAddress"
        >
            <div v-for="(attr, i) in addressAttr" :key="i">
                <label class="label">{{attr}}</label>
                <input class="input"
                       v-model="address_draft[attr]"
                />
            </div>

            <button class="button" type="submit">Add Car</button>
        </form>
    </div>
</template>

<style scoped>

</style>