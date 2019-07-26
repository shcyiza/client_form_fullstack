<script>
    import { required, email } from 'vuelidate/lib/validators'
    import FormField from './form/FormField'

    export default {
        name: "UserForm",
        data() {
            return {
                email: "",
                firstName: "",
                lastName: "",
                mobilePhone: "",
            }
        },
        components: {
            FormField
        },
        validations: {
            email: {
                required,
                email
            },
            firstName: {
                required
            },
            lastName: {
                required
            },
            mobilePhone: {
                required
            }
        },
        computed: {
            emailHasError() {
                const valid = this.$v.email
                return !valid.required || !valid.email
            },
            AktiContactInfo() {
                return this.$store.getters.AktiContactInfo
            },
            formHasError() {
                // for when we have to post a new account in akti
            }
        },
        watch: {
            email() {
                const {dispatch, state} = this.$store
                if (!this.emailHasError) {
                    dispatch("fetchContact", this.email, state.company.accountId)
                }
            },
            AktiContactInfo() {
                Object.keys(this.AktiContactInfo).forEach(attr => {
                    this[attr] = this.AktiContactInfo[attr]
                })
            }
        }

    }
</script>

<template>
    <div class="custom-form">
        <h2>User form</h2>

        <form-field label="email" :value="$v.email.$model"
                    :warnings="[
                        {validator: !$v.email.email, message: 'This email is invalid'},
                        {validator: !$v.email.required, message: 'required'},
                    ]"
                    @input="email = $event"
        />

        <form-field label="first name" :value="$v.firstName.$model"
                    :warnings="[
                        {validator: !$v.firstName.required, message: 'required'},
                    ]"
                    @input="firstName = $event"
        />

        <form-field label="last name" :value="$v.lastName.$model"
                    :warnings="[
                        {validator: !$v.lastName.required, message: 'required'},
                    ]"
                    @input="lastName= $event"
        />

        <form-field label="mobile phone" :value="$v.mobilePhone.$model"
                    :warnings="[
                        {validator: !$v.mobilePhone.required, message: 'required'},
                    ]"
                    @input="mobilePhone = $event"
        />
    </div>
</template>

<style lang="sass" scoped>
.custom-form
    width: 100%

.field
    text-align: center
    vertical-align: middle
</style>