import { setToken, clearToken } from '../../authentication/authTokenTools';
import labyrinthApi from '../../api/labyrinthApi';

const defaultSigninError = {
  email: null,
  password: null,
  message: null
};

export default {
  namespaced: true,
  state: {
    signinIn: false,
    signinError: { ...defaultSigninError }
  },
  getters: {
    signingIn: state => {
      return state.signinIn;
    },
    signinErrors: state => {
      return state.signinError;
    }
  },
  mutations: {
    signinStart: state => {
      state.signinIn = true;
    },
    signinStop: (state, errorMessage) => {
      state.signinIn = false;
      state.signinError = { ...defaultSigninError, ...errorMessage };
    }
  },
  actions: {
    signIn({ commit }, signinData) {
      commit('signinStart');
      const promise = labyrinthApi.signIn({ ...signinData });
      promise
        .then(response => {
          setToken(response.data.token);
          commit('signinStop', null);
        })
        .catch(error => {
          commit('signinStop', error.response.data);
        });
      return promise;
    },
    signOut() {
      clearToken();
    }
  }
};
