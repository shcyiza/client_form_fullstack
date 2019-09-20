/* eslint-disable no-shadow,no-param-reassign */
import { TIME_FRAME } from '../helpers/constants';

const state = {
    service_index: '0',
    car_id: '',
    address_id: '',
    offer_id: '',
    intervention_date: '',
    intervention_moment: '',
};

const getters = {
    offerId: (state) => state.offer_id,
    carId: (state) => state.car_id,
    addressId: (state) => state.address_id,
    interventionDate: (state) => state.intervention_date,
    interventionTimeFrame: (state) => state.intervention_moment,
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
};

const mutations = {
    setOrderService(state, index) {
        state.service_index = String(index);
    },
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
    setInterventionTimeFrame(state, time_frame_value) {
        if (
            TIME_FRAME.map((item) => item.value).includes(time_frame_value)
            || time_frame_value === ''
        ) {
            state.intervention_moment = time_frame_value;
        }
    },
    clearOrder(state) {
        state.service_index = '0';
        state.car_id = '';
        state.address_id = '';
        state.intervention_date = '';
        state.intervention_moment = '';
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
