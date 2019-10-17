<template>
    <div>
        <div class="has-text-right">
            <a class="button is-danger" @click="logout">log out</a>
        </div>
        <b-navbar class="admin-nav">
            <template slot="brand">
                <a @click="navigate('/admin/orders')">
                    <b-navbar-item tag="a">
                        <b>Admin</b>
                    </b-navbar-item>
                </a>
            </template>
            <template slot="start">
                <a @click="navigate('/admin/orders')">
                    <b-navbar-item tag="a">
                        orders
                    </b-navbar-item>
                </a>
                <a @click="navigate('/admin/offers')">
                    <b-navbar-item tag="a">
                        offers
                    </b-navbar-item>
                </a>
                <a @click="navigate('/admin/companies')">
                    <b-navbar-item tag="a">
                        companies
                    </b-navbar-item>
                </a>
            </template>
        </b-navbar>
        <slot/>
    </div>
</template>

<script>
import { notifySuccess } from '../../helpers/toast_notification';

export default {
    name: 'LayoutAdminConnected',
    methods: {
        endSession() {
            localStorage.removeItem('admin_session_token');
            this.$router.push('/');
        },
        logout() {
            this.endSession();
            notifySuccess('Thank you, see you soon!');
        },
        navigate(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped lang="sass">
.admin-nav
    border-bottom: #cfd7df 1px solid
</style>