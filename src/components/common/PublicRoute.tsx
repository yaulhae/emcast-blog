import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function PublicRoute() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to='/posts' replace />;
  }

  return <Outlet />;
}
