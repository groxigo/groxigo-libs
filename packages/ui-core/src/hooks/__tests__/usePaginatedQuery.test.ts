import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { usePaginatedQuery } from '../usePaginatedQuery';
import type { PaginatedQueryResult } from '../usePaginatedQuery';

function createMockQueryFn<T>(
  pages: Record<number, { items: T[]; total: number; hasMore: boolean }>
) {
  return vi.fn(
    async (page: number, limit: number): Promise<PaginatedQueryResult<T>> => {
      const pageData = pages[page];
      if (!pageData) {
        return {
          items: [],
          pagination: { page, limit, total: 0, totalPages: 0, hasMore: false },
        };
      }
      return {
        items: pageData.items,
        pagination: {
          page,
          limit,
          total: pageData.total,
          totalPages: Math.ceil(pageData.total / limit),
          hasMore: pageData.hasMore,
        },
      };
    }
  );
}

describe('usePaginatedQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial fetch', () => {
    it('should fetch page 1 on mount when enabled', async () => {
      const queryFn = createMockQueryFn({
        1: { items: ['a', 'b', 'c'], total: 10, hasMore: true },
      });

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, limit: 3 })
      );

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(queryFn).toHaveBeenCalledWith(1, 3);
      expect(result.current.data).toEqual(['a', 'b', 'c']);
      expect(result.current.pagination.page).toBe(1);
      expect(result.current.pagination.total).toBe(10);
      expect(result.current.pagination.hasMore).toBe(true);
      expect(result.current.pagination.hasNextPage).toBe(true);
      expect(result.current.pagination.hasPreviousPage).toBe(false);
    });

    it('should not fetch when enabled=false', async () => {
      const queryFn = createMockQueryFn({});

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, enabled: false })
      );

      // Wait a tick to ensure no fetch happens
      await new Promise((r) => setTimeout(r, 50));
      expect(queryFn).not.toHaveBeenCalled();
      expect(result.current.data).toEqual([]);
    });
  });

  describe('page navigation', () => {
    it('should fetch new page when setPage is called', async () => {
      const queryFn = createMockQueryFn({
        1: { items: ['a', 'b'], total: 6, hasMore: true },
        2: { items: ['c', 'd'], total: 6, hasMore: true },
        3: { items: ['e', 'f'], total: 6, hasMore: false },
      });

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, limit: 2 })
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.data).toEqual(['a', 'b']);

      act(() => result.current.setPage(3));

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(queryFn).toHaveBeenCalledWith(3, 2);
      expect(result.current.data).toEqual(['e', 'f']);
      expect(result.current.pagination.hasMore).toBe(false);
    });

    it('should replace data (not accumulate) on page change', async () => {
      const queryFn = createMockQueryFn({
        1: { items: ['a', 'b'], total: 4, hasMore: true },
        2: { items: ['c', 'd'], total: 4, hasMore: false },
      });

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, limit: 2 })
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.data).toEqual(['a', 'b']);

      act(() => result.current.nextPage());

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      // Data should be replaced, not accumulated
      expect(result.current.data).toEqual(['c', 'd']);
    });

    it('should navigate with nextPage and previousPage', async () => {
      const queryFn = createMockQueryFn({
        1: { items: ['a'], total: 3, hasMore: true },
        2: { items: ['b'], total: 3, hasMore: true },
        3: { items: ['c'], total: 3, hasMore: false },
      });

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, limit: 1 })
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.pagination.page).toBe(1);

      act(() => result.current.nextPage());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.pagination.page).toBe(2);
      expect(result.current.data).toEqual(['b']);

      act(() => result.current.previousPage());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.pagination.page).toBe(1);
      expect(result.current.data).toEqual(['a']);
    });
  });

  describe('error handling', () => {
    it('should set error on fetch failure', async () => {
      const queryFn = vi.fn().mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => usePaginatedQuery({ queryFn }));

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Network error');
      expect(result.current.data).toEqual([]);
    });

    it('should retry after error', async () => {
      const queryFn = vi
        .fn()
        .mockRejectedValueOnce(new Error('Fail'))
        .mockResolvedValueOnce({
          items: ['ok'],
          pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
        });

      const { result } = renderHook(() => usePaginatedQuery({ queryFn }));

      await waitFor(() => expect(result.current.error).toBe('Fail'));

      act(() => result.current.retry());

      await waitFor(() => {
        expect(result.current.error).toBeNull();
        expect(result.current.data).toEqual(['ok']);
      });
    });

    it('should not retry when there is no error', async () => {
      const queryFn = createMockQueryFn({
        1: { items: ['a'], total: 1, hasMore: false },
      });

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, limit: 1 })
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      const callCount = queryFn.mock.calls.length;

      act(() => result.current.retry());

      // Should not make additional calls since there's no error
      await new Promise((r) => setTimeout(r, 50));
      expect(queryFn.mock.calls.length).toBe(callCount);
    });
  });

  describe('refresh', () => {
    it('should re-fetch current page', async () => {
      let callCount = 0;
      const queryFn = vi.fn(async (page: number, limit: number) => {
        callCount++;
        return {
          items: [`item-${callCount}`],
          pagination: { page, limit, total: 1, totalPages: 1, hasMore: false },
        };
      });

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, limit: 1 })
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.data).toEqual(['item-1']);

      act(() => result.current.refresh());

      await waitFor(() => {
        expect(result.current.data).toEqual(['item-2']);
      });
    });
  });

  describe('callbacks', () => {
    it('should call onDataChange when data updates', async () => {
      const onDataChange = vi.fn();
      const queryFn = createMockQueryFn({
        1: { items: ['a', 'b'], total: 2, hasMore: false },
      });

      renderHook(() =>
        usePaginatedQuery({ queryFn, onDataChange })
      );

      await waitFor(() => {
        expect(onDataChange).toHaveBeenCalledWith(['a', 'b']);
      });
    });

    it('should call onError when fetch fails', async () => {
      const onError = vi.fn();
      const queryFn = vi.fn().mockRejectedValue(new Error('Bad'));

      renderHook(() => usePaginatedQuery({ queryFn, onError }));

      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(onError.mock.calls[0][0].message).toBe('Bad');
      });
    });
  });

  describe('pagination metadata', () => {
    it('should compute totalPages from API response', async () => {
      const queryFn = createMockQueryFn({
        1: { items: ['a'], total: 50, hasMore: true },
      });

      const { result } = renderHook(() =>
        usePaginatedQuery({ queryFn, limit: 10 })
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.pagination.totalPages).toBe(5);
      expect(result.current.pagination.pageSize).toBe(10);
    });

    it('should handle missing total gracefully', async () => {
      const queryFn = vi.fn(async (page: number, limit: number) => ({
        items: ['a'],
        pagination: { page, limit, hasMore: false },
      }));

      const { result } = renderHook(() => usePaginatedQuery({ queryFn }));

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.pagination.total).toBeNull();
    });
  });
});
