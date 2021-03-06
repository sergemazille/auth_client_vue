import store from '@/infrastructure/secondary/persistence/vuex/VuexStore';

describe('Vuex Auth module', () => {
  test('that user is not authenticated as a default state', () => {
    expect(store.getters['auth/isAuthenticated']).toBeFalsy();
  });

  it('should log user in store', () => {
    store.dispatch('auth/logIn');

    expect(store.getters['auth/isAuthenticated']).toBeTruthy();
  });

  it('should log user out from store', () => {
    store.state.auth.isAuthenticated = true;

    store.dispatch('auth/logOut');

    expect(store.getters['auth/isAuthenticated']).toBeFalsy();
  });
});
