import { Notification } from '@/application/models/notification/Notification';

describe('Notification', () => {
  it('should not allow to create a Notification from an invalid notification type', () => {
    const invalidType = 'non-existing-notification-type';

    const createNotification = () => Notification.fromScalar(invalidType, 'whatever');

    expect(createNotification).toThrow('Invalid type of notification');
  });

  it('should not allow to create a Notification from an empty notification message', () => {
    const type = 'error';
    const invalidMessage = '';

    const createNotification = () => Notification.fromScalar(type, invalidMessage);

    expect(createNotification).toThrow('Notification message can not be empty');
  });
});
