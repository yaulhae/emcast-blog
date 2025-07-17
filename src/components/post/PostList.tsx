import Grid from '@mui/material/Grid';
import { Post } from '../../api/posts';
import PostCard from './PostCard';

interface Props {
  posts: Post[];
  focusedCardIndex: number | null;
  onFocus: (index: number) => void;
  onBlur: () => void;
}

export default function PostList({
  posts,
  focusedCardIndex,
  onFocus,
  onBlur
}: Props) {
  return (
    <Grid container spacing={2} columns={12}>
      {posts.map((post, idx) => (
        <Grid
          key={post.id}
          size={{
            xs: 12,
            md: idx < 2 ? 6 : 4
          }}
        >
          <PostCard
            post={post}
            index={idx}
            isFocused={focusedCardIndex === idx}
            onFocus={() => onFocus(idx)}
            onBlur={onBlur}
          />
        </Grid>
      ))}
    </Grid>
  );
}
