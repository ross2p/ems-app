import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ROUTES } from '@/lib/constants/routes';

export function useEventNavigation() {
  const router = useRouter();

  const navigateToList = useCallback(() => {
    router.push(ROUTES.DASHBOARD.EVENTS.LIST);
  }, [router]);

  const navigateToEvent = useCallback(
    (eventId: string) => {
      router.push(ROUTES.DASHBOARD.EVENTS.DETAIL(eventId));
    },
    [router]
  );

  const navigateToCreate = useCallback(() => {
    router.push(ROUTES.DASHBOARD.EVENTS.CREATE);
  }, [router]);

  const navigateToEdit = useCallback(
    (eventId: string) => {
      router.push(ROUTES.DASHBOARD.EVENTS.EDIT(eventId));
    },
    [router]
  );

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    navigateToList,
    navigateToEvent,
    navigateToCreate,
    navigateToEdit,
    navigateBack,
  };
}

