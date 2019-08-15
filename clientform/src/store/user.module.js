import { authedUser } from '../graphql/users';
import toast from '../helpers/toast_notification';
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
  fetchAuthedUser({ commit }, [fatalErrorCallback, toasted]) {
    authedUser().then((resp) => {
      const { AuthUser } = resp;

      if (AuthUser) {
        const user = { ...AuthUser };
        delete user.cars;
        delete user.address;
        const { cars, address } = AuthUser;

        commit('setUser', user);
        if (cars.length > 0) commit('setCars', cars);
        if (address) commit('setAddresses', [address]);
      } else {
        toast(
          toasted,
          'No account found...',
          'error',
        );
        fatalErrorCallback();
      }
    }).catch((err) => {
      if (err.status === 404) {
        toast(
          toasted,
          'Your session has expired... Authentify yourself again.',
          'error',
        );
        fatalErrorCallback();
      } else {
        toast(
          toasted,
          'Oops... An problem has occured, please try again later.',
          'error',
        );
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
