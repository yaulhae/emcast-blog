// components/post/CommentForm.tsx
import {
  Box,
  Button,
  FormLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCreateCommentMutation } from '../../hooks/useCommentQuery';

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const { mutate, isPending } = useCreateCommentMutation();
  const user = useAuth((state) => state.user);
  console.log('user', user);

  const handleSubmit = () => {
    if (!content.trim()) return;
    if (!user || user.accountType === 'guest') {
      alert('관리자 계정만 댓글을 작성할 수 있습니다.');
      return;
    }
    mutate({
      postId,
      author: user.name || 'Unknown',
      content
    });
    setContent('');
  };

  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      mt={6}
    >
      <Typography variant='h6' gutterBottom>
        댓글 작성
      </Typography>
      {!user || user.accountType === 'guest' ? (
        <Typography color='text.secondary'>
          관리자 계정만 댓글을 작성할 수 있습니다
        </Typography>
      ) : (
        <>
          <FormLabel htmlFor='comment' required>
            댓글 내용
          </FormLabel>
          <OutlinedInput
            id='comment'
            placeholder='댓글을 입력하세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            sx={{ mb: 2 }}
          />
          <Button type='submit' variant='contained' disabled={isPending}>
            작성하기
          </Button>
        </>
      )}
    </Box>
  );
}
