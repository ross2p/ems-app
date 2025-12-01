'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

/**
 * Custom Button component wrapping MUI Button
 * Provides consistent styling and defaults across the application
 */
export type ButtonProps = MuiButtonProps;

export function Button({ 
  variant = 'contained',
  children,
  ...props 
}: ButtonProps) {
  return (
    <MuiButton 
      variant={variant}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
