export interface AuthService {
  isAuthenticated: boolean;
  logIn: () => void;
  logOut: () => void;
}
