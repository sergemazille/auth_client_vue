import { Credentials } from '@/application/models/Credentials';

export interface AuthService {
  isAuthenticated: boolean;
  logIn: (credentials: Credentials) => void;
  logOut: () => void;
  register: (credentials: Credentials) => void;
}
