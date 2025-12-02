/**
 * React Query hooks for Category operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService, CreateCategoryDto, CategoryListParams } from '@/lib/api/categoryService';

/**
 * Query keys for categories
 */
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params: CategoryListParams) => [...categoryKeys.lists(), params] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

/**
 * Hook to fetch categories with optional search
 */
export function useCategories(params?: CategoryListParams) {
  return useQuery({
    queryKey: categoryKeys.list(params || {}),
    queryFn: () => categoryService.getCategories(params),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch single category by ID
 */
export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryService.getCategoryById(id),
    enabled: !!id,
  });
}

/**
 * Hook to create new category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoryService.createCategory(data),
    onSuccess: () => {
      // Invalidate categories list to refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
}
