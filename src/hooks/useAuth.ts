// src/hooks/useAuth.ts
import { create } from 'zustand';
import { AuthStore } from '../types/auth';

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => {
    set({ user: null });
  },
  initializeUser: () => {
    const storedUser = sessionStorage.getItem('authUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({ user });
      } catch (err) {
        console.error('이미 로그인한 유저의 정보 파싱 실패', err);
      }
    }
    set({ isInitialized: true });
  }
}));
