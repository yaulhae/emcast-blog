// /api/posts.ts
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
  createdAt?: string;
}

export interface GetPostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

// JSON-SERVER API BASE
const API_BASE_URL = 'http://localhost:3001';

// 전체 게시글 조회 (페이지네이션)
export const fetchPosts = async (
  page: number,
  limit = 6
): Promise<GetPostsResponse> => {
  const skip = (page - 1) * limit;
  const res = await axios.get<Post[]>(
    `${API_BASE_URL}/posts?_start=${skip}&_limit=${limit}`
  );
  const totalRes = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
  return {
    posts: res.data,
    total: totalRes.data.length,
    skip,
    limit
  };
};

// 전체 게시글 전체 불러오기
export const fetchAllPosts = async (): Promise<Post[]> => {
  const res = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
  return res.data;
};

// 검색 기반 게시글 조회
export const fetchPostsBySearch = async (
  query: string,
  page: number,
  limit = 6
): Promise<GetPostsResponse> => {
  const skip = (page - 1) * limit;
  const res = await axios.get<Post[]>(
    `${API_BASE_URL}/posts?q=${query}&_start=${skip}&_limit=${limit}`
  );
  const totalRes = await axios.get<Post[]>(`${API_BASE_URL}/posts?q=${query}`);
  return {
    posts: res.data,
    total: totalRes.data.length,
    skip,
    limit
  };
};

// 게시글 ID로 조회
export const getPostById = async (id: number): Promise<Post> => {
  const res = await axios.get<Post>(`${API_BASE_URL}/posts/${id}`);
  return res.data;
};

// 게시글 삭제
export const deletePost = async (id: number) => {
  const res = await axios.delete(`${API_BASE_URL}/posts/${id}`);
  if (res.status !== 200) {
    throw new Error('게시글 삭제 실패');
  }
};

// 게시글 생성
export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const res = await axios.post<Post>(`${API_BASE_URL}/posts`, post);
  return res.data;
};
