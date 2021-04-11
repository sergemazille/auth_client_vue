import { Module } from 'vuex';

export type StoreAuth = { isAuthenticated: boolean };

export const auth: Module<any, any> = {
  namespaced: true,

  state: {
    isAuthenticated: false,
  },

  mutations: {
    updateIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },

  actions: {
    logIn({ commit }) {
      commit('updateIsAuthenticated', true);
    },

    logOut({ commit }) {
      commit('updateIsAuthenticated', false);
    },
  },

  getters: {
    isAuthenticated: state => state.isAuthenticated,
  },
};
