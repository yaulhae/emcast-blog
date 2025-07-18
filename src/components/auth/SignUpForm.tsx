// components/auth/SignUpForm.tsx
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useRegister } from '../../hooks/useAuthMutation';
import AccountTypeSelector from './AccountTypeSelector';
import AuthTextField from './AuthTextField';

export default function SignUpForm() {
  const registerMutation = useRegister();

  const [accountType, setAccountType] = useState('user');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

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

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    registerMutation.mutate({ name, email, password, accountType });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <AuthTextField
        id='name'
        label='Full name'
        name='name'
        placeholder='Jon Snow'
        autoComplete='name'
        error={nameError}
        helperText={nameErrorMessage}
      />

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
        autoComplete='new-password'
        error={passwordError}
        helperText={passwordErrorMessage}
      />

      <AccountTypeSelector value={accountType} onChange={setAccountType} />

      <Button type='submit' fullWidth variant='contained'>
        {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
      </Button>
    </Box>
  );
}
