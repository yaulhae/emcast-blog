import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';

interface AuthorProps {
  authors: { name: string; avatar: string }[];
  createdAt?: string;
}

export function PostAuthor({ authors, createdAt }: AuthorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center'
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant='caption'>
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant='caption'>
        {' '}
        {createdAt
          ? new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : ''}
      </Typography>
    </Box>
  );
}
