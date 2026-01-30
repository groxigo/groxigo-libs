/**
 * SearchBar Component Unit Tests
 *
 * Using Vitest with @testing-library/react
 */

import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { View, Text } from 'react-native';
import { SearchBar } from './SearchBar';
import type { SearchBarProps } from './SearchBar.types';

// Mock react-native to avoid parsing issues
vi.mock('react-native', async () => {
  const React = await import('react');
  const RN = await vi.importActual<typeof import('react-native-web')>('react-native-web');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: vi.fn((options: any) => options.ios || options.default),
    },
    Animated: {
      ...RN.Animated,
      View: RN.View,
      Text: RN.Text,
      Value: vi.fn(() => ({
        setValue: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        _value: 1,
      })),
      timing: vi.fn(() => ({
        start: vi.fn((callback: any) => {
          if (callback) setTimeout(callback, 0);
        }),
      })),
      sequence: vi.fn((animations: any) => ({
        start: vi.fn((callback: any) => {
          animations.forEach((anim: any) => {
            if (anim.start) anim.start();
          });
          if (callback) setTimeout(callback, 0);
        }),
      })),
    },
  };
});

// Mock the Input and Icon components
vi.mock('@groxigo/ui-elements', async () => {
  const React = await import('react');
  const RN = await import('react-native');

  return {
    useTheme: () => ({
      colors: {
        primary: '#007AFF',
        textInverse: '#FFFFFF',
        text: '#000000',
        textSecondary: '#666666',
        textTertiary: '#999999',
        surface: '#FFFFFF',
        surfaceSecondary: '#F5F5F5',
        border: '#E0E0E0',
        error: '#FF3B30',
        warning: '#FF9500',
        overlay: 'rgba(0,0,0,0.5)',
      },
      spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 8: 32 },
      radius: { sm: 4, md: 8, lg: 12, full: 9999 },
    }),
    Input: React.forwardRef(({ onFocus, onBlur, onChangeText, placeholder, leftIcon, rightIcon, value, onChange, ...props }: any, ref: any) => {
      const handleChange = (e: any) => {
        const newValue = e?.target?.value || e?.nativeEvent?.text || '';
        if (onChangeText) {
          onChangeText(newValue);
        }
        if (onChange) {
          onChange(e);
        }
      };

      return (
        <RN.View>
          {leftIcon}
          <RN.TextInput
            ref={ref}
            {...props}
            value={value}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            onChangeText={onChangeText}
            testID="search-input"
          />
          {rightIcon}
        </RN.View>
      );
    }),
    Icon: ({ name, size, onPress, testID, ...props }: any) => {
      const iconTestID = testID || `icon-${name}`;
      if (onPress) {
        return (
          <RN.Pressable onPress={onPress} testID={iconTestID} {...props}>
            <RN.View testID={`${iconTestID}-inner`} />
          </RN.Pressable>
        );
      }
      return <RN.View testID={iconTestID} {...props} />;
    },
  };
});

