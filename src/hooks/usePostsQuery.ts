import { useQuery } from '@tanstack/react-query';
import { fetchPostsBySearch } from '../api/posts';

export const useSearchPostsQuery = (query: string, page: number, limit = 6) => {
  return useQuery({
    queryKey: ['searchPosts', { query, page }],
    queryFn: () => fetchPostsBySearch(query, page, limit)
  });
};
