// src/api/authApi.ts
import axios from 'axios';

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

export const loginUser = async (email: string, password: string) => {
  const res = await axios.get(`${API_URL}/users`, {
    params: { email, password }
  });
  if (res.data.length === 0) {
    throw new Error('Invalid credentials');
  }
  return res.data[0]; // 첫 번째 유저 반환
};
