/**
 * useInfiniteQuery - Enterprise Infinite Scroll Hook
 *
 * A generic hook for paginated data fetching with support for:
 * - Automatic page tracking
 * - Multiple loading states (initial, more, refreshing)
 * - Pull-to-refresh
 * - Error handling with retry
 * - Deduplication prevention
 * - Configurable page size
 *
 * @example
 * ```typescript
 * const {
 *   data,
 *   isLoading,
 *   isLoadingMore,
 *   isRefreshing,
 *   error,
 *   hasMore,
 *   loadMore,
 *   refresh,
 *   retry,
 * } = useInfiniteQuery<Product>({
 *   queryFn: async (page, limit) => {
 *     const response = await api.getProducts({ page, limit });
 *     return {
 *       items: response.products,
 *       hasMore: response.pagination.hasMore,
 *       total: response.pagination.total,
 *     };
 *   },
 *   limit: 10,
 * });
 * ```
 */

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Result returned from the query function
 */
export interface InfiniteQueryResult<T> {
  /** Array of items for the current page */
  items: T[];
  /** Whether there are more pages to load */
  hasMore: boolean;
  /** Optional total count of items */
  total?: number;
}

/**
 * Options for useInfiniteQuery
 */
export interface UseInfiniteQueryOptions<T> {
  /**
   * Function to fetch a page of data
   * @param page - Current page number (1-indexed)
   * @param limit - Number of items per page
   * @returns Promise resolving to items, hasMore flag, and optional total
   */
  queryFn: (page: number, limit: number) => Promise<InfiniteQueryResult<T>>;

  /**
   * Number of items per page
   * @default 10
   */
  limit?: number;

  /**
   * Whether the query is enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Initial data to populate before first fetch
   */
  initialData?: T[];

  /**
   * Callback when data changes
   */
  onDataChange?: (data: T[]) => void;

  /**
   * Callback when an error occurs
   */
  onError?: (error: Error) => void;

  /**
   * Callback when loading state changes
   */
  onLoadingChange?: (isLoading: boolean) => void;

  /**
   * Key extractor for deduplication (optional)
   * If provided, duplicate items will be filtered out
   */
  getItemKey?: (item: T) => string;

  /**
   * Delay before triggering a retry (ms)
   * @default 0
   */
  retryDelay?: number;
}

/**
 * Return type for useInfiniteQuery
 */
export interface UseInfiniteQueryReturn<T> {
  /** Accumulated array of all items loaded so far */
  data: T[];

  /** Whether the initial load is in progress */
  isLoading: boolean;

  /** Whether loading more items (next page) */
  isLoadingMore: boolean;

  /** Whether refreshing (pull-to-refresh) */
  isRefreshing: boolean;

  /** Error message if fetch failed, null otherwise */
  error: string | null;

  /** Whether there are more pages to load */
  hasMore: boolean;

  /** Total count of items (if provided by API) */
  total: number | null;

  /** Current page number */
  page: number;

  /** Load the next page of data */
  loadMore: () => void;

  /** Reset and reload from the first page */
  refresh: () => void;

  /** Retry the last failed request */
  retry: () => void;

  /** Reset to initial state */
  reset: () => void;

  /** Whether any loading operation is in progress */
  isAnyLoading: boolean;
}

/**
 * Enterprise infinite scroll hook for paginated data fetching
 */
