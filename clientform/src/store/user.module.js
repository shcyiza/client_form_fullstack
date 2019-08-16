import { authedUser } from '../graphql/users';
import { notifyError } from '../helpers/toast_notification';
// initial state
const state = {
  user: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    is_loading: false,
  },
};

// getters
const getters = {
  getAuthedUser: (state) => state.user,
};

// actions
const actions = {
  fetchAuthedUser({ commit }, [fatalErrorCallback]) {
    authedUser().then((resp) => {
      const { AuthUser } = resp;

      if (AuthUser) {
        const user = { ...AuthUser };
        delete user.cars;
        delete user.address;
        const { cars, address } = AuthUser;

        commit('setUser', user);
        if (cars.length > 0) commit('setCars', cars);
        if (address) commit('setUserAddresses', address);
      } else {
        notifyError('No account found...');
        fatalErrorCallback();
      }
    }).catch((err) => {
      if (err.status === 404) {
        notifyError('Your session has expired... Please log back in.');
        fatalErrorCallback();
      } else {
        notifyError('Oops... An problem has occurred, please try again later.');
        throw err;
      }
    });
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
