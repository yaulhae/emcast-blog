// components/blog/PostCard.tsx

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { deletePost } from '../../api/posts';
import { useAuthStore } from '../../stores/authStore';
import { Post } from '../../types/post';
import { isAdmin } from '../../utils/permission';
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
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!isAdmin(user)) {
      alert('삭제 권한이 없습니다.');
      return;
    }

    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deletePost(post.id);
      alert('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['searchPosts'] });
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
          position: 'relative', // 삭제 버튼을 위치시키기 위해 필요
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          height: '100%',
          backgroundColor: (theme) =>
            (theme.vars || theme).palette.background.paper,
          '&:hover .delete-btn': {
            opacity: 1
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
            gap: 1,
            px: 2,
            pb: 2,
            flexGrow: 1,
            '&:last-child': {
              paddingBottom: 2
            }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            {post.tags?.map((tag, idx) => (
              <Typography
                key={idx}
                variant='caption'
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  px: 1,
                  py: 0.5,
                  mr: 0.5,
                  borderRadius: 1,
                  fontSize: '0.7rem'
                }}
              >
                #{tag}
              </Typography>
            ))}
            {isAdmin(user) && (
              <Button
                onClick={(e) => {
                  e.stopPropagation(); // 상위 Link에게 전달 안 되도록
                  e.preventDefault(); // 기본 동작(링크 이동)도 막기
                  handleDelete();
                }}
                color='error'
                variant='contained'
                size='small'
                title='삭제'
                className='delete-btn'
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 1,
                  opacity: { xs: 1, sm: 0 }, // 모바일에서는 항상 보이고, PC에서는 hover 시만
                  transition: 'opacity 0.2s ease'
                }}
              >
                삭제
              </Button>
            )}
          </Box>

          <Typography variant='h6'>{post.title}</Typography>

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
          createdAt={post.createdAt}
        />
      </Card>
    </Link>
  );
}
