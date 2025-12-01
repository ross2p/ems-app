'use client';

import type { ReactNode } from 'react';
import { AuthLayout } from '@/containers/auth';

export default function AuthLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
