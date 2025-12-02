/**
 * Attendance API Service
 * Handles all attendance-related API calls
 */

import { apiClient } from './client';
import { API_ROUTES } from '../config';
import type {
  Attendance,
  CreateAttendanceDto,
  UpdateAttendanceDto,
  AttendanceFilterParams,
  GlobalResponse,
} from '@/types';

export const attendanceService = {
  /**
   * Get all attendance records with optional filtering
   */
  getAttendances: async (params: AttendanceFilterParams = {}): Promise<Attendance[]> => {
    const response = await apiClient.get<GlobalResponse<Attendance[]>>(
      API_ROUTES.ATTENDANCE.LIST,
      { params },
    );

    if (!response.data.data) {
      throw new Error('No attendance data in response');
    }

    return response.data.data;
  },

  /**
   * Get attendance by ID
   */
  getAttendanceById: async (id: string): Promise<Attendance> => {
    const response = await apiClient.get<GlobalResponse<Attendance>>(
      API_ROUTES.ATTENDANCE.GET(id),
    );

    if (!response.data.data) {
      throw new Error('No attendance data in response');
    }

    return response.data.data;
  },

  /**
   * Get all attendances for a specific event
   */
  getAttendancesByEvent: async (eventId: string): Promise<Attendance[]> => {
    const response = await apiClient.get<GlobalResponse<Attendance[]>>(
      API_ROUTES.ATTENDANCE.BY_EVENT(eventId),
    );

    if (!response.data.data) {
      throw new Error('No attendance data in response');
    }

    return response.data.data;
  },

  /**
   * Get all attendances for a specific user
   */
  getAttendancesByUser: async (userId: string): Promise<Attendance[]> => {
    const response = await apiClient.get<GlobalResponse<Attendance[]>>(
      API_ROUTES.ATTENDANCE.BY_USER(userId),
    );

    if (!response.data.data) {
      throw new Error('No attendance data in response');
    }

    return response.data.data;
  },

  /**
   * Create a new attendance record (join event)
   */
  createAttendance: async (data: CreateAttendanceDto): Promise<Attendance> => {
    const response = await apiClient.post<GlobalResponse<Attendance>>(
      API_ROUTES.ATTENDANCE.CREATE,
      data,
    );

    if (!response.data.data) {
      throw new Error('No attendance data in create response');
    }

    return response.data.data;
  },

  /**
   * Update attendance record
   */
  updateAttendance: async (id: string, data: UpdateAttendanceDto): Promise<Attendance> => {
    const response = await apiClient.patch<GlobalResponse<Attendance>>(
      API_ROUTES.ATTENDANCE.UPDATE(id),
      data,
    );

    if (!response.data.data) {
      throw new Error('No attendance data in update response');
    }

    return response.data.data;
  },

  /**
   * Delete attendance record (leave event)
   */
  deleteAttendance: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.ATTENDANCE.DELETE(id));
  },
};

