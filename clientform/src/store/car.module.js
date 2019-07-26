// initial state
const state = {
    plate: "",
    brand: "",
    model: ""
}

// getters
const getters = {
    getPlate: state => state.plate,
    getBrand: state => state.brand,
    getModel: state => state.model
}

// actions
const actions = {
    updateCarAttr({ commit }, {attr, value}) {
        const validAttr = ["plate", "brand", "model"]
        if (validAttr.includes(attr)) {
            commit("setCarAttr", {attr, value})
        }
    }
}

// mutations
const mutations = {
    setCarAttr: (state, {attr, value}) => {
        state[attr] = value || ""
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
