'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

/**
 * Email input field component
 * Automatically validates email format
 */
interface EmailFieldProps<T extends FieldValues> {
  /** Field name (must match form schema) */
  name: Path<T>;
  /** React-hook-form control object */
  control: Control<T>;
  /** Field label (optional, defaults to 'Email') */
  label?: string;
  /** Whether field is required (optional) */
  required?: boolean;
  /** Whether field is disabled (optional) */
  disabled?: boolean;
}

export function EmailField<T extends FieldValues>({
  name,
  control,
  label = 'Email',
  required = true,
  disabled = false,
}: EmailFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      type="email"
      required={required}
      disabled={disabled}
      autoComplete="email"
      placeholder="you@example.com"
      inputProps={{
        maxLength: 100,
      }}
    />
  );
}
