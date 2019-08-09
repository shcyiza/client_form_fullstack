import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import CarwashForm from './views/CarwashForm'
import Login from './views/Login'

Vue.use(Router);

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/carwash',
      name: 'carwash',
      component: CarwashForm
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
