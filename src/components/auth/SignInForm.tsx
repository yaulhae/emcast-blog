// components/auth/SignInForm.tsx
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useLogin } from '../../hooks/useAuthMutation';
import AuthTextField from './AuthTextField';

export default function SignInForm() {
  const loginMutation = useLogin();

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateInputs = (form: FormData) => {
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (!validateInputs(form)) return;

    const email = form.get('email') as string;
    const password = form.get('password') as string;

    loginMutation.mutate({ email, password });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
    >
      <AuthTextField
        id='email'
        label='Email'
        name='email'
        type='email'
        placeholder='your@email.com'
        error={emailError}
        helperText={emailErrorMessage}
      />

      <AuthTextField
        id='password'
        label='Password'
        name='password'
        type='password'
        placeholder='••••••'
        error={passwordError}
        helperText={passwordErrorMessage}
      />

      <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }}>
        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  );
}
