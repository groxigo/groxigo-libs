/**
 * usePaginatedQuery - Data-fetching hook with pagination
 *
 * Combines pagination state with fetch logic. Platform-agnostic —
 * works with any async data source (TanStack Query, manual fetch, etc.).
 *
 * Unlike useInfiniteQuery (which accumulates data across pages),
 * usePaginatedQuery replaces data on each page change. This is the
 * correct behavior for page-based navigation with PaginationBar.
 *
 * @example
 * ```typescript
 * const {
 *   data: products,
 *   pagination,
 *   isLoading,
 *   setPage,
 *   nextPage,
 *   previousPage,
 *   refresh,
 * } = usePaginatedQuery<Product>({
 *   queryFn: async (page, limit) => {
 *     const response = await api.getProducts({ page, limit });
 *     return {
 *       items: response.products,
 *       pagination: response.pagination,
 *     };
 *   },
 *   limit: 20,
 * });
 * ```
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface PaginatedQueryResult<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total?: number;
    totalPages?: number;
    hasMore: boolean;
  };
}

export interface UsePaginatedQueryOptions<T> {
  /** Fetch function — receives page & limit, returns items + pagination metadata */
  queryFn: (page: number, limit: number) => Promise<PaginatedQueryResult<T>>;
  /** Items per page @default 20 */
  limit?: number;
  /** Initial page @default 1 */
  initialPage?: number;
  /** Enable/disable fetching @default true */
  enabled?: boolean;
  /** Callback on data change */
  onDataChange?: (data: T[]) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

export interface UsePaginatedQueryReturn<T> {
  /** Current page of items */
  data: T[];
  /** Loading state */
  isLoading: boolean;
  /** Error message */
  error: string | null;
  /** Full pagination state (for PaginationBar) */
  pagination: {
    page: number;
    totalPages: number;
    total: number | null;
    hasMore: boolean;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  /** Navigation */
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  /** Refresh current page */
  refresh: () => void;
  /** Retry after error */
  retry: () => void;
}

export function usePaginatedQuery<T>(
  options: UsePaginatedQueryOptions<T>
): UsePaginatedQueryReturn<T> {
  const {
    queryFn,
    limit = 20,
    initialPage = 1,
    enabled = true,
    onDataChange,
    onError,
  } = options;

  const [data, setData] = useState<T[]>([]);
  const [page, setPageState] = useState(Math.max(1, initialPage));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationMeta, setPaginationMeta] = useState<{
    total: number | null;
    totalPages: number;
    hasMore: boolean;
  }>({ total: null, totalPages: 0, hasMore: false });

  // Refs to avoid stale closures
  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const onDataChangeRef = useRef(onDataChange);
  onDataChangeRef.current = onDataChange;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const isFetchingRef = useRef(false);
  const fetchIdRef = useRef(0);

  const fetchPage = useCallback(
    async (targetPage: number) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      const fetchId = ++fetchIdRef.current;

      setIsLoading(true);
      setError(null);

      try {
        const result = await queryFnRef.current(targetPage, limit);

        // Only apply if this is still the latest fetch
        if (fetchId !== fetchIdRef.current) return;

        setData(result.items);
        onDataChangeRef.current?.(result.items);

        const totalPages =
          result.pagination.totalPages ??
          (result.pagination.total != null
            ? Math.ceil(result.pagination.total / limit)
            : 0);

        setPaginationMeta({
          total: result.pagination.total ?? null,
          totalPages,
          hasMore: result.pagination.hasMore,
        });
      } catch (err) {
        if (fetchId !== fetchIdRef.current) return;

        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        onErrorRef.current?.(
          err instanceof Error ? err : new Error(errorMessage)
        );
      } finally {
        if (fetchId === fetchIdRef.current) {
          isFetchingRef.current = false;
          setIsLoading(false);
        }
      }
    },
    [limit]
  );

  const setPage = useCallback(
    (newPage: number) => {
      const clamped = Math.max(1, newPage);
      setPageState(clamped);
    },
    []
  );

  const nextPage = useCallback(() => {
    if (paginationMeta.hasMore) {
      setPageState((prev) => prev + 1);
    }
  }, [paginationMeta.hasMore]);

  const previousPage = useCallback(() => {
    setPageState((prev) => Math.max(1, prev - 1));
  }, []);

  const refresh = useCallback(() => {
    if (enabled) {
      fetchPage(page);
    }
  }, [enabled, page, fetchPage]);

  const retry = useCallback(() => {
    if (enabled && error) {
      fetchPage(page);
    }
  }, [enabled, error, page, fetchPage]);

  // Fetch when page changes or enabled changes
  useEffect(() => {
    if (enabled) {
      fetchPage(page);
    }
  }, [enabled, page, fetchPage]);

  return {
    data,
    isLoading,
    error,
    pagination: {
      page,
      totalPages: paginationMeta.totalPages,
      total: paginationMeta.total,
      hasMore: paginationMeta.hasMore,
      pageSize: limit,
      hasNextPage: paginationMeta.hasMore,
      hasPreviousPage: page > 1,
    },
    setPage,
    nextPage,
    previousPage,
    refresh,
    retry,
  };
}

export default usePaginatedQuery;
