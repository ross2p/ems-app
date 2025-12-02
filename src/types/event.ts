/**
 * Event-related types and interfaces
 */

import { UserProfile } from './user';

/**
 * Category model
 */
export interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}

/**
 * Event model - matches backend response
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  categoryId: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  category?: Category | null;
  createdBy?: UserProfile;
}

/**
 * Event filters for searching and filtering
 */
export interface EventFilters {
  search?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'date' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Event list parameters with pagination
 */
export interface EventListParams extends EventFilters {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Create event DTO
 */
export interface CreateEventDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  latitude?: number;
  longitude?: number;
  categoryId?: string;
}

/**
 * Update event DTO - all fields optional
 */
export interface UpdateEventDto {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  categoryId?: string;
}

