import { FormControl, FormLabel, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface AuthTextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  control: Control<any>;
}

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
