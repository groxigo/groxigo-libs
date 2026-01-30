/**
 * Tests for SearchBar shared hooks
 * These hooks are used by both mobile and web implementations
 */

import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  useSearchBarState,
  useDebouncedSearch,
  useSearchBarHandlers,
  validateControlledMode,
} from './SearchBar.hooks';
import type { SearchBarProps } from './SearchBar.types';

describe('useSearchBarState', () => {
  const defaultProps = {
    value: undefined,
    placeholderSuggestions: ['atta', 'tomato', 'onion'],
    placeholderRotationInterval: 5000,
    customPlaceholder: undefined,
    minSearchLength: 3,
    results: [],
    showResults: undefined,
    maxResults: 5,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useSearchBarState(defaultProps));

    expect(result.current.searchValue).toBe('');
    expect(result.current.currentPlaceholderIndex).toBe(0);
    expect(result.current.isFocused).toBe(false);
    expect(result.current.displayPlaceholder).toBe('');
    expect(result.current.hasText).toBe(false);
    expect(result.current.meetsMinLength).toBe(false);
    expect(result.current.shouldShowResults).toBe(false);
    expect(result.current.displayedResults).toEqual([]);
  });

  it('handles controlled value prop', () => {
    const { result } = renderHook(() =>
      useSearchBarState({ ...defaultProps, value: 'test' })
    );

    expect(result.current.currentValue).toBe('test');
    expect(result.current.hasText).toBe(true);
    expect(result.current.meetsMinLength).toBe(true);
  });

  it('calculates shouldUseRotatingPlaceholder correctly', () => {
    const { result } = renderHook(() => useSearchBarState(defaultProps));

    expect(result.current.shouldUseRotatingPlaceholder).toBe(true);
    expect(result.current.rotatingPlaceholder).toContain('atta');
  });

  it('disables rotating placeholder when custom placeholder is provided', () => {
    const { result } = renderHook(() =>
      useSearchBarState({ ...defaultProps, customPlaceholder: 'Custom placeholder' })
    );

    expect(result.current.shouldUseRotatingPlaceholder).toBe(false);
    expect(result.current.rotatingPlaceholder).toBe('Custom placeholder');
  });

  it('rotates placeholder suggestions', () => {
    const { result } = renderHook(() => useSearchBarState(defaultProps));

    expect(result.current.currentPlaceholderIndex).toBe(0);
    expect(result.current.rotatingPlaceholder).toContain('atta');

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Should have rotated to next suggestion
    expect(result.current.currentPlaceholderIndex).toBe(1);
    expect(result.current.rotatingPlaceholder).toContain('tomato');
  });

  it('calculates shouldShowResults correctly', () => {
    const { result } = renderHook(() =>
      useSearchBarState({
        ...defaultProps,
        value: 'test',
        results: [{ id: '1', title: 'Product 1' }],
      })
    );

    expect(result.current.shouldShowResults).toBe(true);
    expect(result.current.displayedResults).toHaveLength(1);
  });

  it('limits results to maxResults', () => {
    const manyResults = Array.from({ length: 10 }, (_, i) => ({
      id: String(i),
      title: `Product ${i}`,
    }));

    const { result } = renderHook(() =>
      useSearchBarState({
        ...defaultProps,
        value: 'test',
        results: manyResults,
        maxResults: 5,
      })
    );

    expect(result.current.displayedResults).toHaveLength(5);
  });

  it('shows focused placeholder when focused', () => {
    const { result } = renderHook(() => useSearchBarState(defaultProps));

    act(() => {
      result.current.setIsFocused(true);
    });

    expect(result.current.isFocused).toBe(true);
    expect(result.current.rotatingPlaceholder).toContain('Search for');
  });
});

describe('useDebouncedSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('debounces search calls', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedSearch(onSearch, 300, 3)
    );

    act(() => {
      result.current.debouncedSearch('a');
      result.current.debouncedSearch('at');
      result.current.debouncedSearch('att');
    });

    // Should not be called yet (less than minSearchLength)
    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      result.current.debouncedSearch('atta');
    });

    // Fast-forward debounce time
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('atta');
  });

  it('only triggers search after minimum character length', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedSearch(onSearch, 300, 3)
    );

    act(() => {
      result.current.debouncedSearch('at');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      result.current.debouncedSearch('att');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenCalledWith('att');
  });

  it('clears search when input is empty', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedSearch(onSearch, 300, 3)
    );

    act(() => {
      result.current.debouncedSearch('');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('cancels previous debounce when new search is triggered', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedSearch(onSearch, 300, 3)
    );

    act(() => {
      result.current.debouncedSearch('att');
    });

    // Trigger another search before debounce completes
    act(() => {
      vi.advanceTimersByTime(150);
      result.current.debouncedSearch('atta');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should only be called once with the latest value
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('atta');
  });
});

