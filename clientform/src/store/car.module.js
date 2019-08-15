/* eslint-disable no-shadow,no-param-reassign */
import { registerCar } from '../graphql/car';

const state = {
  cars: [],
};

const getters = {
  getCars: (state) => state.cars,
};

const actions = {
  addCar({ commit }, [user_id, payload]) {
    registerCar({ user: user_id, ...payload })
      .then(({ RegisterCar }) => {
        commit('pushCar', RegisterCar);
      })
      .catch((err) => {
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
