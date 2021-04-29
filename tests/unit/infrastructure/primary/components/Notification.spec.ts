import Notification from '@/infrastructure/primary/components/Notification.vue';
import { shallowMount } from '@vue/test-utils';

describe('Notification', () => {
  it('should have a class corresponding to its type', () => {
    const wrapper = shallowMount(Notification, {
      props: {
        type: 'error',
        message: '',
      },
    });

    expect(wrapper.classes()).toContain('error');
  });
});
