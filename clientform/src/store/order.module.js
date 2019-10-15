/* eslint-disable no-shadow,no-param-reassign */
import { TIME_FRAME } from '../helpers/constants';
import { checkoutOrder, UpdateOrderBilling } from '../graphql/order';
import { notifyError } from '../helpers/toast_notification';
import router from '../router';

const state = {
    draft: {
        car: '',
        address: '',
        offer: '',
        intervention_date: '',
        intervention_timeframe: '',
    },
    billing_address: '',
};

const getters = {
    offerId: (state) => state.draft.offer,
    carId: (state) => state.draft.car,
    addressId: (state) => state.draft.address,
    billingAddressId: (state) => state.billing_address || state.draft.address,
    interventionDate: (state) => state.draft.intervention_date,
    interventionTimeFrame: (state) => state.draft.intervention_timeframe,
    checkValidity: (state) => {
        const state_attrs = Object.keys(state.draft);
        const invalidities = [];

        state_attrs.forEach((attr) => {
            if (state.draft[attr] === '') invalidities.push(attr);
        });

        if (invalidities.length > 0) {
            return {
                ok: false,
                invalidities,
            };
        }
        return {
            ok: true,
        };
    },
};

const actions = {
    checkoutOrder({ state, commit, rootState }) {
        const { account_id } = rootState.company.company;
        checkoutOrder({ ...state.draft, account_id })
            .then(({ CheckoutOrder: order }) => {
                const { id } = order;
                commit('setId', id);
                localStorage.setItem(`order:${rootState.user.user.email}`, id);
                router.push('checkout_order');
            })
            .catch((err) => {
                notifyError('Error in the final step of the order, please try later again');
                throw err;
            });
    },
    updateBillingAddress({ commit, rootState }, address_id) {
        const id = localStorage.getItem(`order:${rootState.user.user.email}`);
        UpdateOrderBilling(id, address_id)
            .then(({ UpdateOrderBilling: order }) => {
                const { billing_address_id } = order;
                commit('setOrderBillingAddress', billing_address_id);
            })
            .catch((err) => {
                notifyError('Could not change the billing address');
                throw err;
            });
    },
    selectedAddress({ commit }, id) {
        commit('setOrderAddress', id);
    },
};

const mutations = {
    setOrderCar(state, id) {
        state.draft.car = id;
    },
    setInterventionDate(state, date) {
        state.draft.intervention_date = date;
    },
    setOrderAddress(state, id) {
        state.draft.address = id;
    },
    setOrderBillingAddress(state, id) {
        state.billing_address = id;
    },
    setOrderOffer(state, id) {
        state.draft.offer = id;
    },
    setId(state, id) {
        state.draft.id = id;
    },
    setInterventionTimeFrame(state, time_frame_value) {
        if (
            TIME_FRAME.map((item) => item.value).includes(time_frame_value)
            || time_frame_value === ''
        ) {
            state.draft.intervention_timeframe = time_frame_value;
        }
    },
    clearOrder(state) {
        state.draft.id = undefined;
        state.draft.car = '';
        state.draft.address = '';
        state.billing_address = '';
        state.draft.offer = '';
        state.draft.intervention_date = '';
        state.draft.intervention_timeframe = '';
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
