<script>
/* eslint-disable import/no-unresolved */
import { checkEmailExists, registerUser } from '../graphql/users';
import { requestToken, claimToken } from '../graphql/auth';
import { notifyError, notifySuccess } from '../helpers/toast_notification';
import validateInput from '../lib/validator_service';
import ValidationInstruction from './components/form/ValidationInstruction';

const validators = {
    email: [
        { validate: 'email', instruction: 'please enter a valid email. ie: example@domain.com' },
    ],
    first_name: [
        { validate: 'required', instruction: 'a first name is required.' },
    ],
    last_name: [
        { validate: 'required', instruction: 'an last name is required.' },
    ],
    phone: [
        {
            validate: 'regEx',
            expected: '^[1-9]{1,3} ([0-9][\\s]*){6,16}$',
            instruction: 'phone must be in the same format as: "32 456123789"',
        },
    ],
    token: [
        {
            validate: 'regEx',
            expected: '[0-9]{6}',
            instruction: 'Type the 6 digit token you received by text.',
        },
    ],
};

export default {
    name: 'login',
    components: {
        ValidationInstruction,
    },
    data() {
        return {
            user: {
                email: '',
                phone: '',
                first_name: '',
                last_name: '',
            },
            validators,
            claim_token: '',
            isValidEmail: true,
            verifyToken: false,
            shouldRegister: false,
        };
    },
    computed: {
        emailErrors() {
            return validateInput(this.user.email, 'text', this.validators.email);
        },
        firstNameErrors() {
            return validateInput(this.user.first_name, 'text', this.validators.first_name);
        },
        lastNameErrors() {
            return validateInput(this.user.last_name, 'text', this.validators.last_name);
        },
        phoneErrors() {
            return validateInput(this.user.phone, 'text', this.validators.phone);
        },
        tokenErrors() {
            return validateInput(this.claim_token, 'text', this.validators.token);
        },
        registrationErrorsCount() {
            return (
                this.firstNameErrors.length
                + this.lastNameErrors.length
                + this.phoneErrors.length
                + this.emailErrors.length
            );
        },
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
                this.shouldRegister = false;
            }
            // TODO try again
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
    <form autocomplete="on">
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
            <button
            @click.prevent="checkEmail"
            class="button is-link"
            :disabled="emailErrors.length > 0"
            >
                Continue
            </button>
            <validation-instruction :errors="emailErrors" :validators="validators.email" />
        </template>
        <template v-else-if="shouldRegister">
            <h2>Registration</h2>
            <div class="columns">
                <div class="column">
                    <input
                    type="text"
                    class="input auth-input is-success"
                    placeholder="First name"
                    v-model="user.first_name"
                    />
                    <validation-instruction
                    :errors="firstNameErrors"
                    :validators="validators.first_name"
                    />
                </div>
                <div class="column">
                    <input
                    type="text"
                    class="input auth-input is-success"
                    placeholder="Last name"
                    v-model="user.last_name"
                    />
                    <validation-instruction
                    :errors="lastNameErrors"
                    :validators="validators.last_name"
                    />
                </div>
                <div class="column">
                    <input
                        type="tel"
                        class="input auth-input is-success"
                        placeholder="phone number"
                        v-model="user.phone"
                    />
                    <validation-instruction
                    :errors="phoneErrors"
                    :validators="validators.phone"
                    />
                </div>
            </div>
            <button
            class="button is-link"
            @click.prevent="registerUser"
            :disabled="registrationErrorsCount > 0"
            >
                Register
            </button>
        </template>
        <template v-else-if="verifyToken">
            <h2>Validate Token</h2>
            <div>
                <input
                type="text"
                class="input auth-input is-info"
                placeholder="token"
                maxlength="6"
                v-model="claim_token"
                style="width: 80px"
                />
                <button
                class="button is-link"
                @click.prevent="login"
                :disabled="tokenErrors.length > 0"
                >
                    login
                </button>
            </div>
            <validation-instruction
            :errors="tokenErrors"
            :validators="validators.token"
            />
        </template>
    </form>
</div>
</template>

<style>

</style>
