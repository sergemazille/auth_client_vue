import store from '@/infrastructure/persistence/VuexStore';

describe('NotificationStore', () => {
  it('should not be any notifications in default state', () => {
    expect(store.getters['notifications/notifications']).toStrictEqual([]);
  });
});
