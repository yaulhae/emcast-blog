// src/components/auth/AccountTypeSelector.tsx
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface AccountTypeSelectorProps {
  name: string;
  control: Control<any>; // 필요 시 Control<SignUpFormValues>로 명확히 지정 가능
}

export default function AccountTypeSelector({
  name,
  control
}: AccountTypeSelectorProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Stack spacing={1}>
          <Typography variant='subtitle2' component='label'>
            Select account type
          </Typography>
          <ToggleButtonGroup
            value={field.value}
            exclusive
            onChange={(_, newValue) => {
              if (newValue) field.onChange(newValue);
            }}
            fullWidth
            color='primary'
            size='small'
          >
            <ToggleButton value='admin'>Admin</ToggleButton>
            <ToggleButton value='user'>User</ToggleButton>
            <ToggleButton value='guest'>Guest</ToggleButton>
          </ToggleButtonGroup>
          {fieldState.error && (
            <Typography color='error' variant='caption'>
              {fieldState.error.message}
            </Typography>
          )}
        </Stack>
      )}
    />
  );
}
