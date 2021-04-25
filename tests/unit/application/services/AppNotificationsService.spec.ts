import { AppNotificationsService } from '@/application/services/notifications/AppNotificationsService';

describe('AppNotificationsService', () => {
  it('should call notifications store when a new notification is published', () => {
    const notification: any = jest.fn();
    const notificationStore: any = { dispatch: jest.fn() };
    const notificationsService = new AppNotificationsService(notificationStore);

    notificationsService.publish(notification);

    const expectedCallArgs = ['addNotification', notification];

    expect(notificationStore.dispatch).toHaveBeenCalledTimes(1);
    expect(notificationStore.dispatch).toHaveBeenCalledWith(...expectedCallArgs);
  });

  it('should get notifications from store', () => {
    const notifications: any = [jest.fn()];
    const notificationStore: any = { get: jest.fn(() => notifications) };
    const notificationsService = new AppNotificationsService(notificationStore);
    const storedNotifications = notificationsService.notifications;

    expect(notificationStore.get).toHaveBeenCalledTimes(1);
    expect(notificationStore.get).toHaveBeenCalledWith('notifications');
    expect(storedNotifications).toStrictEqual(notifications);
  });
});
