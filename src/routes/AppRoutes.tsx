// src/routes/AppRoutes.tsx
import { CircularProgress } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import PublicRoute from '../components/common/PublicRoute';
import PostCreatePage from '../pages/PostCreatePage';
import PostDetailPage from '../pages/PostDetailPage';
import PostListPage from '../pages/PostListPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import { useAuthStore } from '../stores/authStore';

export default function AppRoutes() {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 10 }} />;
  }

  return (
    <Routes>
      {/* 루트 경로 접근 시, 로그인 여부에 따라 리디렉션 */}
      <Route
        path='/'
        element={<Navigate to={user ? '/posts' : '/sign-in'} replace />}
      />

      {/* 인증되지 않은 유저만 접근 가능 */}
      <Route element={<PublicRoute />}>
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Route>

      {/* 인증된 유저만 접근 가능 */}
      <Route element={<ProtectedRoute />}>
        <Route path='/posts' element={<PostListPage />} />
        <Route path='/posts/:id' element={<PostDetailPage />} />
        <Route path='/posts/create' element={<PostCreatePage />} />
      </Route>
    </Routes>
  );
}
