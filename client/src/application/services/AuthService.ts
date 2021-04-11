import { Credentials } from '@/application/Credentials';

export interface AuthService {
  isAuthenticated: boolean;
  logIn: (credentials: Credentials) => void;
  logOut: () => void;
}
