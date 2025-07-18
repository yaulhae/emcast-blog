// /api/posts.ts
import axios from 'axios';
import { GetPostsResponse, Post } from '../types/post';

// JSON-SERVER API BASE
const API_BASE_URL = 'http://localhost:3001';

// 검색 기반 게시글 조회
export const fetchPostsBySearch = async (
  query: string,
  page: number,
  limit = 6
): Promise<GetPostsResponse> => {
  console.log('쿼리쿼리:', query);
  const skip = (page - 1) * limit;

  // title_like 검색
  const resTitle = await axios.get<Post[]>(
    `${API_BASE_URL}/posts?title_like=${query}`
  );

  // body_like 검색
  const resBody = await axios.get<Post[]>(
    `${API_BASE_URL}/posts?body_like=${query}`
  );

  // 중복 제거 (id 기준)
  const mergedMap = new Map<string, Post>();
  [...resTitle.data, ...resBody.data].forEach((post) => {
    mergedMap.set(String(post.id), post);
  });

  const mergedPosts = Array.from(mergedMap.values());

  // 최신순 정렬 (createdAt 기준)
  mergedPosts.sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });

  // 페이징 처리
  const paginatedPosts = mergedPosts.slice(skip, skip + limit);

  return {
    posts: paginatedPosts,
    total: mergedPosts.length,
    skip,
    limit
  };
};

// 게시글 ID로 조회
export const getPostById = async (id: string | number): Promise<Post> => {
  const res = await axios.get<Post>(`${API_BASE_URL}/posts/${id}`);
  return res.data;
};

// 게시글 삭제
export const deletePost = async (id: string | number) => {
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
