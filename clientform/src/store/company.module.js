/* eslint-disable no-shadow,no-param-reassign, camelcase */
import { fetchCompany } from '../graphql/company';
import {notifyError} from "../helpers/toast_notification";

// initial state
const state = {
    company: {
        addresses: [],
        offers: [],
    },
};

// getters
const getters = {
    getCompanyInfo: ({ company }) => ({
        id: company.id,
        name: company.name,
        vat_number: company.vat_number,
    }),
    getCompanyAddresses: ({ company }) => company.addresses,
};
// actions
const actions = {
    fetchCompany({ commit, state }, code_name) {
        fetchCompany(code_name).then(({ Company }) => {
            if (Company) {
                commit('setCompany', Company);
                commit('setOrderAddress', state.company.addresses[0].id);
                if (Company.offers[0]) commit('setOrderOffer', state.company.offers[0].id);
            }
        })
            .catch((err) => {
                notifyError('company fetch was unsuccessful');
                throw err;
            });
    },
    initCompanyData({ state, dispatch }, code_name) {
        if (code_name && !state.id) {
            dispatch('fetchCompany', code_name);
        }
    },
};

// mutations
const mutations = {
    setCompany(state, payload) {
        state.company = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
