/**
 * Protected page wrapper component
 * Redirects to login if user is not authenticated
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { Loading } from '@/components/common';
import type { ReactNode } from 'react';

interface ProtectedPageProps {
  children: ReactNode;
}

export function ProtectedPage({ children }: ProtectedPageProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loading message="Loading..." fullScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
