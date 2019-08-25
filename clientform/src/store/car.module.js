/* eslint-disable no-shadow,no-param-reassign, camelcase */
import { registerCar } from '../graphql/car';
import { notifyError, notifySuccess } from '../helpers/toast_notification';

const state = {
    cars: [],
};

const getters = {
    getCars: (state) => state.cars,
};

const actions = {
    addCar({ commit }, payload) {
        registerCar(payload)
            .then(({ RegisterCar: car }) => {
                commit('pushCar', car);
                commit('setOrderCar', car.id);
                notifySuccess('Car successfully added!');
            })
            .catch((err) => {
                notifyError('Car could not be added...');
                throw err;
            });
    },
};

const mutations = {
    setCars: (state, payload) => {
        state.cars = payload;
    },
    pushCar: (state, payload) => {
        state.cars.push(payload);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
