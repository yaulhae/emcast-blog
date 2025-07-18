// components/blog/PostCard.tsx

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { deletePost, Post } from '../../api/posts';
import { useAuth } from '../../hooks/useAuth';
import { canDeletePost } from '../../utils/permission';
import { Author } from './Author';

interface Props {
  post: Post;
  index: number;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export default function PostCard({
  post,
  index,
  isFocused,
  onFocus,
  onBlur
}: Props) {
  const user = useAuth((state) => state.user);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!canDeletePost(user)) {
      alert('삭제 권한이 없습니다.');
      return;
    }

    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deletePost(post.id);
      alert('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      alert('삭제 실패');
    }
  };

  return (
    <Link
      to={`/posts/${post.id}`}
      onClick={() => {
        sessionStorage.setItem('scrollY', window.scrollY.toString());
      }}
      style={{ textDecoration: 'none' }}
    >
      <Card
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        className={isFocused ? 'Mui-focused' : ''}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          height: '100%',
          backgroundColor: (theme) =>
            (theme.vars || theme).palette.background.paper,
          '&:hover': {
            backgroundColor: 'transparent',
            cursor: 'pointer'
          },
          '&:focus-visible': {
            outline: '3px solid',
            outlineColor: 'hsla(210, 98%, 48%, 0.5)',
            outlineOffset: '2px'
          }
        }}
      >
        <CardMedia
          component='img'
          image={`https://picsum.photos/800/450?random=${post.id}`}
          sx={{
            height: index < 2 ? undefined : { sm: 'auto', md: '50%' },
            aspectRatio: index < 2 ? '16/9' : { sm: '16/9', md: '' },
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: 2,
            flexGrow: 1,
            '&:last-child': {
              paddingBottom: 2
            }
          }}
        >
          <Typography variant='caption'>
            {post.tags?.[0] || 'General'}
          </Typography>
          <Typography variant='h6'>{post.title}</Typography>
          {canDeletePost(user) && (
            <Button onClick={handleDelete} color='error' size='small'>
              삭제
            </Button>
          )}
          <Typography
            variant='body2'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {post.body}
          </Typography>
        </CardContent>
        <Author
          authors={[
            {
              name: `User ${post.userId}`,
              avatar: `/static/images/avatar/${(post.userId % 8) + 1}.jpg`
            }
          ]}
        />
      </Card>
    </Link>
  );
}
