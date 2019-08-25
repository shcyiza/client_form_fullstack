/* eslint-disable camelcase */
<script>
import { checkEmailExists, registerUser } from '../graphql/users';
import { requestToken, claimToken } from '../graphql/auth';
import { notifyError, notifySuccess } from '../helpers/toast_notification';

export default {
    name: 'login',
    data() {
        return {
            user: {
                email: '',
                phone: '',
                first_name: '',
                last_name: '',
            },
            claim_token: '',
            isValidEmail: true,
            verifyToken: false,
            shouldRegister: false,
        };
    },
    methods: {
        async checkEmail() {
            const exists = await checkEmailExists(this.user.email);
            if (exists) {
                // Request new session
                const { RequestUserSession } = await requestToken(this.user.email);
                this.request_timestamp = RequestUserSession.request_timestamp;
                this.verifyToken = true;
                this.isValidEmail = false;
            } else {
                this.isValidEmail = false;
                this.shouldRegister = true;
            }
        },
        async registerUser() {
            const { RegisterUser } = await registerUser(this.user);
            if (RegisterUser) {
                // Request new session
                const { RequestUserSession } = await requestToken(this.user.email);
                this.request_timestamp = RequestUserSession.request_timestamp;
                this.verifyToken = true;
            }
            // TODO throw error and try again
        },
        async login() {
            try {
                const {
                    ClaimUserSession: {
                        status, message, user_session_token, request_timestamp,
                    },
                } = await claimToken(this.user.email, this.request_timestamp, this.claim_token);
                if (user_session_token) {
                    localStorage.setItem('user_session_token', user_session_token);
                    notifySuccess('Let\'s get your car some services!');
                    this.$router.push('order_form');
                } else {
                    this.user.claim_token = '';
                    this.request_timestamp = request_timestamp;
                    notifyError(`Wrong token. please try again (${status}:${message})`);
                }
            } catch (err) {
                notifyError('Oops... An problem has occurred, please try again later.');
            }
            // TODO add trials features
        },
    },
};
</script>

<template>
<div>
    <h2>Thanks for choosing Carjo...</h2>
    <form>
        <template v-if="isValidEmail">
            <h4>Please enter your email address</h4>
            <input
                type="email"
                class="input auth-input is-info"
                placeholder="email"
                name="email"
                v-model="user.email"
                required
            />
            <button @click.prevent="checkEmail" class="button is-link"> Continue </button>
        </template>
        <template v-else-if="shouldRegister">
            <h2>Registration</h2>
            <input
                type="text"
                class="input auth-input is-success"
                placeholder="First name"
                v-model="user.first_name"
            />
            <input
                type="text"
                class="input auth-input is-success"
                placeholder="Last name"
                v-model="user.last_name"
            />
            <input
                type="tel"
                class="input auth-input is-success"
                placeholder="phone number"
                v-model="user.phone"
            />
            <button @click.prevent="registerUser"> Register </button>
        </template>
        <template v-else-if="verifyToken">
            <h2>Validate Token</h2>
            <input
                type="text"
                class="input auth-input is-info"
                placeholder="token"
                v-model="claim_token"
            />
            <button class="button is-link" @click.prevent="login"> validate </button>
        </template>
    </form>
</div>
</template>

<style>

</style>
