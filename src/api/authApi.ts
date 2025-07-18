// src/api/authApi.ts
import axios from 'axios';
import { LoginPayload } from '../types/auth';

const API_URL = 'http://localhost:3001'; // json-server 실행 주소

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  accountType: string;
}) => {
  const res = await axios.post(`${API_URL}/users`, data);
  return res.data;
};

export const loginUser = async (data: LoginPayload) => {
  const res = await axios.get(`${API_URL}/users`, {
    params: data
  });

  if (res.data.length === 0) {
    throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
  }

  return res.data[0]; // 첫 번째 유저 정보 반환
};
