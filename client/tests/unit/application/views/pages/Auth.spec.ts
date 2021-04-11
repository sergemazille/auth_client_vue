import Auth from '@/application/views/pages/Auth.vue';
import { RouteName } from '@/infrastructure/VueRouter';
import { shallowMount } from '@vue/test-utils';

let routerService: any;

const createWrapper = () => {
  return shallowMount(Auth, {
    global: {
      provide: {
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
});
