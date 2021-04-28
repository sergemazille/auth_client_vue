import { AuthUsingApi } from '@/infrastructure/AuthUsingApi';
import { LocalStorageMock } from '@unit/support/LocalStorageMock';

window.localStorage = new LocalStorageMock();
let apiCaller: any;
let authStore: any;
let notificationsService: any;

const createApiCaller = (caller?: any, endpoints?: any) => {
  return {
    caller: caller || { post: jest.fn() },
    endpoints: endpoints || { LOGIN: '/login' },
  };
};

const createAuthStore = (doAuthenticate = false) => {
  authStore = {
    get: (param: string) => (param === 'isAuthenticated' ? doAuthenticate : null),
    dispatch: jest.fn(),
  };
};

describe('AppAuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    createAuthStore();
    apiCaller = createApiCaller();
    notificationsService = { publish: jest.fn() };
  });

  it('should return correct authentication status when user is authenticated', () => {
    const isAuthenticated = true;
    createAuthStore(isAuthenticated);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    expect(authService.isAuthenticated).toBeTruthy();
  });

  it('should return correct authentication status when user is not authenticated', () => {
    const isAuthenticated = false;
    createAuthStore(isAuthenticated);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    expect(authService.isAuthenticated).toBeFalsy();
  });

  it('should validate credentials via an api call', async () => {
    expect.assertions(2);

    const credentials: any = { email: 'user@email.com', password: 'password' };

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.logIn(credentials);

    const expectedCallArgs = ['/login', credentials];

    expect(authService.apiCaller.caller.post).toHaveBeenCalledTimes(1);
    expect(authService.apiCaller.caller.post).toHaveBeenCalledWith(...expectedCallArgs);
  });

  it('should not call api if user is already logged in on a login attempt', async () => {
    expect.assertions(1);

    const credentials: any = jest.fn();

    const isAuthenticated = true;
    createAuthStore(isAuthenticated);
    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.logIn(credentials);

    expect(authService.apiCaller.caller.post).not.toHaveBeenCalled();
  });

  it("should login attempt fail if api call's response is not ok", async () => {
    expect.assertions(1);

    const credentials: any = jest.fn();

    const caller = { post: () => Promise.reject() }; // let's pretend backend service rejects credentials
    apiCaller = createApiCaller(caller);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.logIn(credentials);

    expect(authService.isAuthenticated).toBeFalsy();
  });

  it('should create an error notification if login attempt fails', async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();
    const errorMessage = 'Invalid credentials or unknown user';

    const caller = { post: () => Promise.reject({ message: errorMessage }) }; // let's pretend backend service rejects credentials
    apiCaller = createApiCaller(caller);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.logIn(credentials);

    expect(notificationsService.publish).toHaveBeenCalledTimes(1);
    expect(notificationsService.publish).toHaveBeenCalledWith({ message: errorMessage, type: 'error' });
  });

  it('should create an error notification with default message if login attempt fails for unknown reason', async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();

    const caller = { post: () => Promise.reject('no precision about the error') }; // let's pretend backend service failed for unknown reason
    apiCaller = createApiCaller(caller);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.logIn(credentials);

    expect(notificationsService.publish).toHaveBeenCalledTimes(1);
    expect(notificationsService.publish).toHaveBeenCalledWith({ message: 'Une erreur est survenue', type: 'error' });
  });

  it("should login attempt succeed if api call's response is ok", async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();

    const caller = { post: () => Promise.resolve() }; // let's pretend backend service approves credentials
    apiCaller = createApiCaller(caller);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.logIn(credentials);

    expect(authService.isAuthenticated).toBeTruthy();
    expect(localStorage.getItem('isAuthenticated')).toBeTruthy();
  });

  it('should log user out of store', () => {
    const isAuthenticated = true;
    createAuthStore(isAuthenticated);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    authService.logOut();

    expect(authStore.dispatch).toHaveBeenCalledTimes(1);
    expect(authStore.dispatch).toHaveBeenCalledWith('logOut');
  });

  // @todo: update when registration feature is done
  it('should log user in store after successfull registration', async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.register(credentials);

    expect(authStore.dispatch).toHaveBeenCalledTimes(1);
    expect(authStore.dispatch).toHaveBeenCalledWith('logIn');
  });
});
