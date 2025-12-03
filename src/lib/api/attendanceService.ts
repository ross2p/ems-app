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

  getAttendanceById: async (id: string): Promise<Attendance> => {
    const response = await apiClient.get<GlobalResponse<Attendance>>(
      API_ROUTES.ATTENDANCE.GET(id),
    );

    if (!response.data.data) {
      throw new Error('No attendance data in response');
    }

    return response.data.data;
  },

  getAttendancesByEvent: async (eventId: string): Promise<Attendance[]> => {
    const response = await apiClient.get<GlobalResponse<Attendance[]>>(
      API_ROUTES.ATTENDANCE.BY_EVENT(eventId),
    );

    if (!response.data.data) {
      throw new Error('No attendance data in response');
    }

    return response.data.data;
  },

  getAttendancesByUser: async (userId: string): Promise<Attendance[]> => {
    const response = await apiClient.get<GlobalResponse<Attendance[]>>(
      API_ROUTES.ATTENDANCE.BY_USER(userId),
    );

    if (!response.data.data) {
      throw new Error('No attendance data in response');
    }

    return response.data.data;
  },

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

  deleteAttendance: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.ATTENDANCE.DELETE(id));
  },
};