describe('useSearchBarHandlers', () => {
  it('calls onChangeText when handleChangeText is called', () => {
    const onChangeText = vi.fn();
    const debouncedSearch = vi.fn();
    const setSearchValue = vi.fn();

    const { result } = renderHook(() =>
      useSearchBarHandlers({
        value: undefined,
        searchValue: '',
        setSearchValue,
        onChangeText,
        onClear: undefined,
        onSearch: undefined,
        onBack: undefined,
        onResultSelect: undefined,
        inputProps: {},
        debouncedSearch,
        setIsFocused: vi.fn(),
      })
    );

    act(() => {
      result.current.handleChangeText('test');
    });

    expect(setSearchValue).toHaveBeenCalledWith('test');
    expect(onChangeText).toHaveBeenCalledWith('test');
    expect(debouncedSearch).toHaveBeenCalledWith('test');
  });

  it('calls onClear when handleClear is called', () => {
    const onClear = vi.fn();
    const onChangeText = vi.fn();
    const onSearch = vi.fn();
    const setSearchValue = vi.fn();

    const { result } = renderHook(() =>
      useSearchBarHandlers({
        value: undefined,
        searchValue: 'test',
        setSearchValue,
        onChangeText,
        onClear,
        onSearch,
        onBack: undefined,
        onResultSelect: undefined,
        inputProps: {},
        debouncedSearch: vi.fn(),
        setIsFocused: vi.fn(),
      })
    );

    act(() => {
      result.current.handleClear();
    });

    expect(setSearchValue).toHaveBeenCalledWith('');
    expect(onChangeText).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('calls onBack when handleBack is called', () => {
    const onBack = vi.fn();

    const { result } = renderHook(() =>
      useSearchBarHandlers({
        value: undefined,
        searchValue: '',
        setSearchValue: vi.fn(),
        onChangeText: undefined,
        onClear: undefined,
        onSearch: undefined,
        onBack,
        onResultSelect: undefined,
        inputProps: {},
        debouncedSearch: vi.fn(),
        setIsFocused: vi.fn(),
      })
    );

    act(() => {
      result.current.handleBack();
    });

    expect(onBack).toHaveBeenCalled();
  });

  it('calls onResultSelect when handleResultSelect is called', () => {
    const onResultSelect = vi.fn();
    const mockResult = { id: '1', title: 'Product 1' };

    const { result } = renderHook(() =>
      useSearchBarHandlers({
        value: undefined,
        searchValue: '',
        setSearchValue: vi.fn(),
        onChangeText: undefined,
        onClear: undefined,
        onSearch: undefined,
        onBack: undefined,
        onResultSelect,
        inputProps: {},
        debouncedSearch: vi.fn(),
        setIsFocused: vi.fn(),
      })
    );

    act(() => {
      result.current.handleResultSelect(mockResult, 0);
    });

    expect(onResultSelect).toHaveBeenCalledWith(mockResult, 0);
  });

  it('calls inputProps callbacks when handleFocus/handleBlur are called', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const setIsFocused = vi.fn();

    const { result } = renderHook(() =>
      useSearchBarHandlers({
        value: undefined,
        searchValue: '',
        setSearchValue: vi.fn(),
        onChangeText: undefined,
        onClear: undefined,
        onSearch: undefined,
        onBack: undefined,
        onResultSelect: undefined,
        inputProps: { onFocus, onBlur },
        debouncedSearch: vi.fn(),
        setIsFocused,
      })
    );

    const focusEvent = {} as any;
    act(() => {
      result.current.handleFocus(focusEvent);
    });

    expect(setIsFocused).toHaveBeenCalledWith(true);
    expect(onFocus).toHaveBeenCalledWith(focusEvent);

    const blurEvent = {} as any;
    act(() => {
      result.current.handleBlur(blurEvent);
    });

    expect(setIsFocused).toHaveBeenCalledWith(false);
    expect(onBlur).toHaveBeenCalledWith(blurEvent);
  });
});

describe('validateControlledMode', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalWarn = console.warn;

  beforeEach(() => {
    console.warn = vi.fn();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    console.warn = originalWarn;
  });

  it('warns in development when value is provided without onChangeText', () => {
    process.env.NODE_ENV = 'development';

    validateControlledMode('test', undefined, false);

    expect(console.warn).toHaveBeenCalledWith(
      'SearchBar: value prop provided without onChangeText. Component should be controlled.'
    );
  });

  it('does not warn in production', () => {
    process.env.NODE_ENV = 'production';

    validateControlledMode('test', undefined, false);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('does not warn when onChangeText is provided', () => {
    process.env.NODE_ENV = 'development';

    validateControlledMode('test', vi.fn(), false);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('does not warn when value is undefined', () => {
    process.env.NODE_ENV = 'development';

    validateControlledMode(undefined, undefined, false);

    expect(console.warn).not.toHaveBeenCalled();
  });
});

