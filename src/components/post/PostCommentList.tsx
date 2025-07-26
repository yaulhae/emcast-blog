import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import {
  useCommentsQuery,
  useDeleteCommentMutation
} from '../../hooks/useCommentQuery';
import { useAuthStore } from '../../stores/authStore';

interface PostCommentListProps {
  postId: number;
}

export default function PostCommentList({ postId }: PostCommentListProps) {
  const { data: comments = [], isLoading } = useCommentsQuery(postId);
  const user = useAuthStore((state) => state.user);
  const { mutate: deleteComment } = useDeleteCommentMutation();

  if (isLoading) return <Typography>Loading comments...</Typography>;
  if (!Array.isArray(comments))
    return <Typography>No comments yet.</Typography>;

  return (
    <Box mt={6}>
      <Typography variant='h6' gutterBottom>
        Comments
      </Typography>
      {comments.map((comment) => (
        <Box key={comment.id} mb={3}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='subtitle2'>{comment.author}</Typography>
            {user?.accountType === 'admin' && (
              <IconButton
                size='small'
                onClick={() => deleteComment(comment.id)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            )}
          </Box>
          <Typography variant='body2' color='text.secondary'>
            {new Date(comment.createdAt).toLocaleString()}
          </Typography>
          <Typography variant='body1' mt={1}>
            {comment.content}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
}
