import { AuthService } from './AuthService';
import { Store } from 'vuex';
import { StoreAuth } from '@/infrastructure/auth/AuthStore';

export class AppAuthService implements AuthService {
  constructor(private readonly store: Store<StoreAuth>) {}

  get isAuthenticated(): boolean {
    return this.store.getters['auth/isAuthenticated'];
  }

  logIn(): void {
    this.store.dispatch('auth/logIn');
  }

  logOut(): void {
    this.store.dispatch('auth/logOut');
  }
}
