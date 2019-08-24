/* eslint-disable no-shadow,no-param-reassign, camelcase */
import { fetchCompany } from '../graphql/company';

// initial state
const state = {
    company: {
        addresses: [],
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
    fetchCompany(context, code_name) {
        fetchCompany(code_name).then(({ Company }) => {
            if (Company) {
                context.commit('setCompany', Company);
            }
        })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.log('company fetch was unsuccessful', err);
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
