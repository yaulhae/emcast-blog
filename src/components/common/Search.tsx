import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput
} from '@mui/material';

export function Search({
  query,
  onChange,
  onKeyDown,
  onSearchClick
}: {
  query: string;
  onChange: (value: string) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onSearchClick?: () => void;
}) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <FormControl
        sx={{ width: { xs: '100%', md: '25ch' } }}
        variant='outlined'
      >
        <OutlinedInput
          size='small'
          id='search'
          placeholder='Search…'
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          startAdornment={
            <InputAdornment position='start' sx={{ color: 'text.primary' }}>
              <SearchRoundedIcon fontSize='small' />
            </InputAdornment>
          }
          inputProps={{
            'aria-label': 'search'
          }}
        />
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={onSearchClick}
        sx={{ whiteSpace: 'nowrap' }}
      >
        검색
      </Button>
    </Box>
  );
}
