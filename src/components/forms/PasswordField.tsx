'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

/**
 * Password input field component
 * Provides secure password input with proper autocomplete settings
 */
interface PasswordFieldProps<T extends FieldValues> {
  /** Field name (must match form schema) */
  name: Path<T>;
  /** React-hook-form control object */
  control: Control<T>;
  /** Field label (optional, defaults to 'Password') */
  label?: string;
  /** Whether field is required (optional) */
  required?: boolean;
  /** Whether field is disabled (optional) */
  disabled?: boolean;
  /** Autocomplete attribute value */
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
