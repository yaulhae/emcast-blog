// components/auth/AuthHeader.tsx
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Logo } from '../common/Logo';

interface AuthHeaderProps {
  children: ReactNode;
}

export default function AuthHeader({ children }: AuthHeaderProps) {
  return (
    <Stack spacing={1} alignItems='center'>
      <Logo />
      <Typography
        component='h1'
        variant='h4'
        sx={{
          fontSize: 'clamp(2rem, 10vw, 2.15rem)'
        }}
      >
        {children}
      </Typography>
    </Stack>
  );
}
