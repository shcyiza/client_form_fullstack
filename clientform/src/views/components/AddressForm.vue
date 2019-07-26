<script>
    import SitesButtons from './form/SitesButtons'

    export default {
        name: "AddressForm",
        components: {
            SitesButtons
        },
        computed: {
            sites() {
                return this.$store.getters.getCompanySites
            }
        }
    }
</script>

<template>
    <div>
        <h2>Address</h2>
        <sites-buttons :sites="sites"/>
    </div>
</template>

<style scoped>

</style>