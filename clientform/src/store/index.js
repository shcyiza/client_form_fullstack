import Vue from 'vue';
import Vuex from 'vuex';
import company from './company.module';
import user from './user.module';
import car from './car.module';
import address from './address.module';
import order from './order.module';

Vue.use(Vuex);

const state = {};

const getters = {};

const mutations = {};

const actions = {};


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        company,
        user,
        car,
        address,
        order,
    },
});
