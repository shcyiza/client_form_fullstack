<script>
import { mapGetters } from "vuex"
import UserForm from "./components/UserForm"
import CarForm from "./components/CarForm"
import AddressForm from "./components/AddressForm"

export default {
    name: "carwash-form",
    data() {
        return {
            form_name: "Carwash",
            company_code: this.$route.query.company || ""
        }
    },
    components: {
        UserForm,
        CarForm,
        AddressForm
    },
    computed: {
        ...mapGetters({
            company: "getCompanyDetails"
        })
    },
    created() {
        this.$store.dispatch("initCompanyData", this.company_code)
    }
}
</script>

<template>
    <div>
        <h1>{{company.name || "Carjo"}}</h1>
        <h3>{{company.name && "Carjo"}}</h3>
        <div class="columns">
            <user-form class="column form-container"/>
            <car-form class="column form-container"/>
            <address-form class="column form-container"/>
            <div class="column form-container">
                Third column
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.form-container
    padding: 0px 50px 0px 50px
</style>