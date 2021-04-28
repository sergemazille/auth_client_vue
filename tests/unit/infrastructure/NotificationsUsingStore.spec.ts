import { NotificationsUsingStore } from '@/infrastructure/NotificationsUsingStore';

jest.useFakeTimers();

let notification: any = jest.fn();
let notificationStore: any = { dispatch: jest.fn() };
const notificationTimeToLiveInMs = 0;

describe('AppNotificationsService', () => {
  beforeEach(() => {
    notification = jest.fn();
    notificationStore = {
      dispatch: jest.fn(),
      get: jest.fn(),
    };
  });

  it('should call notifications store when a new notification is published', () => {
    // prepare
    const notificationsService = new NotificationsUsingStore(notificationStore, notificationTimeToLiveInMs);

    // act
    notificationsService.publish(notification);

    // assert
    const expectedCallArgs = ['addNotification', notification];

    expect(notificationStore.dispatch).toHaveBeenCalledWith(...expectedCallArgs);
  });

  it('should get notifications from store', () => {
    // prepare
    const notifications: any = [jest.fn()];
    notificationStore = { get: jest.fn(() => notifications) };
    const notificationsService = new NotificationsUsingStore(notificationStore, notificationTimeToLiveInMs);

    // act
    const storedNotifications = notificationsService.notifications;

    // assert
    expect(notificationStore.get).toHaveBeenCalledTimes(1);
    expect(notificationStore.get).toHaveBeenCalledWith('notifications');
    expect(storedNotifications).toStrictEqual(notifications);
  });

  it('should call store to remove notification after default time to live', () => {
    // prepare
    const notificationsService = new NotificationsUsingStore(notificationStore, notificationTimeToLiveInMs);

    // act
    notificationsService.publish(notification);
    jest.runAllTimers();

    // assert
    const expectedCallArgs = ['removeNotification', notification];

    expect(notificationStore.dispatch).toHaveBeenLastCalledWith(...expectedCallArgs);
  });
});
