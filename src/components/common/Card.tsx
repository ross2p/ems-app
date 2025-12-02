'use client';

import { Card as MuiCard, CardContent, CardHeader, CardProps as MuiCardProps } from '@mui/material';
import type { ReactNode } from 'react';

interface CardProps extends MuiCardProps {
  title?: string;
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
