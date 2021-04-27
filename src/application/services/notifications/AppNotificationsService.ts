import { Notification } from '@/application/models/notification/Notification';
import { NotificationsService } from '@/application/services/notifications/NotificationsService';
import { Store } from '@/application/models/Store';

export class AppNotificationsService implements NotificationsService {
  constructor(private readonly store: Store, private readonly notificationTimeToLiveInMs: number) {}

  publish(notification: Notification): void {
    this.store.dispatch('addNotification', notification);
    this.setExpiration(notification);
  }

  get notifications(): Array<Notification> {
    return this.store.get('notifications');
  }

  private setExpiration(notification: Notification) {
    const { notificationTimeToLiveInMs } = this;

    setTimeout(() => {
      this.store.dispatch('removeNotification', notification);
    }, notificationTimeToLiveInMs);
  }
}
