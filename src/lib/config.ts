export const ENV = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

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
    SIMILAR: (id: string) => `/event/${id}/similar`,
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
  SERVICE_UNAVAILABLE: 503,
} as const;

export const AUTH = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;


export const MAPS_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  DEFAULT_CENTER: {
    lat: 40.7128, // New York City
    lng: -74.006,
  },
  DEFAULT_ZOOM: 13,
} as const;

export const UI = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  PHONE: /^\+?[\d\s\-()]{7,}$/,
} as const;
