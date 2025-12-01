'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

/**
 * Name input field component
 * Validates names with proper formatting
 */
interface NameFieldProps<T extends FieldValues> {
  /** Field name (must match form schema) */
  name: Path<T>;
  /** React-hook-form control object */
  control: Control<T>;
  /** Field label */
  label?: string;
  /** Whether field is required (optional) */
  required?: boolean;
  /** Whether field is disabled (optional) */
  disabled?: boolean;
  /** Placeholder text (optional) */
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
