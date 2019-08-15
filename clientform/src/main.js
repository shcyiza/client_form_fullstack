import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuelidate from 'vuelidate'
import GQLProvider from './lib/graphql'
import Toasted from 'vue-toasted';

require('@/assets/styles/main.sass')

Vue.use(Vuelidate);
Vue.use(GQLProvider);
Vue.use(Toasted)

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
