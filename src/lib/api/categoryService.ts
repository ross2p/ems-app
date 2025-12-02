/**
 * Category API Service
 * Handles all category-related API calls
 */

import { apiClient } from './client';
import { API_ROUTES } from '../config';
import type { Category, GlobalResponse, PageResponse } from '@/types';

/**
 * DTO for creating a new category
 */
export interface CreateCategoryDto {
  name: string;
  description?: string;
}

/**
 * Category list parameters
 */
export interface CategoryListParams {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}

export const categoryService = {
  /**
   * Get all categories with optional search
   */
  getCategories: async (params?: CategoryListParams): Promise<PageResponse<Category>> => {
    const response = await apiClient.get<GlobalResponse<PageResponse<Category>>>(
      API_ROUTES.CATEGORY.LIST,
      { params },
    );

    if (!response.data.data) {
      throw new Error('No categories data in response');
    }

    return response.data.data;
  },

  /**
   * Get single category by ID
   */
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<GlobalResponse<Category>>(
      API_ROUTES.CATEGORY.GET(id),
    );

    if (!response.data.data) {
      throw new Error('No category data in response');
    }

    return response.data.data;
  },

  /**
   * Create a new category
   */
  createCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await apiClient.post<GlobalResponse<Category>>(
      API_ROUTES.CATEGORY.CREATE,
      data,
    );

    if (!response.data.data) {
      throw new Error('No category data in create response');
    }

    return response.data.data;
  },
};

