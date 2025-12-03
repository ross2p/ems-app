export const EVENT_CONSTANTS = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    DEFAULT_PAGE_NUMBER: 1,
    PAGE_SIZE_OPTIONS: [6, 12, 24, 48],
  },

  LIMITS: {
    TITLE_MAX: 200,
    DESCRIPTION_MAX: 1000,
    LOCATION_MAX: 500,
  },

  SORT: {
    OPTIONS: ['date', 'title', 'createdAt'] as const,
    ORDERS: ['asc', 'desc'] as const,
    DEFAULT_BY: 'date' as const,
    DEFAULT_ORDER: 'asc' as const,
  },
  DISPLAY: {
    CARD_MIN_HEIGHT: 300,
    SKELETON_COUNT: 6,
    SIMILAR_EVENTS_LIMIT: 5,
    DESCRIPTION_PREVIEW_LINES: 3,
    TITLE_PREVIEW_LINES: 2,
  },
} as const;

export type EventSortBy = (typeof EVENT_CONSTANTS.SORT.OPTIONS)[number];
export type EventSortOrder = (typeof EVENT_CONSTANTS.SORT.ORDERS)[number];

