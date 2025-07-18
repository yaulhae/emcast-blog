import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute() {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return null; // 혹은 로딩 UI
  }

  if (!user) {
    alert('로그인이 필요합니다.');
    return <Navigate to='/sign-in' replace />;
  }

  return <Outlet />;
}
