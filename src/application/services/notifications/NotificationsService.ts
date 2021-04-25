import { Notification } from '@/application/models/notification/Notification';

export interface NotificationsService {
  publish(notification: Notification): void;
  notifications: Array<Notification>;
}
