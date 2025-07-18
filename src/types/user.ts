export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // 로그인 시에는 사용됨
  accountType: 'admin' | 'user' | 'guest';
}
