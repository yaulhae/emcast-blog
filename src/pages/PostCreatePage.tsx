// src/pages/PostCreatePage.tsx
import {
  Box,
  Button,
  Chip,
  Container,
  FormLabel,
  Grid,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import { useAuth } from '../hooks/useAuth';
import { canCreatePost } from '../utils/permission';

export default function PostCreatePage() {
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  if (!canCreatePost(user)) {
    alert('게시글 작성 권한이 없습니다.');
    navigate('/posts');
    return null;
  }

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags((prev) => [...prev, tagInput]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    if (!title || !body) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await createPost({
        title,
        body,
        tags,
        reactions: { likes: 0, dislikes: 0 },
        userId: user!.id,
        createdAt: new Date().toISOString()
      });
      alert('게시글이 작성되었습니다.');
      navigate('/posts');
    } catch (err) {
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <Container maxWidth='md' sx={{ mt: 18, pb: 10 }}>
      <Box sx={{ mb: 2 }}>
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
          ← 뒤로가기
        </Button>
      </Box>
      <Typography variant='h4' gutterBottom>
        게시글 작성
      </Typography>
      <Grid
        container
        spacing={3}
        direction='column'
        component='form'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Grid>
          <FormLabel htmlFor='title' required>
            제목
          </FormLabel>
          <OutlinedInput
            id='title'
            name='title'
            placeholder='제목을 입력하세요'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid>
          <FormLabel htmlFor='body' required>
            내용
          </FormLabel>
          <OutlinedInput
            id='body'
            name='body'
            placeholder='내용을 입력하세요'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            minRows={6}
            fullWidth
          />
        </Grid>

        <Grid>
          <FormLabel htmlFor='tag'>태그 추가</FormLabel>
          <Box display='flex' gap={1}>
            <OutlinedInput
              id='tag'
              placeholder='예: design'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              size='small'
              fullWidth
            />
            <Button onClick={handleAddTag} variant='outlined'>
              추가
            </Button>
          </Box>
          <Stack direction='row' gap={1} flexWrap='wrap' mt={1}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => setTags(tags.filter((t) => t !== tag))}
              />
            ))}
          </Stack>
        </Grid>

        <Grid>
          <Button type='submit' variant='contained' fullWidth>
            작성하기
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
