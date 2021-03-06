import { AuthService } from '@/application/services/AuthService';
import { AxiosCaller } from '@/infrastructure/secondary/http/AxiosCaller';
import { Credentials } from '@/application/models/Credentials';
import { Notification } from '@/application/models/notification/Notification';
import { NotificationMessage } from '@/application/models/notification/NotificationMessage';
import { NotificationType } from '@/application/models/notification/NotificationType';
import { NotificationsUsingStore } from '@/infrastructure/secondary/NotificationsUsingStore';
import { Store } from '@/application/models/Store';

export class AuthUsingApi implements AuthService {
  constructor(
    private readonly store: Store,
    public readonly apiCaller: AxiosCaller,
    public readonly notificationsService: NotificationsUsingStore
  ) {}

  get isAuthenticated(): boolean {
    const isAuthenticatedInMemory = this.store.get('isAuthenticated');
    const isAuthenticatedLocally = this.isAuthenticatedLocally();

    return isAuthenticatedInMemory || isAuthenticatedLocally;
  }

  async logIn(credentials: Credentials): Promise<void> {
    if (this.isAuthenticated) {
      return;
    }

    try {
      await this.loginViaApi(credentials);
    } catch (error) {
      let message = 'Une erreur est survenue';

      if (error && error.message) {
        message = error.message;
      }

      const type = NotificationType.error;
      const notification = Notification.fromScalar(type, message);

      this.notificationsService.publish(notification);

      return;
    }

    this.logInMemory();
    this.logInLocally();
  }

  logOut(): void {
    this.logOutFromMemory();
    this.logOutLocally();
  }

  async register(credentials: Credentials): Promise<void> {
    try {
      await this.registerViaApi(credentials);
    } catch (error) {
      let message: NotificationMessage = 'Une erreur est survenue';

      if (error && error.message) {
        message = error.message;
      }

      const type = NotificationType.error;
      const notification = Notification.fromScalar(type, message);

      this.notificationsService.publish(notification);

      return;
    }

    this.logInMemory();
    this.logInLocally();
  }

  private isAuthenticatedLocally(): boolean {
    const storageRawData = localStorage.getItem('isAuthenticated');

    if (storageRawData) {
      return JSON.parse(storageRawData);
    }

    return false;
  }

  private logInMemory() {
    this.store.dispatch('logIn');
  }

  private logInLocally() {
    const isAuthenticated = JSON.stringify(true);
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }

  private logOutFromMemory(): void {
    this.store.dispatch('logOut');
  }

  private logOutLocally(): void {
    localStorage.removeItem('isAuthenticated');
  }

  private async loginViaApi(credentials: Credentials): Promise<void> {
    const {
      caller,
      endpoints: { LOGIN },
    } = this.apiCaller;

    await caller.post(LOGIN, credentials);
  }

  private async registerViaApi(credentials: Credentials): Promise<void> {
    const {
      caller,
      endpoints: { REGISTER },
    } = this.apiCaller;

    await caller.post(REGISTER, credentials);
  }
}
