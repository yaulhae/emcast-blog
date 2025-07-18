import { Container, CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';
import AppTheme from './shared-theme/AppTheme';

function App(props: { disableCustomTheme?: boolean }) {
  const initializeUser = useAuth((state) => state.initializeUser);

  useEffect(() => {
    initializeUser(); // ✅ 앱 시작 시 세션에서 유저 복원
  }, [initializeUser]);
  return (
    <>
      <CssBaseline enableColorScheme />
      <AppTheme {...props}>
        <Header />
        <Container maxWidth='lg'>
          <AppRoutes />
        </Container>
      </AppTheme>
    </>
  );
}

export default App;
