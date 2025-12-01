'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField } from '@/components/common';
import type { TextFieldProps } from '@mui/material';

/**
 * Generic form field component that integrates with react-hook-form
 * Provides automatic validation error display
 */
interface FormFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  /** Field name (must match form schema) */
  name: Path<T>;
  /** React-hook-form control object */
  control: Control<T>;
  /** Field label */
  label: string;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  ...props
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          required={required}
          disabled={disabled}
          error={!!error}
          helperText={error?.message || ''}
          fullWidth
        />
      )}
    />
  );
}
