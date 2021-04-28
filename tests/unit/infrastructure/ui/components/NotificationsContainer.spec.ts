import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION, WARNING_NOTIFICATION } from '@fixtures/notifications';
import Notification from '@/infrastructure/ui/components/Notification.vue';
import NotificationsContainer from '@/infrastructure/ui/components/NotificationsContainer.vue';
import { shallowMount } from '@vue/test-utils';

let notificationsService: any;

const createWrapper = () => {
  notificationsService = {
    get notifications() {
      return [ERROR_NOTIFICATION, SUCCESS_NOTIFICATION, WARNING_NOTIFICATION];
    },
  };

  return shallowMount(NotificationsContainer, {
    global: {
      provide: { notificationsService },
    },
  });
};

describe('NotificationsContainer', () => {
  it('should allow multiple notifications at the same time', async () => {
    const wrapper = createWrapper();

    const componentNotifications = notificationsService.notifications;

    expect(componentNotifications.length).toBe(3);
    expect(wrapper.findAllComponents(Notification).length).toBe(3);
  });
});
