/**
 * Global API Response wrapper - matches backend response structure
 * All backend endpoints return this format
 */
export interface GlobalResponse<T = unknown> {
  statusCode: number;
  message: string;
  name: string;
  data: T | null;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
