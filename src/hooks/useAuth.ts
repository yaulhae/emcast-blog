// src/hooks/useAuth.ts
import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  isInitialized: boolean; // ✅ 초기화 완료 여부
  login: (user: User) => void;
  logout: () => void;
  initializeUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isInitialized: false, // 초기에는 false
  login: (user) => {
    sessionStorage.setItem('authUser', JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    sessionStorage.removeItem('authUser');
    set({ user: null });
  },
  initializeUser: () => {
    const storedUser = sessionStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        set({ user: parsed });
      } catch (err) {
        console.error('유저 정보 파싱 실패', err);
      }
    }
    set({ isInitialized: true }); // ✅ 초기화 완료
  }
}));
