// src/components/common/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    // 아직 상태 초기화 중이면 아무 것도 렌더링하지 않음
    return null;
  }

  if (!user) {
    alert('로그인이 필요합니다.');
    return <Navigate to='/sign-in' replace />;
  }

  return <>{children}</>;
}
