import { AppAuthService } from '@/application/services/AppAuthService';
import store from '@/infrastructure/persistence/VuexStore';

describe('AppAuthService', () => {
  it('should return correct authentication status when user is authenticated', () => {
    store.state.auth.isAuthenticated = true;
    const authService = new AppAuthService(store);

    expect(authService.isAuthenticated).toBeTruthy();
  });

  it('should return correct authentication status when user is not authenticated', () => {
    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store);

    expect(authService.isAuthenticated).toBeFalsy();
  });

  it('should log user in', () => {
    const credentials = { email: 'user@email.com', password: 'password' };

    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store);

    authService.logIn(credentials);

    expect(authService.isAuthenticated).toBeTruthy();
  });

  it('should log user out', () => {
    store.state.auth.isAuthenticated = true;
    const authService = new AppAuthService(store);

    authService.logOut();

    expect(authService.isAuthenticated).toBeFalsy();
  });

  it('should register user', () => {
    const credentials = { email: 'user@email.com', password: 'password' };

    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store);

    authService.register(credentials);

    expect(authService.isAuthenticated).toBeTruthy();
  });
});
