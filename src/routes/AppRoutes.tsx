// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import PostListPage from '../pages/PostListPage';
import PostDetailPage from '../pages/PostDetailPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
    </Routes>
  )
}
