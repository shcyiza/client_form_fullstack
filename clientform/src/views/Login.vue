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
        login() {
            // claim token 
            claimToken(this.user.email, this.request_timestamp, this.token)
            this.$router.push('carwash');
        }
    }
}
</script>

<template>
<div>
    <form>
        <template v-if="verifyToken">
            <h2>Validate Token</h2>
            <input type="text" placeholder="token" v-model="token" />
            <button @click.prevent="login"> validate </button>
        </template>
        <template v-else-if="isValidEmail">
            <h2>Verify email adress</h2>
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
