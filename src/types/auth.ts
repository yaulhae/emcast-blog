import { Control } from 'react-hook-form';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  accountType: 'admin' | 'user' | 'guest';
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  accountType: string;
}
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

export interface AuthTextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  control: Control<any>;
}

export interface AlreadyHaveAccountLinkProps {
  mode: 'signup' | 'signin';
}
