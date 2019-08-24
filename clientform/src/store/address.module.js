/* eslint-disable no-shadow,no-param-reassign, camelcase */
import { registerAddress } from '../graphql/address';
import { notifyError, notifySuccess } from '../helpers/toast_notification';

const state = {
    addresses: [],
};

const getters = {
    getUserAddresses: (state) => state.addresses,
};

const actions = {
    addAddress({ commit }, payload) {
        registerAddress(payload)
            .then(({ RegisterUserAddress: address }) => {
                commit('pushAddress', address);
                notifySuccess('Addresses successfully added!');
            })
            .catch((err) => {
                notifyError('Address could not be added...');
                throw err;
            });
    },
};

const mutations = {
    setAddresses: (state, payload) => {
        state.addresses = payload;
    },
    pushAddress: (state, payload) => {
        state.addresses.push(payload);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
