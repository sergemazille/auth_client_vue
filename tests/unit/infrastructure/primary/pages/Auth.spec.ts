import Auth from '@/infrastructure/primary/pages/Auth.vue';
import { routeNames } from '@/infrastructure/secondary/routing/routeNames';
import { shallowMount } from '@vue/test-utils';

let authService: any;
let routerService: any;

const createWrapper = () => {
  return shallowMount(Auth, {
    global: {
      provide: {
        authService,
        routerService,
      },
    },
  });
};

const createRouterService = ({ currentRouteName }: any) => {
  return {
    currentRouteName,
    routeNames: { LOGIN: routeNames.LOGIN, REGISTER: routeNames.REGISTER },
    router: {
      currentRoute: { value: { query: {} } },
      push: jest.fn(),
    },
  };
};

describe('Auth page', () => {
  it('should display login title on login page', () => {
    routerService = createRouterService({ currentRouteName: routeNames.LOGIN });
    const wrapper = createWrapper();

    const expected = 'LOGIN';

    expect(wrapper.text()).toContain(expected);
  });

  it('should display register title on register page', () => {
    routerService = createRouterService({ currentRouteName: routeNames.REGISTER });
    const wrapper = createWrapper();

    const expected = 'REGISTER';

    expect(wrapper.text()).toContain(expected);
  });

  it('should call login authentication service when the login form has been submitted', () => {
    const email = 'user@email.com';
    const password = 'password';
    const credentials = { email, password };

    authService = { logIn: jest.fn() };
    routerService = createRouterService({ currentRouteName: routeNames.LOGIN });
    const wrapper = createWrapper();

    wrapper.vm.handleFormSubmission(credentials);

    expect(authService.logIn).toHaveBeenCalledTimes(1);
    expect(authService.logIn).toHaveBeenCalledWith(credentials);
  });

  it('should call register authentication service when the registration form has been submitted', () => {
    const email = 'user@email.com';
    const password = 'password';
    const credentials = { email, password };

    authService = { register: jest.fn() };
    routerService = createRouterService({ currentRouteName: routeNames.REGISTER });
    const wrapper = createWrapper();

    wrapper.vm.handleFormSubmission(credentials);

    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(authService.register).toHaveBeenCalledWith(credentials);
  });
});