export function useInfiniteQuery<T>(
  options: UseInfiniteQueryOptions<T>
): UseInfiniteQueryReturn<T> {
  const {
    queryFn,
    limit = 10,
    enabled = true,
    initialData = [],
    onDataChange,
    onError,
    onLoadingChange,
    getItemKey,
    retryDelay = 0,
  } = options;

  // State
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refs for preventing duplicate calls
  const isFetchingRef = useRef(false);
  const lastFetchTypeRef = useRef<'initial' | 'more' | 'refresh'>('initial');

  // Store queryFn in ref to avoid dependency issues
  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  // Store callbacks in refs
  const onDataChangeRef = useRef(onDataChange);
  onDataChangeRef.current = onDataChange;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const onLoadingChangeRef = useRef(onLoadingChange);
  onLoadingChangeRef.current = onLoadingChange;

  /**
   * Deduplicate items using key extractor
   */
  const deduplicateItems = useCallback(
    (existingItems: T[], newItems: T[]): T[] => {
      if (!getItemKey) {
        return [...existingItems, ...newItems];
      }

      const existingKeys = new Set(existingItems.map(getItemKey));
      const uniqueNewItems = newItems.filter(
        (item) => !existingKeys.has(getItemKey(item))
      );
      return [...existingItems, ...uniqueNewItems];
    },
    [getItemKey]
  );

  /**
   * Core fetch function
   */
  const fetchData = useCallback(
    async (
      targetPage: number,
      fetchType: 'initial' | 'more' | 'refresh'
    ) => {
      // Prevent duplicate fetches
      if (isFetchingRef.current) {
        return;
      }

      // Check if there's more to load for 'more' fetch type
      if (fetchType === 'more' && !hasMore) {
        return;
      }

      isFetchingRef.current = true;
      lastFetchTypeRef.current = fetchType;

      // Set appropriate loading state
      if (fetchType === 'initial') {
        setIsLoading(true);
        onLoadingChangeRef.current?.(true);
      } else if (fetchType === 'more') {
        setIsLoadingMore(true);
      } else if (fetchType === 'refresh') {
        setIsRefreshing(true);
      }

      setError(null);

      try {
        const result = await queryFnRef.current(targetPage, limit);

        setData((prevData) => {
          let newData: T[];

          if (fetchType === 'refresh' || targetPage === 1) {
            // Replace data on refresh or first page
            newData = result.items;
          } else {
            // Append data for subsequent pages
            newData = deduplicateItems(prevData, result.items);
          }

          // Notify data change
          onDataChangeRef.current?.(newData);
          return newData;
        });

        setPage(targetPage);
        setHasMore(result.hasMore);
        if (result.total !== undefined) {
          setTotal(result.total);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        onErrorRef.current?.(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        isFetchingRef.current = false;

        // Reset loading states
        if (fetchType === 'initial') {
          setIsLoading(false);
          onLoadingChangeRef.current?.(false);
        } else if (fetchType === 'more') {
          setIsLoadingMore(false);
        } else if (fetchType === 'refresh') {
          setIsRefreshing(false);
        }
      }
    },
    [limit, hasMore, deduplicateItems]
  );

  /**
   * Load the next page
   */
  const loadMore = useCallback(() => {
    if (!enabled || !hasMore || isFetchingRef.current) {
      return;
    }
    fetchData(page + 1, 'more');
  }, [enabled, hasMore, page, fetchData]);

  /**
   * Refresh - reset and reload from page 1
   */
  const refresh = useCallback(() => {
    if (!enabled) {
      return;
    }
    setPage(1);
    setHasMore(true);
    fetchData(1, 'refresh');
  }, [enabled, fetchData]);

  /**
   * Retry the last failed request
   */
  const retry = useCallback(() => {
    if (!enabled || !error) {
      return;
    }

    const doRetry = () => {
      const fetchType = lastFetchTypeRef.current;
      const targetPage = fetchType === 'more' ? page + 1 : page;
      fetchData(targetPage, fetchType);
    };

    if (retryDelay > 0) {
      setTimeout(doRetry, retryDelay);
    } else {
      doRetry();
    }
  }, [enabled, error, page, retryDelay, fetchData]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setData(initialData);
    setPage(1);
    setHasMore(true);
    setTotal(null);
    setError(null);
    setIsLoading(false);
    setIsLoadingMore(false);
    setIsRefreshing(false);
    isFetchingRef.current = false;
  }, [initialData]);

  // Initial fetch on mount (when enabled)
  useEffect(() => {
    if (enabled && data.length === 0 && !isFetchingRef.current) {
      fetchData(1, 'initial');
    }
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    hasMore,
    total,
    page,
    loadMore,
    refresh,
    retry,
    reset,
    isAnyLoading: isLoading || isLoadingMore || isRefreshing,
  };
}

export default useInfiniteQuery;
