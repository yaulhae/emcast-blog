// src/hooks/useAuth.ts
import { create } from 'zustand';
import { User } from '../types/user';

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
