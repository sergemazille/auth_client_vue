import NotificationsContainer from '@/infrastructure/ui/components/NotificationsContainer.vue';
import { shallowMount } from '@vue/test-utils';

describe('NotificationsContainer', () => {
  it('should access app notifications', async () => {
    const errorNotification: any = { type: 'error', message: 'Error message' };
    const successNotification: any = { type: 'success', message: 'Success message' };
    const warningNotification: any = { type: 'warning', message: 'Warning message' };
    const notifications: any = [errorNotification, successNotification, warningNotification];
    const notificationsService: any = {
      get notifications() {
        return notifications;
      },
    };

    shallowMount(NotificationsContainer, {
      global: {
        provide: { notificationsService },
      },
    });

    const componentNotifications = notificationsService.notifications;

    expect(componentNotifications.length).toBe(3);
  });
});
