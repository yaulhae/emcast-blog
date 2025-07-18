// src/hooks/useAuthMutation.ts
import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../api/authApi';
import { useAuth } from './useAuth';

export function useRegister() {
  return useMutation({
    mutationFn: registerUser
  });
}

export function useLogin() {
  const setAuth = useAuth((state) => state.login);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (user) => {
      setAuth(user); // Zustand 상태 저장
    }
  });
}
