// src/hooks/useAuth.ts
import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  accountType: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}));
