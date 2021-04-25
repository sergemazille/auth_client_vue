import { NotificationMessage } from '@/application/models/notification/NotificationMessage';
import { NotificationType } from '@/application/models/notification/NotificationType';

export class Notification {
  constructor(public readonly type: NotificationType, public readonly message: NotificationMessage) {}
}
