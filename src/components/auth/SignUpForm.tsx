import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/useAuthMutation';
import { SignUpFormValues, signUpSchema } from '../../schemas/auth.schema';
import AccountTypeSelector from './AccountTypeSelector';
import AuthTextField from './AuthTextField';

export default function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      accountType: 'user'
    }
  });

  const registerMutation = useRegister();
  const onSubmit = (data: SignUpFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <AuthTextField
        name='name'
        label='Full name'
        placeholder='Jon Snow'
        control={control}
      />
      <AuthTextField
        name='email'
        label='Email'
        type='email'
        placeholder='your@email.com'
        control={control}
      />
      <AuthTextField
        name='password'
        label='Password'
        type='password'
        placeholder='••••••'
        control={control}
      />

      <Controller
        name='accountType'
        control={control}
        render={({ field }) => (
          <AccountTypeSelector value={field.value} onChange={field.onChange} />
        )}
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        disabled={isSubmitting}
      >
        {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
      </Button>
    </Box>
  );
}
