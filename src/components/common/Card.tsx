'use client';

import { Card as MuiCard, CardContent, CardHeader, CardProps as MuiCardProps } from '@mui/material';
import type { ReactNode } from 'react';

/**
 * Custom Card component wrapping MUI Card
 * Provides consistent card styling with optional header
 */
interface CardProps extends MuiCardProps {
  /** Optional card title */
  title?: string;
  /** Card content */
  children: ReactNode;
}

export function Card({ title, children, ...props }: CardProps) {
  return (
    <MuiCard {...props}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}
