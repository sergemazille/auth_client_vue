import UserAuthForm from '@/application/views/components/UserAuthForm.vue';
import { shallowMount } from '@vue/test-utils';

const createWrapper = () => {
  return shallowMount(UserAuthForm);
};

describe('UserAuthForm', () => {
  it('should be a Vue component', () => {
    const wrapper = createWrapper();

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should have correct default props', () => {
    const wrapper = createWrapper();

    expect(wrapper.props('title')).toBe('');
  });

  it('should not allow form submission when input fields are not valid', () => {
    const wrapper = createWrapper();

    wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('form-submitted')).toBeFalsy();
  });

  it('should submit form with input fields values when they are valid', async () => {
    const credentials = { email: 'user@email.com', password: 'password' };

    const wrapper = createWrapper();
    await wrapper.setData(credentials);

    wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('form-submitted')).toStrictEqual([[credentials]]);
  });

  it('should disable form submission button when input fields are not valid', () => {
    const wrapper = createWrapper();

    const buttonEl = wrapper.find('button').element;

    expect(buttonEl.disabled).toBeTruthy();
  });

  it('should enable form submission button when input fields are valid', async () => {
    const wrapper = createWrapper();
    await wrapper.setData({ email: 'user@email.com', password: 'password' });

    const buttonEl = wrapper.find('button').element;

    expect(buttonEl.disabled).toBeFalsy();
  });
});
