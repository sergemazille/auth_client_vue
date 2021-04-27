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

    removeNotification(state, notification: Notification) {
      state.notifications = state.notifications.filter((item: Notification) => item.message !== notification.message);
    },
  },

  actions: {
    addNotification({ commit }, notification: Notification) {
      commit('addNotification', notification);
    },

    removeNotification({ commit }, notification: Notification) {
      commit('removeNotification', notification);
    },
  },

  getters: {
    notifications: state => state.notifications,
  },
};
