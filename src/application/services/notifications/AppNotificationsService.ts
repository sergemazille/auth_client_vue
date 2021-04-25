import { Notification } from '@/application/models/notification/Notification';
import { NotificationsService } from '@/application/services/notifications/NotificationsService';
import { Store } from '@/application/models/Store';

export class AppNotificationsService implements NotificationsService {
  constructor(private readonly store: Store) {}

  publish(notification: Notification): void {
    this.store.dispatch('addNotification', notification);
  }

  get notifications(): Array<Notification> {
    return this.store.get('notifications');
  }
}
