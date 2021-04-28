import NotificationsContainer from '@/infrastructure/ui/components/NotificationsContainer.vue';
import Notification from '@/infrastructure/ui/components/Notification.vue';
import { shallowMount } from '@vue/test-utils';

describe('NotificationsContainer', () => {
  it('should allow multiple notifications at the same time', async () => {
    const errorNotification: any = { type: 'error', message: 'Error message' };
    const successNotification: any = { type: 'success', message: 'Success message' };
    const warningNotification: any = { type: 'warning', message: 'Warning message' };
    const notifications: any = [errorNotification, successNotification, warningNotification];
    const notificationsService: any = {
      get notifications() {
        return notifications;
      },
    };

    const wrapper = shallowMount(NotificationsContainer, {
      global: {
        provide: { notificationsService },
      },
    });

    const componentNotifications = notificationsService.notifications;

    expect(componentNotifications.length).toBe(3);
    expect(wrapper.findAllComponents(Notification).length).toBe(3);
  });
});
