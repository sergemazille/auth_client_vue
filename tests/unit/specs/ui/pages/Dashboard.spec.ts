import { CallerInstance } from '@/application/models/CallerInstance';
import { CallerService } from '@/application/services/CallerService';
import Dashboard from '@/infrastructure/primary/pages/Dashboard.vue';
import { NotificationsService } from '@/application/services/NotificationsService';
import { shallowMount } from '@vue/test-utils';

let apiCaller: any;
let notificationsService: any;

const createApiCaller = (caller?: CallerInstance) => {
  return {
    caller: caller ?? {
      get: jest.fn().mockResolvedValue({ data: { message: 'fake api response message' } }),
    },

    endpoints: {
      AUTH_CONTENT: '/fake-endpoint',
    },
  };
};

const createNotificationsService = () => {
  return {
    publish: jest.fn(),
  };
};

const createWrapper = (apiCaller: CallerService, notificationsService: NotificationsService) => {
  return shallowMount(Dashboard, {
    global: {
      provide: { apiCaller, notificationsService },
    },
  });
};

describe('Dashboard page', () => {
  beforeEach(() => {
    apiCaller = createApiCaller();
    notificationsService = createNotificationsService();
  });

  it('should make an api call to fetch the page content', async () => {
    expect.assertions(2);

    const wrapper = createWrapper(apiCaller, notificationsService);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.apiCaller.caller.get).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.apiCaller.caller.get).toHaveBeenCalledWith('/fake-endpoint');
  });

  it('should display the api response message', async () => {
    expect.assertions(1);

    const wrapper = createWrapper(apiCaller, notificationsService);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('fake api response message');
  });

  it('should publish an error notification when api server response is not OK', async () => {
    expect.assertions(2);

    const caller: any = { get: jest.fn().mockRejectedValue({ message: 'error 500' }) };
    apiCaller = createApiCaller(caller);

    const wrapper = createWrapper(apiCaller, notificationsService);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.notificationsService.publish).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.notificationsService.publish).toHaveBeenCalledWith({ message: 'error 500', type: 'error' });
  });
});
