'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: 'current-password' | 'new-password';
}

export function PasswordField<T extends FieldValues>({
  name,
  control,
  label = 'Password',
  required = true,
  disabled = false,
  autoComplete = 'current-password',
}: PasswordFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      type="password"
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      placeholder="••••••••"
      inputProps={{
        maxLength: 50,
      }}
    />
  );
}
