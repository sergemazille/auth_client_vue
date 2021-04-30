import HeaderMenu from '@/infrastructure/primary/components/HeaderMenu.vue';
import { shallowMount } from '@vue/test-utils';
import { VueRouterFactory } from '@/infrastructure/secondary/routing/VueRouterFactory';
import { RouterUsingVueRouter } from '@/infrastructure/secondary/routing/RouterUsingVueRouter';

let authService: any = jest.fn();

const createAuthService = (opts?: Record<string, any>) => {
  return {
    isAuthenticated: false,
    logOut: jest.fn(),

    ...opts,
  };
};

const createWrapper = () => {
  const routes: Array<any> = [];
  const { router } = new VueRouterFactory(routes, authService);
  const routerService = new RouterUsingVueRouter(router);
  routerService.router.push = jest.fn();

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
  it('should display dashboard and register links when user is not authenticated', () => {
    authService = createAuthService({ isAuthenticated: false });
    const wrapper = createWrapper();

    const dashboardLink = wrapper.find('[data-selector="dashboard-link"]');
    const registerLink = wrapper.find('[data-selector="register-link"]');

    expect(dashboardLink.exists()).toBeTruthy();
    expect(registerLink.exists()).toBeTruthy();
  });

  it('should not display logout links if user is not authenticated', () => {
    authService = createAuthService({ isAuthenticated: false });
    const wrapper = createWrapper();

    const logoutAction = wrapper.find('[data-selector="logout-action"]');

    expect(logoutAction.exists()).toBeFalsy();
  });

  it('should not display register link if user is authenticated', () => {
    authService = createAuthService({ isAuthenticated: true });
    const wrapper = createWrapper();

    const registerLink = wrapper.find('[data-selector="register-link"]');

    expect(registerLink.exists()).toBeFalsy();
  });

  it('should display dashboard link if user is authenticated', () => {
    authService = createAuthService({ isAuthenticated: true });
    const wrapper = createWrapper();

    const dashboardLink = wrapper.find('[data-selector="dashboard-link"]');

    expect(dashboardLink.exists()).toBeTruthy();
  });

  it('should display logout link if user is authenticated', () => {
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
