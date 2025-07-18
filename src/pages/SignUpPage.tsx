import { Divider } from '@mui/material';
import AlreadyHaveAccountLink from '../components/auth/AlreadyHaveAccountLink';
import AuthCard from '../components/auth/AuthCard';
import AuthContainer from '../components/auth/AuthContainer';
import AuthHeader from '../components/auth/AuthHeader';
import SignUpForm from '../components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <>
      <AuthContainer>
        <AuthCard>
          <AuthHeader>Sign up</AuthHeader>
          <SignUpForm />
          <Divider sx={{ mt: 1 }}>or</Divider>
          <AlreadyHaveAccountLink mode='signup' />
        </AuthCard>
      </AuthContainer>
    </>
  );
}
