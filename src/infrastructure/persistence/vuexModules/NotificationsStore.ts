import { Module } from 'vuex';

export const notifications: Module<any, any> = {
  namespaced: true,

  state: {
    notifications: [],
  },

  getters: {
    notifications: state => state.notifications,
  },
};
