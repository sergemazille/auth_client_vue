import { AuthService } from '@/application/services/auth/AuthService';
import { CallerService } from '@/application/services/http/CallerService';
import { Credentials } from '@/application/models/Credentials';
import { Store } from 'vuex';
import { StoreAuth } from '@/infrastructure/persistence/vuex/modules/Auth';

export class AppAuthService implements AuthService {
  constructor(private readonly store: Store<StoreAuth>, public readonly apiCaller: CallerService) {}

  get isAuthenticated(): boolean {
    const isAuthenticatedInMemory = this.store.getters['auth/isAuthenticated'];
    const isAuthenticatedLocally = this.isAuthenticatedLocally();

    return isAuthenticatedInMemory || isAuthenticatedLocally;
  }

  async logIn(credentials: Credentials): Promise<void> {
    if (this.isAuthenticated) {
      return;
    }

    try {
      await this.validateCredentials(credentials);
    } catch (error) {
      // do something with error.message
      return;
    }

    this.logInMemory();
    this.logInLocally();
  }

  logOut(): void {
    this.logOutFromMemory();
    this.logOutLocally();
  }

  async register(_credentials: Credentials): Promise<void> {
    await this.logIn(_credentials);
  }

  private isAuthenticatedLocally(): boolean {
    const storageRawData = localStorage.getItem('isAuthenticated');

    if (storageRawData) {
      return JSON.parse(storageRawData);
    }

    return false;
  }

  private logInMemory() {
    this.store.dispatch('auth/logIn');
  }

  private logInLocally() {
    const isAuthenticated = JSON.stringify(true);
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }

  private logOutFromMemory(): void {
    this.store.dispatch('auth/logOut');
  }

  private logOutLocally(): void {
    localStorage.removeItem('isAuthenticated');
  }

  private async validateCredentials(credentials: Credentials): Promise<void> {
    const {
      caller,
      endpoints: { LOGIN },
    } = this.apiCaller;

    await caller.post(LOGIN, credentials);
  }
}
