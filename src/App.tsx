import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import Header from './components/layout/Header/Header';
import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';
import AppTheme from './shared-theme/AppTheme';

function App(props: { disableCustomTheme?: boolean }) {
  const initializeUser = useAuth((state) => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, []);
  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <Header />
        <AppRoutes />
      </AppTheme>
    </>
  );
}

export default App;
