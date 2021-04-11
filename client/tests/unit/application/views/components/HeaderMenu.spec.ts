import HeaderMenu from '@/application/views/components/HeaderMenu.vue';
import { shallowMount } from '@vue/test-utils';

const createWrapper = (opts?: Record<string, unknown>) => {
  return shallowMount(HeaderMenu, {
    global: {
      provide: {
        authService: {
          isAuthenticated: false,
        },
      },

      stubs: ['router-link'],

      ...opts,
    },
  });
};

describe('HeaderMenu', () => {
  it('should be a Vue component', () => {
    const wrapper = createWrapper();

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should display login and register links if user is not authenticated', () => {
    const userIsNotAuthenticated = { provide: { authService: { isAuthenticated: false } } };
    const wrapper = createWrapper(userIsNotAuthenticated);

    const loginLink = wrapper.find('[data-selector="login-link"]');
    const registerLink = wrapper.find('[data-selector="register-link"]');

    expect(loginLink.exists()).toBeTruthy();
    expect(registerLink.exists()).toBeTruthy();
  });

  it('should not display logout links if user is not authenticated', () => {
    const userIsNotAuthenticated = { provide: { authService: { isAuthenticated: false } } };
    const wrapper = createWrapper(userIsNotAuthenticated);

    const logoutLink = wrapper.find('[data-selector="logout-action"]');

    expect(logoutLink.exists()).toBeFalsy();
  });

  it('should not display login and register links if user is authenticated', () => {
    const userIsAuthenticated = { provide: { authService: { isAuthenticated: true } } };
    const wrapper = createWrapper(userIsAuthenticated);

    const loginLink = wrapper.find('[data-selector="login-link"]');
    const registerLink = wrapper.find('[data-selector="register-link"]');

    expect(loginLink.exists()).toBeFalsy();
    expect(registerLink.exists()).toBeFalsy();
  });

  it('should display logout links if user is authenticated', () => {
    const userIsAuthenticated = { provide: { authService: { isAuthenticated: true } } };
    const wrapper = createWrapper(userIsAuthenticated);

    const logoutLink = wrapper.find('[data-selector="logout-action"]');

    expect(logoutLink.exists()).toBeTruthy();
  });
});
