import { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface UseUrlFiltersOptions<T> {
  parseFilters: (searchParams: URLSearchParams) => T;
  buildQuery: (filters: T) => string;
  defaultFilters: T;
}

export function useUrlFilters<T extends Record<string, any>>({
  parseFilters,
  buildQuery,
  defaultFilters,
}: UseUrlFiltersOptions<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFiltersState] = useState<T>(() => ({
    ...defaultFilters,
    ...parseFilters(searchParams),
  }));

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

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
    router.push(pathname, { scroll: false });
  }, [defaultFilters, pathname, router]);

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

