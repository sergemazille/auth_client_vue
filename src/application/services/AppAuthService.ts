import { AuthService } from '@/application/services/AuthService';
import { Credentials } from '@/application/models/Credentials';
import { Store } from 'vuex';
import { StoreAuth } from '@/infrastructure/persistence/auth/AuthStore';

export class AppAuthService implements AuthService {
  constructor(private readonly store: Store<StoreAuth>) {}

  get isAuthenticated(): boolean {
    const isAuthenticatedInMemory = this.store.getters['auth/isAuthenticated'];
    const isAuthenticatedLocally = this.isAuthenticatedLocally();

    return isAuthenticatedInMemory || isAuthenticatedLocally;
  }

  logIn(_credentials: Credentials): void {
    this.logInMemory();
    this.logInLocally();
  }

  logOut(): void {
    this.logOutFromMemory();
    this.logOutLocally();
  }

  register(_credentials: Credentials): void {
    this.logIn(_credentials);
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
}
