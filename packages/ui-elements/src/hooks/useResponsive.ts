/**
 * useResponsive Hook
 *
 * Provides responsive utilities for building adaptive layouts.
 * Works across iOS, Android, and Web.
 */

import { useState, useEffect, useCallback } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useTheme } from './useTheme';
import type { Breakpoint, ResponsiveValue, ResponsiveInfo } from '../theme/types';

/**
 * Get the current window dimensions
 */
function getWindowDimensions() {
  const { width, height } = Dimensions.get('window');
  return { width, height };
}

/**
 * Hook to get current window dimensions with updates
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
}

/**
 * Hook to get current breakpoint and responsive info
 */
export function useResponsive(): ResponsiveInfo {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const breakpoints = theme.breakpoints;

  // Determine current breakpoint
  const getBreakpoint = (): Breakpoint => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const breakpoint = getBreakpoint();

  return {
    breakpoint,
    width,
    height,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2xl: breakpoint === '2xl',
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
}

/**
 * Hook to get responsive value based on current breakpoint
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T>, defaultValue: T): T {
  const { breakpoint } = useResponsive();
  const theme = useTheme();
  const breakpoints = theme.breakpoints;

  // If not a responsive object, return as-is
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  const responsiveValue = value as Partial<Record<Breakpoint, T>>;

  // Order of breakpoints from largest to smallest
  const orderedBreakpoints: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];

  // Find the current breakpoint index
  const currentIndex = orderedBreakpoints.indexOf(breakpoint);

  // Look for value at current breakpoint or smaller
  for (let i = currentIndex; i < orderedBreakpoints.length; i++) {
    const bp = orderedBreakpoints[i];
    if (responsiveValue[bp] !== undefined) {
      return responsiveValue[bp] as T;
    }
  }

  // Look for value at larger breakpoints
  for (let i = currentIndex - 1; i >= 0; i--) {
    const bp = orderedBreakpoints[i];
    if (responsiveValue[bp] !== undefined) {
      return responsiveValue[bp] as T;
    }
  }

  return defaultValue;
}

/**
 * Hook to get responsive styles
 */
export function useResponsiveStyles<T extends object>(
  styles: ResponsiveValue<T>,
  defaultStyles: T
): T {
  return useResponsiveValue(styles, defaultStyles);
}

/**
 * Hook to check if screen matches a breakpoint query
 */
export function useBreakpoint() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const breakpoints = theme.breakpoints;

  const isUp = useCallback(
    (breakpoint: Breakpoint): boolean => {
      return width >= breakpoints[breakpoint];
    },
    [width, breakpoints]
  );

  const isDown = useCallback(
    (breakpoint: Breakpoint): boolean => {
      return width < breakpoints[breakpoint];
    },
    [width, breakpoints]
  );

  const isBetween = useCallback(
    (start: Breakpoint, end: Breakpoint): boolean => {
      return width >= breakpoints[start] && width < breakpoints[end];
    },
    [width, breakpoints]
  );

  const isOnly = useCallback(
    (breakpoint: Breakpoint): boolean => {
      const orderedBreakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      const index = orderedBreakpoints.indexOf(breakpoint);
      const nextBreakpoint = orderedBreakpoints[index + 1];

      if (!nextBreakpoint) {
        return width >= breakpoints[breakpoint];
      }

      return width >= breakpoints[breakpoint] && width < breakpoints[nextBreakpoint];
    },
    [width, breakpoints]
  );

  return { isUp, isDown, isBetween, isOnly };
}

/**
 * Hook to get platform-specific values
 */
export function usePlatformValue<T>(values: {
  ios?: T;
  android?: T;
  web?: T;
  native?: T;
  default: T;
}): T {
  if (Platform.OS === 'ios' && values.ios !== undefined) {
    return values.ios;
  }
  if (Platform.OS === 'android' && values.android !== undefined) {
    return values.android;
  }
  if (Platform.OS === 'web' && values.web !== undefined) {
    return values.web;
  }
  if (Platform.OS !== 'web' && values.native !== undefined) {
    return values.native;
  }
  return values.default;
}

export default useResponsive;
