import Typography from '@mui/material/Typography';
import { Post } from '../../types/post';
import PostList from './PostList';

interface PostMainProps {
  posts: Post[];
  query: string;
  focusedCardIndex: number | null;
  onFocus: (index: number) => void;
  onBlur: () => void;
}

export default function PostMain({
  posts,
  query,
  focusedCardIndex,
  onFocus,
  onBlur
}: PostMainProps) {
  if (posts.length === 0 && query !== '') {
    return (
      <Typography variant='body1' sx={{ mt: 4 }}>
        No results found.
      </Typography>
    );
  }

  return (
    <PostList
      posts={posts}
      focusedCardIndex={focusedCardIndex}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
