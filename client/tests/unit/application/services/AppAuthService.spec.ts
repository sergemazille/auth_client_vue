import { AppAuthService } from '@/application/services/AppAuthService';
import store from '@/infrastructure/VuexStore';

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
    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store);

    authService.logIn();

    expect(authService.isAuthenticated).toBeTruthy();
  });

  it('should log user out', () => {
    store.state.auth.isAuthenticated = true;
    const authService = new AppAuthService(store);

    authService.logOut();

    expect(authService.isAuthenticated).toBeFalsy();
  });
});
