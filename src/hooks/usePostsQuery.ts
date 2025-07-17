import { useQuery } from '@tanstack/react-query';
import { fetchAllPosts, fetchPosts, fetchPostsBySearch } from '../api/posts';

export const usePostsQuery = (page: number, limit = 6) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page, limit),
    staleTime: 1000 * 60 // 1분 동안 fresh
  });
};

export const useAllPostsQuery = () => {
  return useQuery({
    queryKey: ['allPosts'],
    queryFn: fetchAllPosts,
    staleTime: 1000 * 60 * 5 // 5분 캐시 유지
  });
};

export const useSearchPostsQuery = (query: string, page: number, limit = 6) => {
  return useQuery({
    queryKey: ['searchPosts', query, page],
    queryFn: () => fetchPostsBySearch(query, page, limit)
    // staleTime: 1000 * 60
  });
};
