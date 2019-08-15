import { registerCar } from "../graphql/car";

// initial state
const state = {
    cars: []
};

// getters
const getters = {
    getCars: state => state.cars,
};

// actions
const actions = {
    addCar({ commit }, [user_id, payload]) {
        registerCar({user: user_id, ...payload})
            .then(({ RegisterCar }) => {
                commit("pushCar", RegisterCar)
            })
            .catch(err => {
                throw err
            })
    }
};

// mutations
const mutations = {
    setCars: (state, payload) => {
        state.cars = payload
    },
    pushCar: (state, payload) => {
        state.cars.push(payload)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
