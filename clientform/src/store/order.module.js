/* eslint-disable no-shadow,no-param-reassign */
import { TIME_FRAME } from '../helpers/constants';
import { checkoutOrder, UpdateOrderBilling } from '../graphql/order';
import { notifyError } from '../helpers/toast_notification';
import router from '../router';

const state = {
    car: '',
    address: '',
    billing_address: '',
    offer: '',
    intervention_date: '',
    intervention_timeframe: '',
};

const getters = {
    offerId: (state) => state.offer,
    carId: (state) => state.car,
    addressId: (state) => state.address,
    billingAddressId: (state) => state.billing_address || state.address,
    interventionDate: (state) => state.intervention_date,
    interventionTimeFrame: (state) => state.intervention_timeframe,
    checkValidity: (state) => {
        const state_attrs = Object.keys(state);
        const invalidities = [];
        state_attrs.forEach((attr) => {
            if (state[attr] === '') invalidities.push(attr);
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
        const account_id = rootState.company.company.account_id;
        checkoutOrder({ ...state, account_id })
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
        state.car = id;
    },
    setInterventionDate(state, date) {
        state.intervention_date = date;
    },
    setOrderAddress(state, id) {
        state.address = id;
    },
    setOrderBillingAddress(state, id) {
        state.billing_address = id;
    },
    setOrderOffer(state, id) {
        state.offer = id;
    },
    setId(state, id) {
        state.id = id;
    },
    setInterventionTimeFrame(state, time_frame_value) {
        if (
            TIME_FRAME.map((item) => item.value).includes(time_frame_value)
            || time_frame_value === ''
        ) {
            state.intervention_timeframe = time_frame_value;
        }
    },
    clearOrder(state) {
        state.id = undefined;
        state.car = '';
        state.address = '';
        state.billing_address = '';
        state.offer = '';
        state.intervention_date = '';
        state.intervention_timeframe = '';
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
