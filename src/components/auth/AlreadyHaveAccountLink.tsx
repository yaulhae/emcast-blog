// components/auth/AlreadyHaveAccountLink.tsx
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AlreadyHaveAccountLinkProps } from '../../types/auth';

export default function AlreadyHaveAccountLink({
  mode
}: AlreadyHaveAccountLinkProps) {
  return (
    <Typography sx={{ textAlign: 'center' }}>
      {mode === 'signup' ? (
        <>
          Already have an account?{' '}
          <Link component={RouterLink} to='/sign-in' variant='body2'>
            Sign in
          </Link>
        </>
      ) : (
        <>
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} to='/sign-up' variant='body2'>
            Sign up
          </Link>
        </>
      )}
    </Typography>
  );
}
