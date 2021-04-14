import { AuthService } from '@/application/services/AuthService';
import { Credentials } from '@/application/models/Credentials';
import { Store } from 'vuex';
import { StoreAuth } from '@/infrastructure/persistence/auth/AuthStore';

export class AppAuthService implements AuthService {
  constructor(private readonly store: Store<StoreAuth>) {}

  get isAuthenticated(): boolean {
    const isAuthenticatedInMemory = this.store.getters['auth/isAuthenticated'];
    const isAuthenticatedLocally = !!localStorage.getItem('isAuthenticated');

    return isAuthenticatedInMemory || isAuthenticatedLocally;
  }

  logIn(_credentials: Credentials): void {
    this.store.dispatch('auth/logIn');

    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  }

  logOut(): void {
    this.store.dispatch('auth/logOut');

    localStorage.removeItem('isAuthenticated');
  }

  register(_credentials: Credentials): void {
    this.logIn(_credentials);
  }
}
