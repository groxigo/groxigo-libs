import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useControllable } from '../useControllable';

describe('useControllable', () => {
  describe('uncontrolled mode', () => {
    it('should use defaultValue when no value is provided', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 'initial' })
      );

      expect(result.current.value).toBe('initial');
      expect(result.current.isControlled).toBe(false);
    });

    it('should update internal state when setValue is called', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 0 })
      );

      expect(result.current.value).toBe(0);

      act(() => {
        result.current.setValue(5);
      });

      expect(result.current.value).toBe(5);
    });

    it('should support function updater for setValue', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 10 })
      );

      act(() => {
        result.current.setValue((prev) => prev + 5);
      });

      expect(result.current.value).toBe(15);
    });

    it('should call onChange callback when setValue is called', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 'test', onChange })
      );

      act(() => {
        result.current.setValue('new value');
      });

      expect(onChange).toHaveBeenCalledWith('new value');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should handle undefined defaultValue', () => {
      const { result } = renderHook(() =>
        useControllable<string | undefined>({ defaultValue: undefined })
      );

      expect(result.current.value).toBeUndefined();
      expect(result.current.isControlled).toBe(false);
    });
  });

  describe('controlled mode', () => {
    it('should use provided value and mark as controlled', () => {
      const { result } = renderHook(() =>
        useControllable({ value: 'controlled', defaultValue: 'default' })
      );

      expect(result.current.value).toBe('controlled');
      expect(result.current.isControlled).toBe(true);
    });

    it('should not update internal state when controlled', () => {
      const onChange = vi.fn();
      const { result, rerender } = renderHook(
        ({ value }) => useControllable({ value, onChange }),
        { initialProps: { value: 'initial' } }
      );

      expect(result.current.value).toBe('initial');

      act(() => {
        result.current.setValue('new value');
      });

      // Value should not change since it's controlled
      expect(result.current.value).toBe('initial');
      // But onChange should be called
      expect(onChange).toHaveBeenCalledWith('new value');

      // Update via props
      rerender({ value: 'updated from props' });
      expect(result.current.value).toBe('updated from props');
    });

    it('should call onChange with function updater result', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllable({ value: 10, onChange })
      );

      act(() => {
        result.current.setValue((prev) => prev * 2);
      });

      expect(onChange).toHaveBeenCalledWith(20);
    });

    it('should handle value of 0 as controlled', () => {
      const { result } = renderHook(() =>
        useControllable({ value: 0, defaultValue: 5 })
      );

      expect(result.current.value).toBe(0);
      expect(result.current.isControlled).toBe(true);
    });

    it('should handle empty string value as controlled', () => {
      const { result } = renderHook(() =>
        useControllable({ value: '', defaultValue: 'default' })
      );

      expect(result.current.value).toBe('');
      expect(result.current.isControlled).toBe(true);
    });

    it('should handle false value as controlled', () => {
      const { result } = renderHook(() =>
        useControllable({ value: false, defaultValue: true })
      );

      expect(result.current.value).toBe(false);
      expect(result.current.isControlled).toBe(true);
    });
  });

  describe('controlled state consistency', () => {
    it('should maintain isControlled state across renders', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useControllable({ value, defaultValue: 'default' }),
        { initialProps: { value: 'initial' as string | undefined } }
      );

      expect(result.current.isControlled).toBe(true);

      // Even if value becomes undefined, isControlled should remain true
      // (this tests the ref-based initialization)
      rerender({ value: undefined });
      expect(result.current.isControlled).toBe(true);
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const { rerender } = renderHook(
        ({ value }) => useControllable({ value, defaultValue: 'default' }),
        { initialProps: { value: 'initial' as string | undefined } }
      );

      rerender({ value: undefined });

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('controlled to uncontrolled')
      );

      process.env.NODE_ENV = originalEnv;
      warnSpy.mockRestore();
    });

    it('should warn when switching from uncontrolled to controlled', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const { rerender } = renderHook(
        ({ value }) => useControllable({ value, defaultValue: 'default' }),
        { initialProps: { value: undefined as string | undefined } }
      );

      rerender({ value: 'now controlled' });

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('uncontrolled to controlled')
      );

      process.env.NODE_ENV = originalEnv;
      warnSpy.mockRestore();
    });
  });

  describe('edge cases', () => {
    it('should handle null values', () => {
      const { result } = renderHook(() =>
        useControllable<string | null>({ value: null, defaultValue: 'default' })
      );

      expect(result.current.value).toBe(null);
      expect(result.current.isControlled).toBe(true);
    });

    it('should handle complex object values', () => {
      const initialObj = { name: 'test', count: 1 };
      const { result } = renderHook(() =>
        useControllable({ defaultValue: initialObj })
      );

      expect(result.current.value).toEqual(initialObj);

      act(() => {
        result.current.setValue({ name: 'updated', count: 2 });
      });

      expect(result.current.value).toEqual({ name: 'updated', count: 2 });
    });

    it('should handle array values', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: [1, 2, 3] })
      );

      expect(result.current.value).toEqual([1, 2, 3]);

      act(() => {
        result.current.setValue((prev) => [...prev, 4]);
      });

      expect(result.current.value).toEqual([1, 2, 3, 4]);
    });

    it('should work without onChange callback', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 'test' })
      );

      // Should not throw
      act(() => {
        result.current.setValue('new value');
      });

      expect(result.current.value).toBe('new value');
    });

    it('should handle rapid state changes', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 0, onChange })
      );

      act(() => {
        result.current.setValue(1);
        result.current.setValue(2);
        result.current.setValue(3);
      });

      expect(result.current.value).toBe(3);
      expect(onChange).toHaveBeenCalledTimes(3);
    });
  });
});
