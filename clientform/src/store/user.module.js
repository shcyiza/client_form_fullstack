import {fetchAktiContact} from "../services/AktiServices"
// initial state
const state = {
    contactId: "",
    accountId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobilePhone: "",
    is_loading: false
}

// getters
const getters = {
    AktiContactInfo: state => ({
        firstName: state.firstName,
        lastName: state.lastName,
        mobilePhone: state.mobilePhone
    })
}

// actions
const actions = {
    fetchContact(context, email, accountId = "") {
        fetchAktiContact(accountId, email).then(({data}) => {
            if (data.data[0]) {
                context.commit("setUser", data.data[0])
                // eslint-disable-next-line no-console
                console.log("company was fetch successfully")
            } else {
                context.commit("setUser", email)
                // eslint-disable-next-line no-console
                console.log(`no result for ${email} contact`)
            }
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log("contact fetch was unsuccessful", err)
            throw err
        })
    }
}

// mutations
const mutations = {
    setUser(state, payload) {
        [
            "contactId", "accountId", "firstName", "lastName", "email", "mobilePhone"
        ].forEach(attr => {
            state[attr] = payload[attr] || ""
        })
    },
    setEmail(state, payload) {
        state.email = payload.email
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
