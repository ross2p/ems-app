export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const ROUTES = {
  // Auth routes
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',

  // User routes
  ME: '/user/me',
  USER: (id: string) => `/user/${id}`,

  // Category routes
  CATEGORIES: '/category',
  CATEGORY: (id: string) => `/category/${id}`,

  // Event routes
  EVENTS: '/event',
  EVENT: (id: string) => `/event/${id}`,

  // Attendance routes
  ATTENDANCE: '/attendance',
  ATTENDANCE_EVENT: (eventId: string) => `/attendance/event/${eventId}`,
  ATTENDANCE_USER: (userId: string) => `/attendance/user/${userId}`,
  ATTENDANCE_ID: (id: string) => `/attendance/${id}`,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ems_access_token',
  REFRESH_TOKEN: 'ems_refresh_token',
  USER: 'ems_user',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
