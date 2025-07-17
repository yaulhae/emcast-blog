import { Container, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { PostHeader } from '../components/post/PostHeader';
import PostMain from '../components/post/PostMain';
import { useSearchPostsQuery } from '../hooks/usePostsQuery';

export default function PostListPage() {
  const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState('');
  const [query, setQuery] = React.useState('');
  const { data, isLoading, isError } = useSearchPostsQuery(query, page);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const postsPerPage = 6;
  const pagedPosts = data?.posts || [];
  const pageCount = Math.ceil((data?.total || 0) / postsPerPage);
  const handleSearch = () => {
    setQuery(searchInput);
    setPage(1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQuery(searchInput);
      setPage(1);
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleFocus = (index: number) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return (
    <Container
      maxWidth='lg'
      component='main'
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <PostHeader
        searchInput={searchInput}
        onChange={setSearchInput}
        onKeyDown={handleSearchKeyDown}
        onSearchClick={handleSearchClick}
      />
      <PostMain
        posts={pagedPosts}
        query={query}
        focusedCardIndex={focusedCardIndex}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
}
