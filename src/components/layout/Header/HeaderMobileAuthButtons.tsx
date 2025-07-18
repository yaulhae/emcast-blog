import {
  CloseRounded as CloseRoundedIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem
} from '@mui/material';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function HeaderMobileAuthButtons() {
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.clearUser);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onClickToggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const onClickLogoutButton = () => {
    clearUser();
    sessionStorage.removeItem('authUser');
    setOpen(false);
    alert('로그아웃되었습니다.');
    navigate('/sign-in');
  };

  return (
    <>
      <IconButton aria-label='Menu button' onClick={onClickToggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='top'
        open={open}
        onClose={onClickToggleDrawer(false)}
        PaperProps={{
          sx: {
            top: 'var(--template-frame-height, 0px)'
          }
        }}
      >
        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={onClickToggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          {/* ✅ Posts로 이동하도록 수정 */}
          <MenuItem
            component={Link}
            to='/posts'
            onClick={onClickToggleDrawer(false)}
          >
            Post
          </MenuItem>

          <Divider sx={{ my: 3 }} />

          {user ? (
            <MenuItem>
              <Button
                fullWidth
                onClick={onClickLogoutButton}
                color='error'
                variant='outlined'
              >
                Logout
              </Button>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Button
                  component={Link}
                  to='/sign-up'
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Sign up
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  component={Link}
                  to='/sign-in'
                  color='primary'
                  variant='outlined'
                  fullWidth
                >
                  Sign in
                </Button>
              </MenuItem>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
