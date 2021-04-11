import Auth from '@/application/views/pages/Auth.vue';
import { RouteName } from '@/infrastructure/VueRouter';
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

describe('Auth page', () => {
  it('should display login title on login page', () => {
    routerService = { currentRouteName: RouteName.LOGIN };
    const wrapper = createWrapper();

    const expected = RouteName.LOGIN;

    expect(wrapper.text()).toContain(expected);
  });

  it('should display register title on register page', () => {
    routerService = { currentRouteName: RouteName.REGISTER };
    const wrapper = createWrapper();

    const expected = RouteName.REGISTER;

    expect(wrapper.text()).toContain(expected);
  });

  it('should call login authentication service when the login form has been submitted', () => {
    const email = 'user@email.com';
    const password = 'password';
    const credentials = { email, password };

    authService = { logIn: jest.fn() };
    routerService = { currentRouteName: RouteName.LOGIN, routeName: { LOGIN: RouteName.LOGIN } };
    const wrapper = createWrapper();

    wrapper.vm.handleFormSubmission(credentials);

    expect(authService.logIn).toHaveBeenCalledTimes(1);
    expect(authService.logIn).toHaveBeenCalledWith(credentials);
  });
});
