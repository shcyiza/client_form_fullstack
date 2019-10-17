<script>
import validateInput from '../lib/validator_service';
import ValidationInstruction from './components/form/ValidationInstruction.vue';
import { notifyError, notifySuccess } from '../helpers/toast_notification';
import { loginAdmin } from '../graphql/auth';

const validators = {
    email: [
        { validate: 'email', instruction: 'please enter a valid email. ie: example@domain.com' },
    ],
    pwd: [
        { validate: 'required', instruction: 'a password is required required.' },
    ],
};

export default {
    name: 'AdminLogin',
    data() {
        return {
            email: '',
            pwd: '',
            validators,
        };
    },
    components: {
        ValidationInstruction,
    },
    computed: {
        emailErrors() {
            return validateInput(this.email, 'text', this.validators.email);
        },
        pwdErrors() {
            return validateInput(this.pwd, 'text', this.validators.pwd);
        },
        loginnErrorsCount() {
            return (
                this.pwdErrors.length
                + this.emailErrors.length
            );
        },
    },
    methods: {
        async login() {
            try {
                const {
                    LoginAdmin: {
                        user_session_token,
                    },
                } = await loginAdmin(this.email, this.pwd);
                if (user_session_token) {
                    localStorage.setItem('admin_session_token', user_session_token);
                    notifySuccess('Welcome colleague!');
                    this.$router.push('/admin/orders');
                } else {
                    notifyError('Wrong token. please try again...');
                }
            } catch (err) {
                notifyError('Wrong token. please try again...');
            }
        },
    },
};
</script>

<template>
    <div>
        <h1>Admin panel:</h1>
        <hr>
        <form class="login-container">
            <b-field
            label="Email"
            >
                <b-input
                type="email"
                v-model="email"
                >
                </b-input>
            </b-field>
            <validation-instruction :errors="emailErrors" :validators="validators.email"/>
            <br><br>
            <b-field label="Password">
                <b-input
                type="password"
                v-model="pwd"
                password-reveal
                >
                </b-input>
            </b-field>
            <validation-instruction :errors="pwdErrors" :validators="validators.pwd"/>

            <br><br>
            <b-button type="is-primary" outlined @click="login">login</b-button>
        </form>
    </div>
</template>

<style scoped lang="sass">
.login-container
    width: 400px
    margin: 0 auto
    background-color: #e3e9ee
    padding: 20px
    border-radius: 6px
</style>
