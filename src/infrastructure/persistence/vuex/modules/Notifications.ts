import { Module } from 'vuex';
import { Notification } from '@/application/models/notification/Notification';

export type StoreNotifications = { notifications: Array<Notification> };

export const notifications: Module<any, any> = {
  namespaced: true,

  state: {
    notifications: [],
  },

  getters: {
    notifications: state => state.notifications,
  },
};
