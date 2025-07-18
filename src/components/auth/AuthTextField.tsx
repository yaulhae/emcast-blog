import { FormControl, FormLabel, TextField } from '@mui/material';

interface AuthTextFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: boolean;
  helperText?: string;
}

export default function AuthTextField({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  error,
  helperText
}: AuthTextFieldProps) {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextField
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        fullWidth
        required
        variant='outlined'
        error={error}
        helperText={helperText}
        color={error ? 'error' : 'primary'}
      />
    </FormControl>
  );
}
