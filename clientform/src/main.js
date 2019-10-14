import Vue from 'vue';
import Toasted from 'vue-toasted';
import { setupCalendar } from 'v-calendar';
import Buefy from 'buefy';
import App from './App.vue';
import store from './store';
import router from './router';
import GQLProvider from './lib/graphql';

import 'buefy/dist/buefy.css';

require('./assets/styles/main.sass');

setupCalendar(Vue, {
    componentPrefix: 'vc',
});
Vue.use(GQLProvider);
Vue.use(Toasted);
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
