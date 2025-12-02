/**
 * Form Section Component
 * Wrapper for form sections with consistent spacing and optional headers
 */

import { Box, Typography, Divider } from '@mui/material';
import { ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  showDivider?: boolean;
}

/**
 * Provides consistent spacing and structure for form sections
 */
export function FormSection({
  title,
  subtitle,
  children,
  showDivider = false,
}: FormSectionProps) {
  return (
    <Box>
      {title && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      {children}
      {showDivider && <Divider sx={{ my: 3 }} />}
    </Box>
  );
}

