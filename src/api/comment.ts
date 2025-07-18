// api/comments.ts
import axios from 'axios';
import { Comment } from '../types/comment';

export const getCommentsByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const res = await axios.get(
    `https://blog-db-json.onrender.com/comments?postId=${postId}&_sort=createdAt&_order=desc`
  );
  return res.data;
};

export const createComment = async (
  comment: Omit<Comment, 'id' | 'createdAt'>
): Promise<Comment> => {
  const res = await axios.post(`https://blog-db-json.onrender.com/comments`, {
    ...comment,
    createdAt: new Date().toISOString()
  });
  return res.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  await axios.delete(`https://blog-db-json.onrender.com/comments/${id}`);
};
