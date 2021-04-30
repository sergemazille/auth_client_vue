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

describe('Register user via API', () => {
  beforeEach(() => {
    localStorage.clear();
    createAuthStore();
    apiCaller = createApiCaller();
    notificationsService = { publish: jest.fn() };
  });

  it('should make an api call on a register attempt', async () => {
    expect.assertions(2);

    const credentials: any = { email: 'user@email.com', password: 'password' };

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.register(credentials);

    const expectedCallArgs = ['/register', credentials];

    expect(authService.apiCaller.caller.post).toHaveBeenCalledTimes(1);
    expect(authService.apiCaller.caller.post).toHaveBeenCalledWith(...expectedCallArgs);
  });

  it('should log user in store after successfull registration', async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.register(credentials);

    expect(authStore.dispatch).toHaveBeenCalledTimes(1);
    expect(authStore.dispatch).toHaveBeenCalledWith('logIn');
  });

  it('should create an error notification if register attempt fails', async () => {
    expect.assertions(2);

    const credentials: any = jest.fn();
    const errorMessage = 'User already exist';

    const caller = { post: () => Promise.reject({ message: errorMessage }) }; // let's pretend user already exists
    apiCaller = createApiCaller(caller);

    const authService = new AuthUsingApi(authStore, apiCaller, notificationsService);

    await authService.register(credentials);

    expect(notificationsService.publish).toHaveBeenCalledTimes(1);
    expect(notificationsService.publish).toHaveBeenCalledWith({ message: errorMessage, type: 'error' });
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
});
