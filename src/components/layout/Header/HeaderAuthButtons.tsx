import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function HeaderAuthButtons() {
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.clearUser);
  const navigate = useNavigate();

  const onClickLogoutButton = () => {
    clearUser();
    sessionStorage.removeItem('authUser');
    alert('로그아웃되었습니다.');
    navigate('/sign-in');
  };

  if (user) {
    return (
      <>
        <Typography
          variant='body2'
          sx={{ color: 'text.primary', fontWeight: 500 }}
        >
          Hello, {user.name}
        </Typography>
        <Button
          color='error'
          variant='outlined'
          size='small'
          onClick={onClickLogoutButton}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        component={Link}
        to='/sign-in'
        color='primary'
        variant='text'
        size='small'
      >
        Sign in
      </Button>
      <Button
        component={Link}
        to='/sign-up'
        color='primary'
        variant='contained'
        size='small'
      >
        Sign up
      </Button>
    </>
  );
}
