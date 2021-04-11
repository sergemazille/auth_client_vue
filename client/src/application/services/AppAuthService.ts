import { AuthService } from '@/application/services/AuthService';
import { Credentials } from '@/application/Credentials';
import { Store } from 'vuex';
import { StoreAuth } from '@/infrastructure/auth/AuthStore';

export class AppAuthService implements AuthService {
  constructor(private readonly store: Store<StoreAuth>) {}

  get isAuthenticated(): boolean {
    return this.store.getters['auth/isAuthenticated'];
  }

  logIn(_credentials: Credentials): void {
    this.store.dispatch('auth/logIn');
  }

  logOut(): void {
    this.store.dispatch('auth/logOut');
  }

  register(_credentials: Credentials): void {
    this.store.dispatch('auth/logIn');
  }
}
