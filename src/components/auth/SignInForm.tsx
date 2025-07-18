// components/auth/SignInForm.tsx
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { useLogin } from '../../hooks/useAuthMutation';
import AuthTextField from './AuthTextField';

export default function SignInForm() {
  const loginMutation = useLogin();

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
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
    if (!validateInputs()) return;

    const form = new FormData(event.currentTarget);
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
        autoComplete='email'
        error={emailError}
        helperText={emailErrorMessage}
      />

      <AuthTextField
        id='password'
        label='Password'
        name='password'
        type='password'
        placeholder='••••••'
        autoComplete='current-password'
        error={passwordError}
        helperText={passwordErrorMessage}
      />

      <FormControlLabel
        control={<Checkbox value='remember' color='primary' />}
        label='Remember me'
      />

      <Button type='submit' fullWidth variant='contained'>
        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  );
}
