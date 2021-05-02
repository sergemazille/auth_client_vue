import { NotificationMessage } from '@/application/models/notification/NotificationMessage';
import { NotificationType } from '@/application/models/notification/NotificationType';

export class Notification {
  private constructor(public readonly type: NotificationType, public readonly message: NotificationMessage) {}

  static fromScalar(type: string, message: string): Notification {
    Notification.validateType(type);
    Notification.validateMessage(message);

    return new Notification(type as NotificationType, message);
  }

  private static validateType(type: string): void {
    const isValidType = Object.values(NotificationType).includes(type as NotificationType);

    if (!isValidType) {
      throw new Error('Invalid type of notification');
    }
  }

  private static validateMessage(message: string): void {
    if (!message) {
      throw new Error('Notification message can not be empty');
    }
  }
}
