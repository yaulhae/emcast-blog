import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import AuthTextField from './AuthTextField';

export default function SignInForm() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
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

      <Button
        type='submit'
        fullWidth
        variant='contained'
        onClick={validateInputs}
      >
        Sign in
      </Button>
    </Box>
  );
}
