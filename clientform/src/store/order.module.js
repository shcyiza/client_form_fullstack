/* eslint-disable no-shadow,no-param-reassign */

const state = {
    service_index: 0,
    car_id: '',
    address_id: '',
    intervention_date: '',
};

const getters = {
    serviceIndex: (state) => state.service_index,
    carId: (state) => state.car_id,
    addressId: (state) => state.address_id,
    interventionDate: (state) => state.intervention_date,
};

const actions = {

};

const mutations = {
    setOrderService(state, index) {
        state.service_index = index;
    },
    setOrderCar(state, id) {
        state.car_id = id;
    },
    setOrderAddress(state, id) {
        state.address_id = id;
    },
    setIntervetionDate(state, date) {
        state.intervention_date = date;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
