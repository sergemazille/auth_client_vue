import HeaderMenu from '@/application/views/components/HeaderMenu.vue';
import { shallowMount } from '@vue/test-utils';

const createWrapper = () => {
  return shallowMount(HeaderMenu);
};

describe('HeaderMenu', () => {
  it('should be a Vue component', () => {
    const wrapper = createWrapper();

    expect(wrapper.exists()).toBeTruthy();
  });
});
