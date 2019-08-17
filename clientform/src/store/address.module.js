/* eslint-disable no-shadow,no-param-reassign */
import { registerAddress, updateAddress } from '../graphql/address';
import { notifyError } from '../helpers/toast_notification';


const state = {
  user_address: {
    id: '',
    street: '',
    city: '',
    zip: '',
  },
};

const getters = {
  getUserAddress: (state) => state.user_address,
};

const actions = {
  async addOrUpdateAddress({ commit, state }, payload) {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!state.user_address.street.id) {
        const { RegisterUserAddress: address } = await registerAddress(payload);
        if (address) commit('setUserAddresses', address);
      } else {
        const { id } = state.user_address;
        const { UpdateUserAddress: address } = await updateAddress({ ...payload, id });
        if (address) commit('setUserAddresses', address);
      }
    } catch (err) {
      notifyError('Address could not be added...');
      throw err;
    }
  },
};

const mutations = {
  setUserAddresses: (state, payload) => {
    state.user_address = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
