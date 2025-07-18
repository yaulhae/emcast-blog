import { Button, Container, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PostHeader } from '../components/post/PostHeader';
import PostMain from '../components/post/PostMain';
import { useAuth } from '../hooks/useAuth';
import { useSearchPostsQuery } from '../hooks/usePostsQuery';
import { canCreatePost } from '../utils/permission';

export default function PostListPage() {
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError } = useSearchPostsQuery(query, page);
  const [searchInput, setSearchInput] = React.useState(query);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const postsPerPage = 6;
  const pagedPosts = data?.posts || [];
  const pageCount = Math.ceil((data?.total || 0) / postsPerPage);

  const handleSearch = () => {
    setSearchParams({ query, page: '1' }); // 기본 검색
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`?query=${searchInput}&page=1`);
    }
  };

  const handleSearchClick = () => {
    navigate(`?query=${searchInput}&page=1`);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`?query=${query}&page=${value}`);
  };

  const handleFocus = (index: number) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);

  React.useEffect(() => {
    const savedY = sessionStorage.getItem('scrollY');
    if (savedY) {
      window.scrollTo({ top: parseInt(savedY), behavior: 'smooth' });
      sessionStorage.removeItem('scrollY'); // 한 번 쓰고 제거
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return (
    <Container
      maxWidth='lg'
      component='main'
      sx={{ display: 'flex', flexDirection: 'column', mt: 16, mb: 10, gap: 4 }}
    >
      {canCreatePost(user) && (
        <Button variant='contained' onClick={() => navigate('/posts/create')}>
          게시글 작성
        </Button>
      )}
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
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </Container>
  );
}
