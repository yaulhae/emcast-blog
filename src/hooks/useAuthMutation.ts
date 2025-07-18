// src/hooks/useAuthMutation.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { LoginPayload } from '../types/auth';
import { useAuth } from './useAuth';

const API_URL = 'http://localhost:3001'; // json-server 실행 주소

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
      accountType: string;
    }) => {
      // 1. 중복 이메일 검사
      const emailRes = await axios.get(`${API_URL}/users`, {
        params: { email: data.email }
      });
      if (emailRes.data.length > 0) {
        throw new Error('이미 등록된 이메일입니다.');
      }

      // 2. 중복 이름 검사 (선택)
      const nameRes = await axios.get(`${API_URL}/users`, {
        params: { name: data.name }
      });
      if (nameRes.data.length > 0) {
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
  const setUser = useAuth((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),
    onSuccess: (user) => {
      setUser(user); //
      sessionStorage.setItem('authUser', JSON.stringify(user));
      alert(`${user.name}님, 환영합니다!`);
      navigate('/posts');
    },
    onError: (error: any) => {
      alert(error.message || '로그인 실패');
    }
  });
}
