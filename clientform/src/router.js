import Vue from 'vue';
import Router from 'vue-router';
import OrderForm from './views/OrderForm.vue';
import Checkout from './views/Checkout.vue';
import OrderConfirmed from './views/OrderConfirmed.vue';
import Login from './views/Login.vue';

Vue.use(Router);

function ifUserSession(check, redirect) {
    return (to, from, next) => {
        const token = localStorage.getItem('user_session_token');

        if (!!token === check) {
            next();
        } else {
            next({ name: redirect });
        }
    };
}

const router = new Router({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: Login,
            beforeEnter: ifUserSession(false, 'order_form'),
        },
        {
            path: '/order_form',
            name: 'order_form',
            component: OrderForm,
            beforeEnter: ifUserSession(true, 'welcome'),
        },
        {
            path: '/checkout_order',
            name: 'checkout_order',
            component: Checkout,
            beforeEnter: ifUserSession(true, 'welcome'),
        },
        {
            path: '/order_confirmed',
            name: 'order_confirmed',
            component: OrderConfirmed,
            beforeEnter: ifUserSession(true, 'welcome'),
        },
    ],
});

function hasQueryParams(route) {
    return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
    if (!hasQueryParams(to) && hasQueryParams(from)) {
        next({ name: to.name, query: from.query });
    } else {
        next();
    }
});

export default router;
