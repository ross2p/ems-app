/**
 * Event-specific constants
 */

export const EVENT_CONSTANTS = {
  /**
   * Pagination defaults
   */
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    DEFAULT_PAGE_NUMBER: 1,
    PAGE_SIZE_OPTIONS: [6, 12, 24, 48],
  },

  /**
   * Field length limits (must match backend validation)
   */
  LIMITS: {
    TITLE_MAX: 200,
    DESCRIPTION_MAX: 1000,
    LOCATION_MAX: 500,
  },

  /**
   * Sorting options
   */
  SORT: {
    OPTIONS: ['date', 'title', 'createdAt'] as const,
    ORDERS: ['asc', 'desc'] as const,
    DEFAULT_BY: 'date' as const,
    DEFAULT_ORDER: 'asc' as const,
  },

  /**
   * UI display constants
   */
  DISPLAY: {
    CARD_MIN_HEIGHT: 300,
    SKELETON_COUNT: 6,
    SIMILAR_EVENTS_LIMIT: 5,
    DESCRIPTION_PREVIEW_LINES: 3,
    TITLE_PREVIEW_LINES: 2,
  },
} as const;

/**
 * Event sort option type
 */
export type EventSortBy = (typeof EVENT_CONSTANTS.SORT.OPTIONS)[number];

/**
 * Event sort order type
 */
export type EventSortOrder = (typeof EVENT_CONSTANTS.SORT.ORDERS)[number];

