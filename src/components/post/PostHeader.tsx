import { Box, Typography } from '@mui/material';
import React from 'react';
import { Search } from '../common/Search';

interface PostHeaderProps {
  searchInput: string;
  onChange: (value: string) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onSearchClick: () => void;
}

export function PostHeader({
  searchInput,
  onChange,
  onKeyDown,
  onSearchClick
}: PostHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}
    >
      <Typography variant='h4'>Post</Typography>
      <Search
        query={searchInput}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onSearchClick={onSearchClick}
      />
    </Box>
  );
}
