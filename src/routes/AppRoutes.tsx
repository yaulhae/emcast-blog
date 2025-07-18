// src/routes/AppRoutes.tsx
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import PostCreatePage from '../pages/PostCreatePage';
import PostDetailPage from '../pages/PostDetailPage';
import PostListPage from '../pages/PostListPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      {/* 기본 경로 우회 */}
      <Route
        path='/'
        element={<Navigate to={user ? '/posts' : '/sign-in'} replace />}
      />

      {/*인증 페이지  */}
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />

      {/*포스팅 페이지 */}
      <Route element={<ProtectedRoute />}>
        <Route path='/posts' element={<PostListPage />} />
        <Route path='/posts/:id' element={<PostDetailPage />} />
        <Route path='/posts/create' element={<PostCreatePage />} />
      </Route>
      {/*  */}
    </Routes>
  );
}
