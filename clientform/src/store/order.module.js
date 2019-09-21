/* eslint-disable no-shadow,no-param-reassign */
import { TIME_FRAME } from '../helpers/constants';
import { checkoutOrder } from '../graphql/order';
import { notifyError } from '../helpers/toast_notification';
import router from '../router';

const state = {
    car_id: '',
    address_id: '',
    offer_id: '',
    intervention_date: '',
    intervention_timeframe: '',
};

const getters = {
    offerId: (state) => state.offer_id,
    carId: (state) => state.car_id,
    addressId: (state) => state.address_id,
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
        checkoutOrder(state)
            .then(({ CheckoutOrder: order }) => {
                const { id } = order;
                localStorage.setItem(`order:${rootState.user.user.email}:${rootState.company.company.id}:`, id);
                commit('setId', id);
                router.push('checkout_order');
            })
            .catch((err) => {
                notifyError('Error in the final step of the order, please try later again');
                throw err;
            });
    },
};

const mutations = {
    setOrderCar(state, id) {
        state.car_id = id;
    },
    setInterventionDate(state, date) {
        state.intervention_date = date;
    },
    setOrderAddress(state, id) {
        state.address_id = id;
    },
    setOrderOffer(state, id) {
        state.offer_id = id;
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
        state.car_id = '';
        state.address_id = '';
        state.offer_id = '';
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
