import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Logo } from '../../common/Logo';

export default function HeaderLogo() {
  return (
    <Box
      component={Link}
      to='/'
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer'
      }}
    >
      <Logo />
    </Box>
  );
}
