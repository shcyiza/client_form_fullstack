<script>
import { mapGetters } from "vuex"
import CarForm from "./components/CarForm"
import AddressForm from "./components/AddressForm"
import toast from "../helpers/toast_notification"

export default {
    name: "OrderForm",
    data() {
        return {
            form_name: "Order Form",
            company_code: this.$route.query.company || "",
            //user: {},
            //cars: [],
        }
    },
    components: {
        CarForm,
        AddressForm
    },
    computed: {
        ...mapGetters({
            company: "getCompanyDetails",
            user: "getAuthedUser"
        })
    },
    methods: {
        getAuthedUser() {
            this.$store.dispatch(
                "fetchAuthedUser",
                [this.endSession.bind(this), this.$toasted]
            )
        },
        endSession() {
            localStorage.removeItem('user_session_token')
            this.$router.push('/')
        },
        logout() {
            toast(
                this.$toasted,
                `Thank you, see you soon!`,
                "success"
            )
            this.endSession()
        }
    },
    created() {
        this.$store.dispatch("initCompanyData", this.company_code)
        this.getAuthedUser()
    }
}
</script>

<template>
    <div>
        <h1>{{company.name || "Carjo"}}</h1>
        <h3>{{company.name && "Carjo"}}</h3>
        <div class="has-text-left">
            <h5><b>Hey,</b> {{user.first_name}} {{user.last_name}}</h5>
        </div>

        <div class="has-text-right">
            <a class="button is-danger" @click="logout">log out</a>
        </div>

        <hr>

        <div class="columns">
            <div class="column form-container">
                <h2>Service form</h2>
                <a class="button">Car-wash</a>
                <a class="button">Car-check</a>
            </div>
            <car-form class="column form-container"/>
            <address-form class="column form-container"/>

        </div>
    </div>
</template>

<style lang="sass" scoped>
.form-container
    padding: 0px 50px 0px 50px
</style>