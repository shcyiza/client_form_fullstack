<script>
import { mapGetters } from "vuex"
import { authedUser } from "../graphql/users"
import CarForm from "./components/CarForm"
import AddressForm from "./components/AddressForm"
import toast from "../services/toast_notification"

export default {
    name: "OrderForm",
    data() {
        return {
            form_name: "Order Form",
            company_code: this.$route.query.company || "",
            user: {},
            cars: [],
            
        }
    },
    components: {
        CarForm,
        AddressForm
    },
    computed: {
        ...mapGetters({
            company: "getCompanyDetails"
        })
    },
    methods: {
        getAuthedUser() {
            authedUser().then((resp) => {
                const {AuthUser} = resp
                if(AuthUser) {
                    this.user = AuthUser
                    delete this.user.cars
                    
                    this.cars = AuthUser.cars || []
                } else {
                    toast(
                        this.$toasted,
                        "No account found...",
                        "error"
                    )
                    this.endSession()
                } 
            }).catch(err => {
                if(err.status === 404) {
                    toast(
                        this.$toasted,
                        "Your session has expired... Authentify yourself again.",
                        "error"
                    )
                    this.endSession()
                } else {
                    toast(
                        this.$toasted,
                        "Oops... An problem has occured, please try again later.",
                        "error"
                    )
                }
            })
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