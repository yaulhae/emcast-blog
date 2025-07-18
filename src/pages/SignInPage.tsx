// SignInPage.tsx
import { Divider } from '@mui/material';
import AlreadyHaveAccountLink from '../components/auth/AlreadyHaveAccountLink';
import AuthCard from '../components/auth/AuthCard';
import AuthContainer from '../components/auth/AuthContainer';
import AuthHeader from '../components/auth/AuthHeader';
import SignInForm from '../components/auth/SignInForm';

export default function SignInPage() {
  return (
    <>
      <AuthContainer>
        <AuthCard>
          <AuthHeader>Sign in</AuthHeader>
          <SignInForm />
          <Divider sx={{ mt: 1 }}>or</Divider>
          <AlreadyHaveAccountLink mode='signin' />
        </AuthCard>
      </AuthContainer>
    </>
  );
}
