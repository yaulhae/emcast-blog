// hooks/useCommentsQuery.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createComment,
  deleteComment,
  getCommentsByPostId
} from '../api/comment';
import { Comment } from '../types/comment';

export const useCommentsQuery = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId)
  });
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment: Comment) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', newComment.postId]
      });
    }
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });
};
