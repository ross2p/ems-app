/**
 * Event Navigation Hook
 * Encapsulates all event-related navigation logic
 */

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ROUTES } from '@/lib/constants/routes';

/**
 * Hook for event navigation
 * Provides consistent navigation methods for event-related routes
 */
export function useEventNavigation() {
  const router = useRouter();

  /**
   * Navigate to event list page
   */
  const navigateToList = useCallback(() => {
    router.push(ROUTES.DASHBOARD.EVENTS.LIST);
  }, [router]);

  /**
   * Navigate to event detail page
   */
  const navigateToEvent = useCallback(
    (eventId: string) => {
      router.push(ROUTES.DASHBOARD.EVENTS.DETAIL(eventId));
    },
    [router]
  );

  /**
   * Navigate to create event page
   */
  const navigateToCreate = useCallback(() => {
    router.push(ROUTES.DASHBOARD.EVENTS.CREATE);
  }, [router]);

  /**
   * Navigate to edit event page
   */
  const navigateToEdit = useCallback(
    (eventId: string) => {
      router.push(ROUTES.DASHBOARD.EVENTS.EDIT(eventId));
    },
    [router]
  );

  /**
   * Navigate back (browser back)
   */
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

