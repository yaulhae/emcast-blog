import { Box } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkLogo from '../../assets/DarkLogo.png';
import LightLogo from '../../assets/LightLogo.png';

export function Logo() {
  const { mode } = useColorScheme();
  const logoSrc = mode === 'dark' ? DarkLogo : LightLogo;

  return (
    <Box
      component='img'
      src={logoSrc}
      alt='Emcase Logo'
      sx={{
        height: 21,
        width: 100,
        objectFit: 'contain'
      }}
    />
  );
}
