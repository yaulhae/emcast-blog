import { Container, CssBaseline } from '@mui/material';
import Header from './components/layout/Header';
import AppRoutes from './routes/AppRoutes';
import AppTheme from './shared-theme/AppTheme';

function App(props: { disableCustomTheme?: boolean }) {
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
