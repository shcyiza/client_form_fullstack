/* eslint-disable no-shadow,no-param-reassign */
import { fetchOffers } from '../graphql/offer';
import { notifyError } from '../helpers/toast_notification';

const state = {
    offers: [],
};

const getters = {
    getOffers: (state, getters, rootState) => {
        const company_offers = rootState.company.company.offers;

        return company_offers.length > 0 ? company_offers : state.offers;
    },
};

const actions = {
    fetchOffers({ commit }) {
        fetchOffers()
            .then(({ Offers }) => {
                if (Offers) {
                    commit('setOffers', Offers);
                    commit('setOrderOffer', state.offers[0].id);
                }
            })
            .catch((err) => {
                notifyError('An error has occurred, please try again later...');
                throw err;
            });
    },
};

const mutations = {
    setOffers(state, payload) {
        state.offers = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
