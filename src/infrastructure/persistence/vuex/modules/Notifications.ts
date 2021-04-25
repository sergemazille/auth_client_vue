import { Module } from 'vuex';
import { Notification } from '@/application/models/notification/Notification';

export type StoreNotifications = { notifications: Array<Notification> };

export const notifications: Module<any, any> = {
  namespaced: true,

  state: {
    notifications: [],
  },

  mutations: {
    addNotification(state, notification: Notification) {
      state.notifications.push(notification);
    },
  },

  actions: {
    addNotification({ commit }, notification: Notification) {
      commit('addNotification', notification);
    },
  },

  getters: {
    notifications: state => state.notifications,
  },
};
