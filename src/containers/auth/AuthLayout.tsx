'use client';

import { Box } from '@mui/material';
import type { ReactNode } from 'react';

/**
 * Auth layout wrapper component
 * Provides consistent layout for authentication pages
 */
interface AuthLayoutProps {
  /** Page content */
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
      }}
    >
      {children}
    </Box>
  );
}
