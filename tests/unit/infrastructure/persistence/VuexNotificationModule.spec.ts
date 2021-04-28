import store from '@/infrastructure/persistence/vuex/VuexStore';
import { ERROR_NOTIFICATION } from '@fixtures/notifications';

describe('Vuex Notification module', () => {
  it('should not be any notifications in default state', () => {
    expect(store.getters['notifications/notifications']).toStrictEqual([]);
  });

  it('should add a notification', () => {
    store.dispatch('notifications/addNotification', ERROR_NOTIFICATION);

    expect(store.getters['notifications/notifications']).toStrictEqual([ERROR_NOTIFICATION]);
  });

  it('should remove a notification', () => {
    store.state.notifications.notifications = [ERROR_NOTIFICATION];

    store.dispatch('notifications/removeNotification', ERROR_NOTIFICATION);

    expect(store.getters['notifications/notifications']).toStrictEqual([]);
  });

  it('should merge duplicated notifications', () => {
    store.dispatch('notifications/addNotification', ERROR_NOTIFICATION);
    store.dispatch('notifications/addNotification', ERROR_NOTIFICATION);
    store.dispatch('notifications/addNotification', ERROR_NOTIFICATION);

    expect(store.getters['notifications/notifications'].length).toBe(1);
  });
});
