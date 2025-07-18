// src/components/auth/AccountTypeSelector.tsx
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';

interface AccountTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountTypeSelector({
  value,
  onChange
}: AccountTypeSelectorProps) {
  return (
    <Stack spacing={1}>
      <Typography variant='subtitle2' component='label'>
        Select account type
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, newValue) => {
          if (newValue) onChange(newValue);
        }}
        fullWidth
        color='primary'
        size='small'
      >
        <ToggleButton value='admin'>Admin</ToggleButton>
        <ToggleButton value='user'>User</ToggleButton>
        <ToggleButton value='guest'>Guest</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
