import Vue from 'vue'
import Router from 'vue-router'
import OrderForm from './views/OrderForm'
import Login from './views/Login'

Vue.use(Router);

function ifUserSession(check, redirect) {
  return (to, from, next) => {
    const token = localStorage.getItem('user_session_token')

    if(!!token === check){
      next()
    } else {
      next({name: redirect})
    }
  }
}

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Login,
      beforeEnter: ifUserSession(false, 'order_form')
    },
    {
      path: '/order_form',
      name: 'order_form',
      component: OrderForm,
      beforeEnter: ifUserSession(true, 'welcome')
    }
  ]
})
