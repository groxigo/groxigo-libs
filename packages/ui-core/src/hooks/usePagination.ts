/**
 * usePagination - Stateful pagination logic
 *
 * Pure state management hook with no data fetching.
 * Drives PaginationBar and page-based navigation.
 *
 * @example
 * ```typescript
 * const {
 *   page,
 *   totalPages,
 *   offset,
 *   hasNextPage,
 *   hasPreviousPage,
 *   setPage,
 *   nextPage,
 *   previousPage,
 *   pageRange,
 * } = usePagination({ total: 100, pageSize: 20 });
 * ```
 */

import { useState, useCallback, useMemo, useRef } from 'react';

export interface UsePaginationOptions {
  /** Total number of items (from API response) */
  total: number;
  /** Items per page @default 20 */
  pageSize?: number;
  /** Initial page (1-based) @default 1 */
  initialPage?: number;
  /** Callback on page change */
  onChange?: (page: number) => void;
  /** Max page buttons to show in pageRange @default 7 */
  siblingCount?: number;
}

export interface UsePaginationReturn {
  /** Current page (1-based) */
  page: number;
  /** Total pages computed from total & pageSize */
  totalPages: number;
  /** Computed offset for API queries: (page - 1) * pageSize */
  offset: number;
  /** Page size */
  pageSize: number;
  /** Navigation guards */
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  /** Navigation actions */
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  /** Set a new page size (resets to page 1) */
  setPageSize: (size: number) => void;
  /** Range of visible page numbers for PaginationBar */
  pageRange: number[];
}

/**
 * Generate a range of page numbers for display, with ellipsis markers (-1).
 */
function generatePageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): number[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  // Total slots = siblings on each side + first + last + current + 2 ellipsis
  const totalSlots = siblingCount * 2 + 5;

  // If total pages fit within slots, show all
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    // Show more pages at the start
    const leftCount = siblingCount * 2 + 3;
    const leftPages = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftPages, -1, totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // Show more pages at the end
    const rightCount = siblingCount * 2 + 3;
    const rightPages = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + 1 + i
    );
    return [1, -1, ...rightPages];
  }

  // Show ellipsis on both sides
  const middlePages = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, -1, ...middlePages, -1, totalPages];
}

export function usePagination(options: UsePaginationOptions): UsePaginationReturn {
  const {
    total,
    pageSize: initialPageSize = 20,
    initialPage = 1,
    onChange,
    siblingCount = 1,
  } = options;

  const [page, setPageState] = useState(Math.max(1, initialPage));
  const [pageSize, setPageSizeState] = useState(Math.max(1, initialPageSize));

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const totalPages = useMemo(
    () => (total > 0 ? Math.ceil(total / pageSize) : 0),
    [total, pageSize]
  );

  const clampPage = useCallback(
    (p: number) => {
      if (totalPages === 0) return 1;
      return Math.max(1, Math.min(p, totalPages));
    },
    [totalPages]
  );

  const setPage = useCallback(
    (newPage: number) => {
      const clamped = clampPage(newPage);
      setPageState(clamped);
      onChangeRef.current?.(clamped);
    },
    [clampPage]
  );

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages, setPage]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  const firstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const lastPage = useCallback(() => {
    if (totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, setPage]);

  const setPageSize = useCallback(
    (size: number) => {
      const newSize = Math.max(1, size);
      setPageSizeState(newSize);
      setPageState(1);
      onChangeRef.current?.(1);
    },
    []
  );

  const pageRange = useMemo(
    () => generatePageRange(page, totalPages, siblingCount),
    [page, totalPages, siblingCount]
  );

  return {
    page,
    totalPages,
    offset: (page - 1) * pageSize,
    pageSize,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    isFirstPage: page === 1,
    isLastPage: page >= totalPages || totalPages === 0,
    setPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setPageSize,
    pageRange,
  };
}

export default usePagination;
