import HeaderMenu from '@/application/views/components/HeaderMenu.vue';
import { shallowMount } from '@vue/test-utils';
import { VueRouterFactory } from '@/infrastructure/VueRouterFactory';
import { AppRouterService } from '@/application/services/AppRouterService';

let authService: any = jest.fn();

const createAuthService = (opts?: Record<string, any>) => {
  return {
    isAuthenticated: false,
    logOut: jest.fn(),

    ...opts,
  };
};

const createWrapper = () => {
  const { router } = new VueRouterFactory(authService);
  const routerService: any = new AppRouterService(router);

  return shallowMount(HeaderMenu, {
    global: {
      provide: {
        authService,
        routerService,
      },

      stubs: ['router-link'],
    },
  });
};

describe('HeaderMenu', () => {
  it('should display login and register links if user is not authenticated', () => {
    authService = createAuthService({ isAuthenticated: false });
    const wrapper = createWrapper();

    const loginLink = wrapper.find('[data-selector="login-link"]');
    const registerLink = wrapper.find('[data-selector="register-link"]');

    expect(loginLink.exists()).toBeTruthy();
    expect(registerLink.exists()).toBeTruthy();
  });

  it('should not display logout links if user is not authenticated', () => {
    authService = createAuthService({ isAuthenticated: false });
    const wrapper = createWrapper();

    const logoutAction = wrapper.find('[data-selector="logout-action"]');

    expect(logoutAction.exists()).toBeFalsy();
  });

  it('should not display login and register links if user is authenticated', () => {
    authService = createAuthService({ isAuthenticated: true });
    const wrapper = createWrapper();

    const loginLink = wrapper.find('[data-selector="login-link"]');
    const registerLink = wrapper.find('[data-selector="register-link"]');

    expect(loginLink.exists()).toBeFalsy();
    expect(registerLink.exists()).toBeFalsy();
  });

  it('should display logout links if user is authenticated', () => {
    authService = createAuthService({ isAuthenticated: true });
    const wrapper = createWrapper();

    const logoutAction = wrapper.find('[data-selector="logout-action"]');

    expect(logoutAction.exists()).toBeTruthy();
  });

  it('should call logout authentication service when logout button is clicked', async () => {
    expect.assertions(1);

    authService = createAuthService({ isAuthenticated: true });
    const wrapper = createWrapper();

    const logoutAction = wrapper.find('[data-selector="logout-action"]');
    await logoutAction.trigger('click');

    expect(authService.logOut).toHaveBeenCalledTimes(1);
  });
});
