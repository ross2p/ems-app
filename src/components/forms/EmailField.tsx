'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

interface EmailFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
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
