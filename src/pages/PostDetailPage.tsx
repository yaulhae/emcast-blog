import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../api/posts';
import CommentForm from '../components/post/CommentForm';
import CommentList from '../components/post/CommentList';
import { Post } from '../types/post';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    isError
  } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => getPostById(id!),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <Box textAlign='center' mt={50}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !post) {
    return (
      <Box textAlign='center' mt={50}>
        <Typography variant='h6'>Post not found.</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          ← Back
        </Button>
      </Box>
    );
  }

  return (
    <Container
      maxWidth='md'
      sx={{ mt: 18, pb: 10, display: 'flex', flexDirection: 'column' }}
    >
      {/* Back 버튼 따로 위에 배치 */}
      <Box sx={{ mb: 1 }}>
        <Button
          onClick={() => navigate(-1)}
          size='small'
          variant='text'
          sx={{
            px: 0,
            textTransform: 'none',
            color: 'text.secondary',
            fontSize: '0.9rem'
          }}
        >
          ← Back
        </Button>
      </Box>
      <Box>
        {/* 제목은 단독으로 강조되게 배치 */}
        <Typography variant='h3' gutterBottom>
          {post.title}
        </Typography>
        <Box
          component='img'
          src={`https://picsum.photos/800/450?random=${post.id}`}
          alt={post.title}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 2,
            mt: 2,
            objectFit: 'cover',
            maxHeight: 400
          }}
        />

        <Typography variant='subtitle1' color='text.secondary' gutterBottom>
          By User {post.userId} •{' '}
          {new Date(post.createdAt ?? '2021-07-14').toDateString()}
        </Typography>

        <Box display='flex' gap={1} flexWrap='wrap' my={2}>
          {post.tags.map((tag: string) => (
            <Chip key={tag} label={tag} color='primary' variant='outlined' />
          ))}
        </Box>

        <Typography variant='body1' sx={{ mt: 4 }}>
          {post.body}
        </Typography>
        <Typography
          variant='caption'
          display='block'
          color='text.secondary'
          my={4}
        >
          👍 {post.reactions.likes} likes • 👎 {post.reactions.dislikes}{' '}
          dislikes
        </Typography>
        <CommentList postId={post.id} />
        <CommentForm postId={post.id} />
      </Box>
    </Container>
  );
}
