import HeaderMenu from '@/application/views/components/HeaderMenu.vue';
import { shallowMount } from '@vue/test-utils';

const createWrapper = (opts?: Record<string, unknown>) => {
  return shallowMount(HeaderMenu, {
    global: {
      provide: {
        isAuthenticated: false,
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
    const options = {
      provide: {
        isAuthenticated: false,
      },
    };

    const wrapper = createWrapper(options);
    const loginLink = wrapper.find('[data-selector="login-link"]');
    const registerLink = wrapper.find('[data-selector="register-link"]');

    expect(loginLink.exists()).toBeTruthy();
    expect(registerLink.exists()).toBeTruthy();
  });
});
