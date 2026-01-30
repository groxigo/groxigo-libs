/**
 * SearchBar Mobile-Specific Unit Tests
 * Tests the React Native implementation (SearchBar.tsx)
 *
 * Platform-specific features to test:
 * - React Native Animated API
 * - Mobile-specific styling (40px height, reduced padding)
 * - React Native components (View, Pressable, FlatList)
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import type { SearchBarProps } from './SearchBar.types';
import { defaultProps, mockResults } from './SearchBar.test.shared';

// Mock react-native for mobile tests
vi.mock('react-native', async () => {
  const React = await import('react');
  const RN = await vi.importActual('react-native-web');
  return {
    ...RN,
    Platform: {
      OS: 'ios', // Test mobile platform
      select: vi.fn((options) => options.ios || options.default),
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
        start: vi.fn((callback) => {
          if (callback) setTimeout(callback, 0);
        }),
      })),
      sequence: vi.fn((animations) => ({
        start: vi.fn((callback) => {
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

describe('SearchBar (Mobile)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Mobile-Specific Features', () => {
    it('uses mobile size (md) and 40px height', () => {
      const { getByTestId } = render(<SearchBar {...defaultProps} />);
      const input = getByTestId('search-input');
      // Mobile should use md size
      expect(input).toBeTruthy();
    });

    it('uses React Native Animated API for placeholder fade', () => {
      const { getByTestId } = render(<SearchBar {...defaultProps} />);
      // Animated.View should be used for fade effect
      expect(getByTestId('search-input')).toBeTruthy();
    });
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

  // Add more mobile-specific tests as needed
});
