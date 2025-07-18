import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
});

export const signUpSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  accountType: z.enum(['user', 'admin', 'guest'])
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
