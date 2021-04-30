import { AuthUsingApi } from '@/infrastructure/secondary/AuthUsingApi';
import { LocalStorageMock } from '@unit/support/LocalStorageMock';
import { endpoints as apiEndpoints } from '@/infrastructure/secondary/http/endpoints';

window.localStorage = new LocalStorageMock();
let apiCaller: any;
let authStore: any;
let notificationsService: any;

const createApiCaller = (caller?: any, endpoints?: any) => {
  return {
    caller: caller || { post: jest.fn() },
    endpoints: endpoints || apiEndpoints,
  };
};

const createAuthStore = (doAuthenticate = false) => {
  authStore = {
    get: (param: string) => (param === 'isAuthenticated' ? doAuthenticate : null),
    dispatch: jest.fn(),
  };
};

describe('AuthUsingApi', () => {
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

  it('should create an error notification with default message if register attempt fails for unknown reason', async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();

    const caller = { post: () => Promise.reject('no precision about the error') }; // let's pretend backend service failed for unknown reason
    apiCaller = createApiCaller(caller);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.register(credentials);

    expect(notificationsService.publish).toHaveBeenCalledTimes(1);
    expect(notificationsService.publish).toHaveBeenCalledWith({ message: 'Une erreur est survenue', type: 'error' });
  });

  it('should log user out of store', () => {
    const isAuthenticated = true;
    createAuthStore(isAuthenticated);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    authService.logOut();

    expect(authStore.dispatch).toHaveBeenCalledTimes(1);
    expect(authStore.dispatch).toHaveBeenCalledWith('logOut');
  });
});
