<script>
    import AddressSelector from './form/AddressSelector'
    import { mapGetters } from "vuex"
    export default {
        name: 'AddressForm',
        components: {
            AddressSelector
        },
        computed: {
            ...mapGetters({
                addresses: "getAddresses",
                user: "getAuthedUser"
            }),
        }
    }
</script>

<template>
    <div>
        <h2>Address</h2>
        <address-selector :addresses="addresses"/>
    </div>
</template>

<style scoped>

</style>