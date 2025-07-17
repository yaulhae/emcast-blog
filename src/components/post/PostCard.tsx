// components/blog/PostCard.tsx

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Post } from '../../api/posts';
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
  return (
    <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
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