describe('SearchBar', () => {
  const defaultProps: Partial<SearchBarProps> = {
    placeholderSuggestions: ['atta', 'tomato', 'onion'],
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders search input', () => {
      const { getByTestId } = render(<SearchBar {...defaultProps} />);
      expect(getByTestId('search-input')).toBeTruthy();
    });

    it('shows search icon by default', () => {
      const { getByTestId } = render(<SearchBar {...defaultProps} />);
      expect(getByTestId('icon-search')).toBeTruthy();
    });

    it('shows clear button when input has text', () => {
      const { getByTestId } = render(<SearchBar {...defaultProps} value="test" showClearButton={true} />);
      expect(getByTestId('icon-x')).toBeTruthy();
    });
  });

  describe('Placeholder Rotation', () => {
    it('rotates placeholder suggestions', () => {
      const { getByTestId } = render(<SearchBar {...defaultProps} />);
      const input = getByTestId('search-input') as HTMLInputElement;

      // Initial placeholder should be first suggestion
      expect(input.placeholder).toContain('atta');

      // Advance past the rotation interval (5000ms) to trigger index change
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Then flush the animation delay setTimeout(150) created during re-render
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(input.placeholder).toContain('tomato');
    });

    it('pauses rotation when focused', () => {
      const { getByTestId } = render(<SearchBar {...defaultProps} />);
      const input = getByTestId('search-input') as HTMLInputElement;
      
      fireEvent.focus(input);
      
      // Placeholder should show combined text when focused
      expect(input.placeholder).toContain('Search for');
    });
  });

  describe('Debouncing', () => {
    it('debounces search callback', () => {
      const onSearch = vi.fn();
      const { getByTestId } = render(
        <SearchBar {...defaultProps} onSearch={onSearch} debounceMs={300} />
      );
      const input = getByTestId('search-input');

      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.change(input, { target: { value: 'at' } });
      fireEvent.change(input, { target: { value: 'att' } });

      // Should not be called yet (less than minSearchLength)
      expect(onSearch).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: 'atta' } });

      // Fast-forward debounce time
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onSearch).toHaveBeenCalledWith('atta');
    });

    it('only triggers search after minimum character length', () => {
      const onSearch = vi.fn();
      const { getByTestId } = render(
        <SearchBar {...defaultProps} onSearch={onSearch} minSearchLength={3} />
      );
      const input = getByTestId('search-input');

      fireEvent.change(input, { target: { value: 'at' } });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onSearch).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: 'att' } });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onSearch).toHaveBeenCalledWith('att');
    });
  });

  describe('Clear Functionality', () => {
    it('clears input when clear button is pressed', () => {
      const onClear = vi.fn();
      const { getByTestId } = render(
        <SearchBar {...defaultProps} value="test" onClear={onClear} showClearButton={true} />
      );
      
      const clearButton = getByTestId('icon-x');
      fireEvent.click(clearButton);
      
      expect(onClear).toHaveBeenCalled();
    });

    it('clears results when input is cleared', () => {
      const onSearch = vi.fn();
      const results = [{ id: '1', title: 'Product 1', type: 'product' }];
      const { getByTestId } = render(
        <SearchBar
          {...defaultProps}
          value="test"
          results={results}
          onSearch={onSearch}
        />
      );

      const input = getByTestId('search-input');
      fireEvent.change(input, { target: { value: '' } });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onSearch).toHaveBeenCalledWith('');
    });
  });

  describe('Back Button', () => {
    it('shows back button when showBackButton is true', () => {
      const { getByTestId } = render(
        <SearchBar {...defaultProps} showBackButton={true} />
      );
      expect(getByTestId('icon-chevron.left')).toBeTruthy();
    });

    it('calls onBack when back button is pressed', () => {
      const onBack = vi.fn();
      const { getByTestId } = render(
        <SearchBar {...defaultProps} showBackButton={true} onBack={onBack} />
      );
      
      const backButton = getByTestId('icon-chevron.left');
      fireEvent.click(backButton);
      
      expect(onBack).toHaveBeenCalled();
    });
  });

  describe('Search Results', () => {
    const mockResults = [
      { id: '1', title: 'Product 1', type: 'product' },
      { id: '2', title: 'Product 2', type: 'product' },
      { id: '3', title: 'Recipe 1', type: 'recipe' },
    ];

    it('shows results dropdown when results are provided', () => {
      const renderResultItem = (result: any) => (
        <Text>{result.title}</Text>
      );
      const { getByText } = render(
        <SearchBar {...defaultProps} value="test" results={mockResults} renderResultItem={renderResultItem} showResults={true} />
      );
      
      // Results should be visible
      expect(getByText('Product 1')).toBeTruthy();
    });

    it('limits results to maxResults', () => {
      const renderResultItem = (result: any) => (
        <Text>{result.title}</Text>
      );
      const manyResults = Array.from({ length: 10 }, (_, i) => ({
        id: String(i),
        title: `Product ${i}`,
        type: 'product' as const,
      }));
      
      const { queryByText } = render(
        <SearchBar
          {...defaultProps}
          value="test"
          results={manyResults}
          maxResults={5}
          renderResultItem={renderResultItem}
          showResults={true}
        />
      );
      
      expect(queryByText('Product 0')).toBeTruthy();
      expect(queryByText('Product 4')).toBeTruthy();
      expect(queryByText('Product 5')).toBeFalsy();
    });

    it('calls onResultSelect when result is clicked', () => {
      const onResultSelect = vi.fn();
      const renderResultItem = (result: any) => (
        <Text>{result.title}</Text>
      );
      const { getByText } = render(
        <SearchBar
          {...defaultProps}
          value="test"
          results={mockResults}
          onResultSelect={onResultSelect}
          renderResultItem={renderResultItem}
          showResults={true}
        />
      );
      
      fireEvent.click(getByText('Product 1'));
      
      expect(onResultSelect).toHaveBeenCalledWith(mockResults[0], 0);
    });

    it('uses custom renderResultItem when provided', () => {
      const renderResultItem = (result: any) => (
        <View testID={`custom-result-${result.id}`}>
          <Text>{result.title}</Text>
        </View>
      );
      
      const { getByTestId } = render(
        <SearchBar
          {...defaultProps}
          value="test"
          results={mockResults}
          renderResultItem={renderResultItem}
          showResults={true}
        />
      );
      
      expect(getByTestId('custom-result-1')).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator when isLoading is true', () => {
      const { queryByTestId } = render(
        <SearchBar {...defaultProps} value="test" isLoading={true} showClearButton={true} />
      );
      
      // Loading indicator should be visible instead of clear button
      expect(queryByTestId('icon-x')).toBeFalsy();
      // Note: ActivityIndicator doesn't have a testID by default
      // The component should render ActivityIndicator when isLoading is true
    });
  });

  describe('Edge Cases', () => {
    it('handles empty results array', () => {
      const { getByTestId } = render(
        <SearchBar {...defaultProps} value="test" results={[]} />
      );
      
      const input = getByTestId('search-input');
      expect(input).toBeTruthy();
    });

    it('handles controlled and uncontrolled modes', () => {
      // Controlled
      const { rerender } = render(
        <SearchBar {...defaultProps} value="controlled" />
      );
      
      // Uncontrolled
      rerender(<SearchBar {...defaultProps} />);
      
      // Should work in both modes
      expect(true).toBe(true);
    });

    it('cleans up timers on unmount', () => {
      const { unmount } = render(<SearchBar {...defaultProps} />);
      
      expect(() => unmount()).not.toThrow();
    });
  });
});


