import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import Header from './components/layout/Header/Header';
import AppRoutes from './routes/AppRoutes';
import AppTheme from './shared-theme/AppTheme';
import { useAuthStore } from './stores/authStore';

function App() {
  const initializeUser = useAuthStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, []);
  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Header />
        <AppRoutes />
      </AppTheme>
    </>
  );
}

export default App;
