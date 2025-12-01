'use client';

import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

/**
 * Custom TextField component wrapping MUI TextField
 * Provides consistent styling, validation, and defaults
 */
export type TextFieldProps = MuiTextFieldProps;

export function TextField({ 
  variant = 'outlined', 
  fullWidth = true,
  size = 'medium',
  ...props 
}: TextFieldProps) {
  return (
    <MuiTextField 
      variant={variant} 
      fullWidth={fullWidth}
      size={size}
      {...props} 
    />
  );
}
