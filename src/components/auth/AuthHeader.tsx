// components/auth/AuthHeader.tsx
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { SitemarkIcon } from './SitemarkIcon';

interface AuthHeaderProps {
  children: ReactNode;
}

export default function AuthHeader({ children }: AuthHeaderProps) {
  return (
    <Stack spacing={1} alignItems='center'>
      <SitemarkIcon />
      <Typography
        component='h1'
        variant='h4'
        sx={{
          width: '100%',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          textAlign: 'center'
        }}
      >
        {children}
      </Typography>
    </Stack>
  );
}
