<script>
import { checkEmailExists, registerUser, requestToken, claimToken} from '../graphql/users';

export default {
    name: 'login', 
    data() {
        return {
            user: {
                email: '',
                phone: '',
                first_name: '',
                last_name: ''
            },
            token: '',
            isValidEmail: true,
            verifyToken: false,
            shouldRegister: false
        }
    },
    methods: {
        async checkEmail() {
            const exists = await checkEmailExists(this.user.email);
            this.isValidEmail = exists;
            this.shouldRegister = !exists;
            if(exists) {
                // Request new session
                const { RequestUserSession } = await requestToken(this.user.email);
                this.request_timestamp = RequestUserSession.request_timestamp;
                this.verifyToken = true;
            }
        },
        async registerUser() {
            const { RegisterUser } = await registerUser(this.user);
            if(RegisterUser) {
                // Request new session
                const { RequestUserSession } = await requestToken(this.user.email);
                this.request_timestamp = RequestUserSession.request_timestamp;
                this.verifyToken = true;
            }
            // TODO throw error and try again
        },
        async login() {
            // claim token 
            const {ClaimUserSession: {
                status, message, user_session_token
            }} = await claimToken(this.user.email, this.request_timestamp, this.token)
            if(user_session_token) {
                localStorage.setItem('user_session_token', user_session_token)
                this.$router.push('order_form')
            } else {
                this.user.email = ""
                console.log('status:', status, 'message', message)
            }
            // TODO add trials features
            // TODO add error handling generally (vue toast!)
        }
    }
}
</script>

<template>
<div>
    <h2>Thanks for choosing Carjo...</h2>
    <form>
        <template v-if="verifyToken">
            <h2>Validate Token</h2>
            <input type="text" placeholder="token" v-model="token" />
            <button @click.prevent="login"> validate </button>
        </template>
        <template v-else-if="isValidEmail">
            <h4>Please enter your email adress</h4>
            <input type="text" placeholder="email" v-model="user.email" />
            <button @click.prevent="checkEmail"> Verify </button>
        </template>
        <template v-else-if="shouldRegister">
            <h2>Registration</h2>
            <input type="text" placeholder="First name" v-model="user.first_name" />
            <input type="text" placeholder="Last name" v-model="user.last_name" />
            <input type="tel" placeholder="phone number" v-model="user.phone" />
            <button @click.prevent="registerUser"> Register </button>
        </template>
    </form>
</div>
</template>

<style>

</style>
