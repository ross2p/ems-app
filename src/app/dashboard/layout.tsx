'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import type { ReactNode } from 'react';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
