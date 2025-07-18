// components/auth/AuthContainer.tsx
import { Stack } from '@mui/material';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface AuthContainerProps {
  children: ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  const theme = useTheme();
  const { mode } = useColorScheme();

  console.log('mode::', mode);
  return (
    <Stack
      sx={{
        height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
        minHeight: '100%',
        padding: theme.spacing(2),
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(4)
        },
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          zIndex: -1,
          inset: 0,
          backgroundImage:
            mode === 'dark'
              ? 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
              : 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
          backgroundRepeat: 'no-repeat'
        }
      }}
    >
      {children}
    </Stack>
  );
}
