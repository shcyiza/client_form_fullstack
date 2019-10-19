/* eslint-disable no-shadow,no-param-reassign, camelcase */
import { authedUser } from '../graphql/users';
import { notifyError } from '../helpers/toast_notification';
// initial state
const initial_state = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    is_loading: false,
};

const state = {
    user: initial_state,
};

// getters
const getters = {
    getAuthedUser: (state) => state.user,
};

// actions
const actions = {
    fetchAuthedUser({ commit, rootState }, fatalErrorCallback) {
        authedUser().then((resp) => {
            const { AuthUser } = resp;

            if (AuthUser) {
                const user = { ...AuthUser };
                delete user.cars;
                delete user.address;
                const { cars, addresses } = AuthUser;

                commit('setUser', user);
                if (cars.length > 0) {
                    commit('setCars', cars);
                    commit('setOrderCar', cars[0].id);
                }

                if (addresses.length > 0) {
                    commit('setAddresses', addresses);
                    if (!rootState.order.address_id) commit('setOrderAddress', addresses[0].id);
                }
            } else {
                notifyError('No account found...');
                fatalErrorCallback();
            }
        }).catch((err) => {
            if (err.status === 401) {
                notifyError('Your session has expired... Please log back in.');
                fatalErrorCallback();
            } else {
                notifyError('Oops... An problem has occurred, please try again later.');
                throw err;
            }
        });
    },
    endSession({ commit }) {
        commit('setUser', initial_state);
        commit('clearOrder');
        commit('setCars', []);
        commit('setAddresses', []);
    },
};

// mutations
const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
