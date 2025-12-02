/**
 * React Query hooks for Event operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '@/lib/api';
import type {
  Event,
  CreateEventDto,
  UpdateEventDto,
  EventListParams,
} from '@/types';

/**
 * Query keys for events
 */
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (params: EventListParams) => [...eventKeys.lists(), params] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  similar: (id: string) => [...eventKeys.all, 'similar', id] as const,
};

export function useEvents(params: EventListParams = {}) {
  return useQuery({
    queryKey: eventKeys.list(params),
    queryFn: () => eventService.getEvents(params),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch single event by ID
 */
export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventService.getEventById(id),
    enabled: !!id,
  });
}

export function useSimilarEvents(id: string) {
  return useQuery({
    queryKey: eventKeys.similar(id),
    queryFn: () => eventService.getSimilarEvents(id),
    enabled: !!id,
  });
}

/**
 * Hook to create new event
 */
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventDto) => eventService.createEvent(data),
    onSuccess: () => {
      // Invalidate events list to refetch
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
}

/**
 * Hook to update existing event
 */
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventDto }) =>
      eventService.updateEvent(id, data),
    onSuccess: (updatedEvent) => {
      // Invalidate lists and specific event detail
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(updatedEvent.id) });
    },
  });
}

/**
 * Hook to delete event
 */
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventService.deleteEvent(id),
    onSuccess: () => {
      // Invalidate events list to refetch
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
}

