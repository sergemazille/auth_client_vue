import store from '@/infrastructure/persistence/vuex/VuexStore';

describe('Vuex Notification module', () => {
  it('should not be any notifications in default state', () => {
    expect(store.getters['notifications/notifications']).toStrictEqual([]);
  });
});
