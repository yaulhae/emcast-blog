import { Box, Button } from '@mui/material';
import { useState } from 'react';
import AuthTextField from './AuthTextField';

export default function SignUpForm() {
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

    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password')
    });
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

      <Button type='submit' fullWidth variant='contained'>
        Sign up
      </Button>
    </Box>
  );
}
