import Auth from '@/infrastructure/primary/pages/Auth.vue';
import { routeNames } from '@/infrastructure/secondary/routing/routeNames';
import { shallowMount } from '@vue/test-utils';

let authService: any;
let routerService: any;

const createAuthService = () => {
  authService = {
    logIn: jest.fn(),
    register: jest.fn(),
  };
};

const createRouterService = (params?: { currentRouteName: string }) => {
  const currentRouteName = params?.currentRouteName || routeNames.LOGIN;

  routerService = {
    currentRouteName,
    routeNames,
    router: {
      currentRoute: { value: { query: {} } },
      push: jest.fn(),
    },
  };
};

const createWrapper = (authService: any, routerService: any) => {
  return shallowMount(Auth, {
    global: {
      provide: {
        authService,
        routerService,
      },
    },
  });
};

describe('Auth page', () => {
  beforeEach(() => {
    createAuthService();
    createRouterService();
  });

  it('should display login title on login page', () => {
    createRouterService({ currentRouteName: routeNames.LOGIN });
    const wrapper = createWrapper(authService, routerService);

    const expectedPageTitle = 'LOGIN';

    expect(wrapper.text()).toContain(expectedPageTitle);
  });

  it('should display register title on register page', () => {
    createRouterService({ currentRouteName: routeNames.REGISTER });
    const wrapper = createWrapper(authService, routerService);

    const expectedPageTitle = 'REGISTER';

    expect(wrapper.text()).toContain(expectedPageTitle);
  });

  it('should call login authentication service when the login form has been submitted', () => {
    const credentials = { email: 'user@email.com', password: 'password' };

    createRouterService({ currentRouteName: routeNames.LOGIN });
    const wrapper = createWrapper(authService, routerService);

    wrapper.vm.handleFormSubmission(credentials);

    expect(authService.logIn).toHaveBeenCalledTimes(1);
    expect(authService.logIn).toHaveBeenCalledWith(credentials);
  });

  it('should call register authentication service when the registration form has been submitted', () => {
    const credentials = { email: 'user@email.com', password: 'password' };

    createRouterService({ currentRouteName: routeNames.REGISTER });
    const wrapper = createWrapper(authService, routerService);

    wrapper.vm.handleFormSubmission(credentials);

    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(authService.register).toHaveBeenCalledWith(credentials);
  });
});
