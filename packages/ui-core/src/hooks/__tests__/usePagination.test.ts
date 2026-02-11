import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => usePagination({ total: 100 }));
      expect(result.current.page).toBe(1);
      expect(result.current.pageSize).toBe(20);
      expect(result.current.totalPages).toBe(5);
      expect(result.current.offset).toBe(0);
    });

    it('should use custom pageSize', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 100, pageSize: 10 })
      );
      expect(result.current.pageSize).toBe(10);
      expect(result.current.totalPages).toBe(10);
    });

    it('should use custom initialPage', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 100, initialPage: 3 })
      );
      expect(result.current.page).toBe(3);
      expect(result.current.offset).toBe(40);
    });

    it('should handle total of 0', () => {
      const { result } = renderHook(() => usePagination({ total: 0 }));
      expect(result.current.totalPages).toBe(0);
      expect(result.current.pageRange).toEqual([]);
      expect(result.current.isLastPage).toBe(true);
    });
  });

  describe('navigation guards', () => {
    it('should correctly report hasNextPage and hasPreviousPage', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 60, pageSize: 20 })
      );

      expect(result.current.hasNextPage).toBe(true);
      expect(result.current.hasPreviousPage).toBe(false);
      expect(result.current.isFirstPage).toBe(true);
      expect(result.current.isLastPage).toBe(false);

      act(() => result.current.setPage(3));

      expect(result.current.hasNextPage).toBe(false);
      expect(result.current.hasPreviousPage).toBe(true);
      expect(result.current.isFirstPage).toBe(false);
      expect(result.current.isLastPage).toBe(true);
    });
  });

  describe('setPage', () => {
    it('should set page to a valid value', () => {
      const { result } = renderHook(() => usePagination({ total: 100 }));

      act(() => result.current.setPage(3));
      expect(result.current.page).toBe(3);
      expect(result.current.offset).toBe(40);
    });

    it('should clamp page to 1 when set below 1', () => {
      const { result } = renderHook(() => usePagination({ total: 100 }));

      act(() => result.current.setPage(0));
      expect(result.current.page).toBe(1);

      act(() => result.current.setPage(-5));
      expect(result.current.page).toBe(1);
    });

    it('should clamp page to totalPages when set above max', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 100, pageSize: 20 })
      );

      act(() => result.current.setPage(10));
      expect(result.current.page).toBe(5);
    });
  });

  describe('nextPage / previousPage', () => {
    it('should advance to next page', () => {
      const { result } = renderHook(() => usePagination({ total: 60, pageSize: 20 }));

      act(() => result.current.nextPage());
      expect(result.current.page).toBe(2);

      act(() => result.current.nextPage());
      expect(result.current.page).toBe(3);
    });

    it('should not go past last page', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 60, pageSize: 20, initialPage: 3 })
      );

      act(() => result.current.nextPage());
      expect(result.current.page).toBe(3);
    });

    it('should go to previous page', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 60, pageSize: 20, initialPage: 3 })
      );

      act(() => result.current.previousPage());
      expect(result.current.page).toBe(2);
    });

    it('should not go before first page', () => {
      const { result } = renderHook(() => usePagination({ total: 60 }));

      act(() => result.current.previousPage());
      expect(result.current.page).toBe(1);
    });
  });

  describe('firstPage / lastPage', () => {
    it('should jump to first page', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 100, initialPage: 3 })
      );

      act(() => result.current.firstPage());
      expect(result.current.page).toBe(1);
    });

    it('should jump to last page', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 100, pageSize: 20 })
      );

      act(() => result.current.lastPage());
      expect(result.current.page).toBe(5);
    });
  });

  describe('setPageSize', () => {
    it('should change page size and reset to page 1', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 100, pageSize: 20, initialPage: 3 })
      );

      act(() => result.current.setPageSize(10));
      expect(result.current.pageSize).toBe(10);
      expect(result.current.page).toBe(1);
      expect(result.current.totalPages).toBe(10);
    });
  });

  describe('onChange callback', () => {
    it('should fire on setPage', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        usePagination({ total: 100, onChange })
      );

      act(() => result.current.setPage(3));
      expect(onChange).toHaveBeenCalledWith(3);
    });

    it('should fire on nextPage', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        usePagination({ total: 100, onChange })
      );

      act(() => result.current.nextPage());
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('should fire on previousPage', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        usePagination({ total: 100, onChange, initialPage: 3 })
      );

      act(() => result.current.previousPage());
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('should fire with clamped value on out-of-range setPage', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        usePagination({ total: 100, pageSize: 20, onChange })
      );

      act(() => result.current.setPage(100));
      expect(onChange).toHaveBeenCalledWith(5);
    });

    it('should fire on setPageSize (resets to page 1)', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        usePagination({ total: 100, initialPage: 3, onChange })
      );

      act(() => result.current.setPageSize(10));
      expect(onChange).toHaveBeenCalledWith(1);
    });
  });

  describe('pageRange', () => {
    it('should show all pages when totalPages is small', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 60, pageSize: 20 })
      );
      expect(result.current.pageRange).toEqual([1, 2, 3]);
    });

    it('should return empty array when total is 0', () => {
      const { result } = renderHook(() => usePagination({ total: 0 }));
      expect(result.current.pageRange).toEqual([]);
    });

    it('should return [1] when totalPages is 1', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 5, pageSize: 20 })
      );
      expect(result.current.pageRange).toEqual([1]);
    });

    it('should include ellipsis markers (-1) for large page counts', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 200, pageSize: 10, initialPage: 5 })
      );
      // With 20 pages, page 5, siblingCount=1: [1, -1, 4, 5, 6, -1, 20]
      expect(result.current.pageRange).toContain(-1);
      expect(result.current.pageRange[0]).toBe(1);
      expect(result.current.pageRange[result.current.pageRange.length - 1]).toBe(20);
    });

    it('should update when page changes', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 200, pageSize: 10 })
      );

      const initialRange = result.current.pageRange;

      act(() => result.current.setPage(10));

      expect(result.current.pageRange).not.toEqual(initialRange);
    });
  });

  describe('offset calculation', () => {
    it('should calculate correct offset', () => {
      const { result } = renderHook(() =>
        usePagination({ total: 100, pageSize: 20 })
      );

      expect(result.current.offset).toBe(0);

      act(() => result.current.setPage(2));
      expect(result.current.offset).toBe(20);

      act(() => result.current.setPage(5));
      expect(result.current.offset).toBe(80);
    });
  });
});
