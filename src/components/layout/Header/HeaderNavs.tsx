import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HeaderNavs() {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        component={Link}
        to='/posts'
        variant='text'
        color='info'
        size='small'
      >
        Posts
      </Button>
    </Box>
  );
}
