import { FormControl, FormLabel, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AuthTextFieldProps } from '../../types/auth';

export default function AuthTextField({
  name,
  label,
  type = 'text',
  placeholder,
  control
}: AuthTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <TextField
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            required
            fullWidth
          />
        </FormControl>
      )}
    />
  );
}
