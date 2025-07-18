// src/hooks/useAuthMutation.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  checkDuplicateEmail,
  checkDuplicateName,
  loginUser
} from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import { LoginPayload, RegisterPayload } from '../types/auth';

const API_URL = 'https://blog-db-json.onrender.com';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      // 1. 이메일 중복 확인
      const isEmailDuplicate = await checkDuplicateEmail(data.email);
      if (isEmailDuplicate) {
        throw new Error('이미 등록된 이메일입니다.');
      }

      // 2. 이름 중복 확인 (선택)
      const isNameDuplicate = await checkDuplicateName(data.name);
      if (isNameDuplicate) {
        throw new Error('이미 사용 중인 이름입니다.');
      }

      // 3. 중복이 없으면 회원가입 진행
      const res = await axios.post(`${API_URL}/users`, data);
      return res.data;
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      navigate('/sign-in');
    },
    onError: (error: any) => {
      alert(error.message || '회원가입 중 오류가 발생했습니다.');
    }
  });
}

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),
    onSuccess: (user) => {
      const { password, ...safeUser } = user; // 비밀번호 제외
      setUser(safeUser);
      sessionStorage.setItem('authUser', JSON.stringify(safeUser));
      alert(`${user.name}님 환영합니다!`);
      navigate('/posts');
    },
    onError: (error: any) => {
      alert(error.message || '로그인 실패');
    }
  });
}
