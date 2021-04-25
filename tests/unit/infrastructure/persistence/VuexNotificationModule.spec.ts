import store from '@/infrastructure/persistence/vuex/VuexStore';

describe('Vuex Notification module', () => {
  it('should not be any notifications in default state', () => {
    expect(store.getters['notifications/notifications']).toStrictEqual([]);
  });

  it('should add a notification', () => {
    const notification: any = jest.fn();
    expect(store.dispatch('notifications/addNotification', notification));

    expect(store.getters['notifications/notifications']).toStrictEqual([notification]);
  });
});
