import { AppAuthService } from '@/application/services/auth/AppAuthService';
import store from '@/infrastructure/persistence/vuex/VuexStore';
import { LocalStorageMock } from '@unit/support/LocalStorageMock';

window.localStorage = new LocalStorageMock();
let apiCaller: any;

const createApiCaller = (caller?: any, endpoints?: any) => {
  return {
    caller: caller || { post: jest.fn() },
    endpoints: endpoints || { LOGIN: '/login' },
  };
};

describe('AppAuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    apiCaller = createApiCaller();
  });

  it('should return correct authentication status when user is authenticated', () => {
    store.state.auth.isAuthenticated = true;
    const authService = new AppAuthService(store, apiCaller);

    expect(authService.isAuthenticated).toBeTruthy();
  });

  it('should return correct authentication status when user is not authenticated', () => {
    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store, apiCaller);

    expect(authService.isAuthenticated).toBeFalsy();
  });

  it('should validate credentials via an api call', async () => {
    expect.assertions(2);

    const credentials: any = { email: 'user@email.com', password: 'password' };

    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store, apiCaller);

    await authService.logIn(credentials);

    const expectedCallArgs = ['/login', credentials];

    expect(authService.apiCaller.caller.post).toHaveBeenCalledTimes(1);
    expect(authService.apiCaller.caller.post).toHaveBeenCalledWith(...expectedCallArgs);
  });

  it('should not call api if user is already logged in on a login attempt', async () => {
    expect.assertions(1);

    const credentials: any = jest.fn();

    store.state.auth.isAuthenticated = true;
    const authService = new AppAuthService(store, apiCaller);

    await authService.logIn(credentials);

    expect(authService.apiCaller.caller.post).not.toHaveBeenCalled();
  });

  it("should login attempt fail if api call's response is not ok", async () => {
    expect.assertions(1);

    const credentials: any = jest.fn();

    store.state.auth.isAuthenticated = false;
    const caller = { post: () => Promise.reject() }; // let's pretend backend service rejects credentials
    apiCaller = createApiCaller(caller);
    const authService = new AppAuthService(store, apiCaller);

    await authService.logIn(credentials);

    expect(authService.isAuthenticated).toBeFalsy();
  });

  it("should login attempt succeed if api call's response is ok", async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();

    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store, apiCaller);

    await authService.logIn(credentials);

    expect(authService.isAuthenticated).toBeTruthy();
    expect(localStorage.getItem('isAuthenticated')).toBeTruthy();
  });

  it('should log user out', () => {
    store.state.auth.isAuthenticated = true;
    const authService = new AppAuthService(store, apiCaller);

    authService.logOut();

    expect(authService.isAuthenticated).toBeFalsy();
    expect(localStorage.getItem('isAuthenticated')).toBeFalsy();
  });

  it('should register user', async () => {
    expect.assertions(1);

    const credentials: any = jest.fn();

    store.state.auth.isAuthenticated = false;
    const authService = new AppAuthService(store, apiCaller);

    await authService.register(credentials);

    expect(authService.isAuthenticated).toBeTruthy();
  });
});
