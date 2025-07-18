import { AppBar, Box } from '@mui/material';
import ColorModeIconDropdown from '../../../shared-theme/ColorModeIconDropdown';
import HeaderAuthButtons from './HeaderAuthButtons';
import HeaderLogo from './HeaderLogo';
import HeaderMobileAuthButtons from './HeaderMobileAuthButtons';
import HeaderNavs from './HeaderNavs';
import HeaderToolbar from './HeaderToolbar';

export default function Header() {
  return (
    <AppBar
      position='fixed'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)'
      }}
    >
      <HeaderToolbar>
        {/* 헤더 좌측 로고 및 네비게이션 */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <HeaderLogo />
          <HeaderNavs />
        </Box>

        {/* 데스크탑용 헤더 우측 버튼 모음 */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex', alignItems: 'center' },
            gap: 1
          }}
        >
          <HeaderAuthButtons />
          <ColorModeIconDropdown />
        </Box>
        {/* 모바일용용 헤더 우측 버튼 모음 */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
          <ColorModeIconDropdown size='medium' />
          <HeaderMobileAuthButtons />
        </Box>
        {/*  */}
      </HeaderToolbar>
    </AppBar>
  );
}
