import { NotificationMessage } from '@/application/models/notification/NotificationMessage';
import { NotificationType } from '@/application/models/notification/NotificationType';

export class Notification {
  private constructor(public readonly type: NotificationType, public readonly message: NotificationMessage) {}

  static fromProperties(type: NotificationType, message: NotificationMessage): Notification {
    return new Notification(type, message);
  }
}
