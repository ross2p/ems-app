/**
 * React Query hooks for Attendance operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from '@/lib/api';
import type {
  Attendance,
  CreateAttendanceDto,
  UpdateAttendanceDto,
  AttendanceFilterParams,
} from '@/types';

/**
 * Query keys for attendance
 */
export const attendanceKeys = {
  all: ['attendances'] as const,
  lists: () => [...attendanceKeys.all, 'list'] as const,
  list: (params: AttendanceFilterParams) => [...attendanceKeys.lists(), params] as const,
  details: () => [...attendanceKeys.all, 'detail'] as const,
  detail: (id: string) => [...attendanceKeys.details(), id] as const,
  byEvent: (eventId: string) => [...attendanceKeys.all, 'event', eventId] as const,
  byUser: (userId: string) => [...attendanceKeys.all, 'user', userId] as const,
};

/**
 * Hook to fetch attendance records with optional filtering
 */
export function useAttendances(params: AttendanceFilterParams = {}) {
  return useQuery({
    queryKey: attendanceKeys.list(params),
    queryFn: () => attendanceService.getAttendances(params),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch single attendance by ID
 */
export function useAttendance(id: string) {
  return useQuery({
    queryKey: attendanceKeys.detail(id),
    queryFn: () => attendanceService.getAttendanceById(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch attendances for a specific event
 */
export function useEventAttendances(eventId: string) {
  return useQuery({
    queryKey: attendanceKeys.byEvent(eventId),
    queryFn: () => attendanceService.getAttendancesByEvent(eventId),
    enabled: !!eventId,
  });
}

/**
 * Hook to fetch attendances for a specific user
 */
export function useUserAttendances(userId: string) {
  return useQuery({
    queryKey: attendanceKeys.byUser(userId),
    queryFn: () => attendanceService.getAttendancesByUser(userId),
    enabled: !!userId,
  });
}

/**
 * Hook to create new attendance (join event)
 */
export function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAttendanceDto) => attendanceService.createAttendance(data),
    onSuccess: (newAttendance) => {
      // Invalidate attendance lists
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
      // Invalidate event-specific and user-specific attendances
      queryClient.invalidateQueries({ queryKey: attendanceKeys.byEvent(newAttendance.eventId) });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.byUser(newAttendance.userId) });
    },
  });
}

/**
 * Hook to update attendance
 */
export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAttendanceDto }) =>
      attendanceService.updateAttendance(id, data),
    onSuccess: (updatedAttendance) => {
      // Invalidate lists and specific attendance detail
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.detail(updatedAttendance.id) });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.byEvent(updatedAttendance.eventId) });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.byUser(updatedAttendance.userId) });
    },
  });
}

/**
 * Hook to delete attendance (leave event)
 */
export function useDeleteAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => attendanceService.deleteAttendance(id),
    onSuccess: () => {
      // Invalidate attendance lists to refetch
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.all });
    },
  });
}

