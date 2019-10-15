/* eslint-disable no-shadow,no-param-reassign */
import { registerAddress } from '../graphql/address';
import { notifyError, notifySuccess } from '../helpers/toast_notification';

const state = {
    addresses: [],
};

const getters = {
    getUserAddresses: (state) => state.addresses,
    getValidAddresses: (state, getters, rootState) => {
        const company_addresses = rootState.company.company.addresses;

        return company_addresses.length > 0 ? company_addresses : state.addresses;
    },
};

const actions = {
    addAddress({ commit, dispatch }, payload, callback_type = 'selectedAddress') {
        registerAddress(payload)
            .then(({ RegisterUserAddress: address }) => {
                commit('pushAddress', address);
                dispatch(callback_type, address.id);
                notifySuccess('Addresses successfully added!');
                return address.id;
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
