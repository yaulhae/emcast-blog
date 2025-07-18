// App.tsx
import { Box } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

export default function AppWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const { mode } = useColorScheme();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        backgroundImage:
          mode === 'dark'
            ? 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
            : 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {children}
    </Box>
  );
}
