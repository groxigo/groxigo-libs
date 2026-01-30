/**
 * Shared hooks and utilities for SearchBar component
 * Extracted common logic between mobile and web implementations
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type React from 'react';
import type { SearchBarProps } from './SearchBar.types';

export interface UseSearchBarStateProps {
  value?: string;
  placeholderSuggestions: string[];
  placeholderRotationInterval: number;
  customPlaceholder?: string;
  minSearchLength: number;
  results: any[];
  showResults?: boolean;
  maxResults: number;
}

export interface UseSearchBarStateReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  currentPlaceholderIndex: number;
  setCurrentPlaceholderIndex: (index: number | ((prev: number) => number)) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  displayPlaceholder: string;
  setDisplayPlaceholder: (placeholder: string) => void;
  currentValue: string;
  hasText: boolean;
  meetsMinLength: boolean;
  shouldShowResults: boolean;
  displayedResults: any[];
  shouldUseRotatingPlaceholder: boolean;
  focusedPlaceholder: string;
  rotatingPlaceholder: string;
}

/**
 * Shared state management hook for SearchBar
 */
export function useSearchBarState({
  value,
  placeholderSuggestions,
  placeholderRotationInterval,
  customPlaceholder,
  minSearchLength,
  results,
  showResults,
  maxResults,
}: UseSearchBarStateProps): UseSearchBarStateReturn {
  // If placeholder is explicitly set to 'Search...', treat it as undefined to enable rotation
  const effectivePlaceholder = customPlaceholder === 'Search...' ? undefined : customPlaceholder;
  
  const [searchValue, setSearchValue] = useState(value || '');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [displayPlaceholder, setDisplayPlaceholder] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Get current input value
  const currentValue = value !== undefined ? value : searchValue;
  const hasText = currentValue.length > 0;
  const meetsMinLength = currentValue.length >= minSearchLength;
  
  // Determine if results should be shown
  // Don't show if input is empty, even if results exist
  const shouldShowResults = hasText && (
    showResults !== undefined 
      ? showResults 
      : results.length > 0 && meetsMinLength
  );
  
  // Limit results to maxResults, validate results array
  const displayedResults = Array.isArray(results) 
    ? results.slice(0, Math.max(1, maxResults))
    : [];
  
  // Determine placeholder to use
  const shouldUseRotatingPlaceholder = 
    !effectivePlaceholder && 
    placeholderSuggestions.length > 0 && 
    !isFocused && 
    (value === undefined ? !searchValue : !value);

  // When focused, show a combined placeholder with all suggestions
  const focusedPlaceholder = `Search for ${placeholderSuggestions.join(', ')} and more`;
  
  const rotatingPlaceholder = isFocused && !effectivePlaceholder
    ? focusedPlaceholder
    : shouldUseRotatingPlaceholder
    ? `Search "${placeholderSuggestions[currentPlaceholderIndex]}"`
    : effectivePlaceholder || 'Search...';

  // Rotating placeholder effect
  useEffect(() => {
    if (shouldUseRotatingPlaceholder) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Start rotation immediately
      intervalRef.current = setInterval(() => {
        setCurrentPlaceholderIndex((prev) => 
          (prev + 1) % placeholderSuggestions.length
        );
      }, placeholderRotationInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [shouldUseRotatingPlaceholder, placeholderSuggestions.length, placeholderRotationInterval]);

  return {
    searchValue,
    setSearchValue,
    currentPlaceholderIndex,
    setCurrentPlaceholderIndex,
    isFocused,
    setIsFocused,
    displayPlaceholder,
    setDisplayPlaceholder,
    currentValue,
    hasText,
    meetsMinLength,
    shouldShowResults,
    displayedResults,
    shouldUseRotatingPlaceholder,
    focusedPlaceholder,
    rotatingPlaceholder,
  };
}

/**
 * Shared debounced search hook
 */
export function useDebouncedSearch(
  onSearch: SearchBarProps['onSearch'],
  debounceMs: number,
  minSearchLength: number
) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const debouncedSearch = useCallback((text: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    const timeoutId = typeof window !== 'undefined' 
      ? window.setTimeout(() => {
          if (onSearch) {
            // Only trigger search if text meets minimum length requirement
            if (text.length >= minSearchLength) {
              onSearch(text);
            } else if (text.length === 0) {
              // Clear search when input is empty
              onSearch('');
            }
          }
        }, debounceMs)
      : setTimeout(() => {
          if (onSearch) {
            if (text.length >= minSearchLength) {
              onSearch(text);
            } else if (text.length === 0) {
              onSearch('');
            }
          }
        }, debounceMs);
    
    debounceRef.current = timeoutId as any;
  }, [onSearch, debounceMs, minSearchLength]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return { debouncedSearch, debounceRef };
}

/**
 * Shared event handlers for SearchBar
 */
export function useSearchBarHandlers({
  value,
  searchValue,
  setSearchValue,
  onChangeText,
  onClear,
  onSearch,
  onBack,
  onResultSelect,
  inputProps,
  debouncedSearch,
  setIsFocused,
  debounceRef,
}: {
  value?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onChangeText?: SearchBarProps['onChangeText'];
  onClear?: SearchBarProps['onClear'];
  onSearch?: SearchBarProps['onSearch'];
  onBack?: SearchBarProps['onBack'];
  onResultSelect?: SearchBarProps['onResultSelect'];
  inputProps: any;
  debouncedSearch: (text: string) => void;
  setIsFocused: (focused: boolean) => void;
  debounceRef?: { current: ReturnType<typeof setTimeout> | null };
}) {
  const handleChangeText = useCallback((text: string) => {
    setSearchValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
    // Trigger debounced search
    debouncedSearch(text);
  }, [onChangeText, debouncedSearch, setSearchValue]);

  const handleClear = useCallback(() => {
    // Clear debounce timer if available
    if (debounceRef && debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    
    setSearchValue('');
    if (onChangeText) {
      onChangeText('');
    }
    if (onClear) {
      onClear();
    }
    if (onSearch) {
      onSearch('');
    }
  }, [onChangeText, onClear, onSearch, setSearchValue, debounceRef]);

  const handleFocus = useCallback((e: any) => {
    setIsFocused(true);
    if (inputProps.onFocus) {
      inputProps.onFocus(e);
    }
  }, [inputProps.onFocus, setIsFocused]);

  const handleBlur = useCallback((e: any) => {
    setIsFocused(false);
    if (inputProps.onBlur) {
      inputProps.onBlur(e);
    }
  }, [inputProps.onBlur, setIsFocused]);

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    }
  }, [onBack]);

  const handleResultSelect = useCallback((result: any, index: number) => {
    if (onResultSelect) {
      onResultSelect(result, index);
    }
  }, [onResultSelect]);

  return {
    handleChangeText,
    handleClear,
    handleFocus,
    handleBlur,
    handleBack,
    handleResultSelect,
  };
}

/**
 * Validate controlled/uncontrolled mode
 */
export function validateControlledMode(
  value: string | undefined,
  onChangeText: SearchBarProps['onChangeText'],
  isWeb: boolean = false
) {
  if (process.env.NODE_ENV === 'development') {
    if (value !== undefined && onChangeText === undefined) {
      if (isWeb) {
        try {
          if (typeof window !== 'undefined' && (window as any).__DEV__) {
            console.warn('SearchBar: value prop provided without onChangeText. Component should be controlled.');
          }
        } catch {
          // Silently skip if window is not available
        }
      } else {
        console.warn('SearchBar: value prop provided without onChangeText. Component should be controlled.');
      }
    }
  }
}

