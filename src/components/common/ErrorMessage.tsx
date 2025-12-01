'use client';

import { Box, Alert, AlertTitle, AlertProps } from '@mui/material';

/**
 * Error/Alert message component
 * Displays contextual messages with appropriate severity levels
 */
interface ErrorMessageProps extends Omit<AlertProps, 'children'> {
  /** Error or message text */
  message: string;
  /** Optional title for the alert */
  title?: string;
  /** Severity level of the alert */
  severity?: 'error' | 'warning' | 'info' | 'success';
  /** Optional action callback */
  onDismiss?: () => void;
}

export function ErrorMessage({
  message,
  title = 'Error',
  severity = 'error',
  onDismiss,
  ...props
}: ErrorMessageProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Alert 
        severity={severity} 
        onClose={onDismiss}
        sx={{ width: '100%' }}
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  );
}
