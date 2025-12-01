/**
 * Environment-based constants
 */

export const ENV = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * API Routes (versioned with /api/v1 prefix)
 */
export const API_ROUTES = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },

  // User
  USER: {
    ME: '/user/me',
    PROFILE: (id: string) => `/user/${id}`,
    UPDATE: '/user/update',
    DELETE: (id: string) => `/user/${id}`,
  },

  // Category
  CATEGORY: {
    LIST: '/category',
    GET: (id: string) => `/category/${id}`,
    CREATE: '/category',
    UPDATE: (id: string) => `/category/${id}`,
    DELETE: (id: string) => `/category/${id}`,
  },

  // Event
  EVENT: {
    LIST: '/event',
    GET: (id: string) => `/event/${id}`,
    CREATE: '/event',
    UPDATE: (id: string) => `/event/${id}`,
    DELETE: (id: string) => `/event/${id}`,
  },

  // Attendance
  ATTENDANCE: {
    LIST: '/attendance',
    GET: (id: string) => `/attendance/${id}`,
    BY_EVENT: (eventId: string) => `/attendance/event/${eventId}`,
    BY_USER: (userId: string) => `/attendance/user/${userId}`,
    CREATE: '/attendance',
    UPDATE: (id: string) => `/attendance/${id}`,
    DELETE: (id: string) => `/attendance/${id}`,
  },
} as const;

/**
 * Local Storage Keys (prefixed with ems_ to avoid conflicts)
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ems_access_token',
  REFRESH_TOKEN: 'ems_refresh_token',
  USER: 'ems_user',
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Auth-related constants
 */
export const AUTH = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
} as const;

/**
 * UI/UX Constants
 */
export const UI = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
} as const;

/**
 * Regular Expressions
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  PHONE: /^\+?[\d\s\-()]{7,}$/,
} as const;
