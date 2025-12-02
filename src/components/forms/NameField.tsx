'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

interface NameFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function NameField<T extends FieldValues>({
  name,
  control,
  label = 'Name',
  required = true,
  disabled = false,
  placeholder = 'John Doe',
}: NameFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      type="text"
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      autoComplete="name"
      inputProps={{
        maxLength: 50,
        pattern: "^[a-zA-Z\\s'-]+$",
      }}
    />
  );
}
