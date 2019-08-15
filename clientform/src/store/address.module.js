/* eslint-disable no-shadow,no-param-reassign */
const state = {
  addresses: [],
};

const getters = {
  getAddresses: (state) => state.addresses,
};

const actions = {};

const mutations = {
  setAddresses: (state, payload) => {
    state.addresses = payload;
  },
  pushAddresses: (state, payload) => {
    state.cars.push(payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
