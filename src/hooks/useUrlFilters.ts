/**
 * URL Filters Hook
 * Generic hook for managing filters synchronized with URL query parameters
 */

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface UseUrlFiltersOptions<T> {
  parseFilters: (searchParams: URLSearchParams) => T;
  buildQuery: (filters: T) => string;
  defaultFilters: T;
}

/**
 * Generic hook for URL-based filters
 * Synchronizes filter state with URL query parameters
 */
export function useUrlFilters<T extends Record<string, any>>({
  parseFilters,
  buildQuery,
  defaultFilters,
}: UseUrlFiltersOptions<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filters from URL or defaults
  const [filters, setFiltersState] = useState<T>(() => ({
    ...defaultFilters,
    ...parseFilters(searchParams),
  }));

  /**
   * Update filters and sync with URL
   */
  const setFilters = useCallback(
    (newFilters: Partial<T> | ((prev: T) => T)) => {
      const updatedFilters =
        typeof newFilters === 'function'
          ? newFilters(filters)
          : { ...filters, ...newFilters };

      setFiltersState(updatedFilters);

      const query = buildQuery(updatedFilters);
      const url = query ? `${pathname}?${query}` : pathname;
      router.push(url, { scroll: false });
    },
    [filters, pathname, router, buildQuery]
  );

  /**
   * Clear all filters and reset to defaults
   */
  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
    router.push(pathname, { scroll: false });
  }, [defaultFilters, pathname, router]);

  /**
   * Reset to specific filter values
   */
  const resetFilters = useCallback(
    (newFilters: T) => {
      setFiltersState(newFilters);
      const query = buildQuery(newFilters);
      const url = query ? `${pathname}?${query}` : pathname;
      router.push(url, { scroll: false });
    },
    [pathname, router, buildQuery]
  );

  return {
    filters,
    setFilters,
    clearFilters,
    resetFilters,
  };
}

