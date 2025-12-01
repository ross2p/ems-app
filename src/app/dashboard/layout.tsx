'use client';

import type { ReactNode } from 'react';
import { DashboardLayout } from '@/containers/dashboard';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
