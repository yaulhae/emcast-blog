import { User } from './user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthStore {
  user: User | null;
  isInitialized: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  initializeUser: () => void;
}
