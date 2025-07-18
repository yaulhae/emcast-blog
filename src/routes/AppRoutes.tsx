// src/routes/AppRoutes.tsx
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import PostDetailPage from '../pages/PostDetailPage';
import PostListPage from '../pages/PostListPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/posts'
        element={
          <ProtectedRoute>
            <PostListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/posts/:id'
        element={
          <ProtectedRoute>
            <PostDetailPage />
          </ProtectedRoute>
        }
      />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
    </Routes>
  );
}
