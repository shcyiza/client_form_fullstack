<template>
    <div>
        <div class="has-text-left">
            <h5><b>Hey,</b> {{user.first_name}} {{user.last_name}}</h5>
        </div>

        <div class="has-text-right">
            <a class="button is-danger" @click="logout">log out</a>
        </div>

        <hr>

        <slot/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { notifySuccess } from '../../helpers/toast_notification';

export default {
    name: 'LayoutConnected',
    computed: {
        ...mapGetters({
            user: 'getAuthedUser',
        }),
    },
    methods: {
        getAuthedUser() {
            this.$store.dispatch(
                'fetchAuthedUser',
                this.endSession.bind(this),
            );
        },
        endSession() {
            this.$store.dispatch('endSession');
            localStorage.removeItem('user_session_token');
            this.$router.push('/');
        },
        logout() {
            this.endSession();
            notifySuccess('Thank you, see you soon!');
        },
        submitOrder() {
            this.$router.push('checkout_order');
        },
    },
    created() {
        if (!this.user.email) {
            this.getAuthedUser();
        }
    },
};
</script>

<style scoped>

</style>
