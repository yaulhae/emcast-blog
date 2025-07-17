// /api/posts.ts
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number;
  userId: number;
}

export interface GetPostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchPosts = async (
  page: number,
  limit = 6
): Promise<GetPostsResponse> => {
  const skip = (page - 1) * limit;
  const response = await axios.get(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const fetchAllPosts = async () => {
  const res = await axios.get('https://dummyjson.com/posts?limit=150');
  return res.data.posts;
};

export const fetchPostsBySearch = async (
  query: string,
  page: number,
  limit = 6
) => {
  const skip = (page - 1) * limit;
  const response = await axios.get(
    `https://dummyjson.com/posts/search?q=${query}&limit=${limit}&skip=${skip}`
  );
  return response.data; // { posts, total, skip, limit }
};
