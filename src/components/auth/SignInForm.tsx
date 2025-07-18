import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useAuthMutation';

import { SignInFormValues, signInSchema } from '../../schemas/auth.schema';
import AuthTextField from './AuthTextField';

export default function SignInForm() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  });

  const loginMutation = useLogin();
  const onSubmit = (data: SignInFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
    >
      <AuthTextField
        name='email'
        label='Email'
        type='email'
        control={control}
      />
      <AuthTextField
        name='password'
        label='Password'
        type='password'
        control={control}
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  );
}
