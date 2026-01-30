/**
 * useMediaQuery Hook
 *
 * Responsive media query hook for cross-platform use.
 * - Web: Uses window.matchMedia API
 * - React Native: Uses Dimensions API
 *
 * SSR-safe with fallback values.
 */

import { useState, useEffect, useMemo } from 'react';

/**
 * Breakpoint keys
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Media query result
 */
export interface MediaQueryResult {
  /** Whether the query matches */
  matches: boolean;
  /** The media query string */
  query: string;
}

/**
 * Breakpoint values interface
 */
export interface BreakpointValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

/**
 * Default breakpoint values (matches @groxigo/tokens)
 */
export const defaultBreakpoints: BreakpointValues = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Generate a min-width media query string
 */
export function minWidth(value: number): string {
  return `(min-width: ${value}px)`;
}

/**
 * Generate a max-width media query string
 */
export function maxWidth(value: number): string {
  return `(max-width: ${value - 1}px)`;
}

/**
 * Generate a range media query string
 */
export function between(min: number, max: number): string {
  return `(min-width: ${min}px) and (max-width: ${max - 1}px)`;
}

/**
 * Common responsive value type
 * Allows specifying different values for different breakpoints
 */
export type ResponsiveValue<T> =
  | T
  | {
      base?: T;
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      '2xl'?: T;
    };

/**
 * Get the value for the current breakpoint
 *
 * @param value - Responsive value or single value
 * @param breakpoint - Current breakpoint
 * @returns Resolved value for the breakpoint
 */
export function getResponsiveValue<T>(
  value: ResponsiveValue<T>,
  breakpoint: Breakpoint
): T | undefined {
  // If it's a primitive value, return it directly
  if (value === null || typeof value !== 'object') {
    return value;
  }

  const responsiveValue = value as Record<string, T | undefined>;

  // Breakpoint order from smallest to largest
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);

  // Find the closest defined value at or below the current breakpoint
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (responsiveValue[bp] !== undefined) {
      return responsiveValue[bp];
    }
  }

  // Fall back to base value
  return responsiveValue.base;
}

/**
 * Check if value is a responsive object
 */
export function isResponsiveValue<T>(value: ResponsiveValue<T>): value is Record<string, T> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Interface for useMediaQuery hook
 * Platform-specific implementations should follow this interface
 */
export interface UseMediaQueryOptions {
  /** Fallback value for SSR */
  fallback?: boolean;
  /** Server-side rendering */
  ssr?: boolean;
}

/**
 * Interface for useBreakpoint hook return type
 */
export interface UseBreakpointReturn {
  /** Current breakpoint name */
  breakpoint: Breakpoint;
  /** Whether current width is at least xs (always true) */
  isXs: boolean;
  /** Whether current width is at least sm */
  isSm: boolean;
  /** Whether current width is at least md */
  isMd: boolean;
  /** Whether current width is at least lg */
  isLg: boolean;
  /** Whether current width is at least xl */
  isXl: boolean;
  /** Whether current width is at least 2xl */
  is2Xl: boolean;
  /** Current window width */
  width: number;
  /** Current window height */
  height: number;
}

/**
 * Interface for useResponsiveValue hook
 */
export interface UseResponsiveValueOptions {
  /** Fallback breakpoint for SSR */
  fallback?: Breakpoint;
}

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
}

/**
 * Check if we're in a React Native environment
 */
function isReactNative(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative'
  );
}

/**
 * Get window dimensions (cross-platform)
 */
function getWindowDimensions(): { width: number; height: number } {
  if (isReactNative()) {
    // React Native - try to use Dimensions API
    try {
      // Dynamic require to avoid bundler issues on web
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { Dimensions } = require('react-native');
      const { width, height } = Dimensions.get('window');
      return { width, height };
    } catch {
      return { width: 0, height: 0 };
    }
  }

  if (isBrowser()) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  // SSR fallback
  return { width: 0, height: 0 };
}

/**
 * Hook to listen to CSS media query changes
 *
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @param options - Configuration options
 * @returns Whether the media query matches
 *
 * @example
 * ```tsx
 * function Component() {
 *   const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 *   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 *
 *   return isLargeScreen ? <DesktopView /> : <MobileView />;
 * }
 * ```
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const { fallback = false, ssr = true } = options;

  const [matches, setMatches] = useState<boolean>(() => {
    // SSR: return fallback
    if (!isBrowser()) {
      return ssr ? fallback : false;
    }

    // React Native: parse query and check dimensions
    if (isReactNative()) {
      return evaluateQueryForDimensions(query, getWindowDimensions().width);
    }

    // Browser: use matchMedia
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // React Native: use Dimensions listener
    if (isReactNative()) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { Dimensions } = require('react-native');

        const handleChange = ({ window }: { window: { width: number; height: number } }) => {
          setMatches(evaluateQueryForDimensions(query, window.width));
        };

        const subscription = Dimensions.addEventListener('change', handleChange);

        // Set initial value
        const { width } = Dimensions.get('window');
        setMatches(evaluateQueryForDimensions(query, width));

        return () => {
          if (subscription?.remove) {
            subscription.remove();
          }
        };
      } catch {
        // Dimensions not available, return fallback
        return;
      }
    }

    // Browser: use matchMedia
    if (!isBrowser()) {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Modern browsers use addEventListener
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Evaluate a media query for a given width (for React Native)
 * Supports min-width, max-width, and between queries
 */
function evaluateQueryForDimensions(query: string, width: number): boolean {
  // Parse min-width
  const minWidthMatch = query.match(/\(min-width:\s*(\d+(?:\.\d+)?)px\)/);
  const maxWidthMatch = query.match(/\(max-width:\s*(\d+(?:\.\d+)?)px\)/);

  let result = true;

  if (minWidthMatch) {
    const minWidth = parseFloat(minWidthMatch[1]);
    result = result && width >= minWidth;
  }

  if (maxWidthMatch) {
    const maxWidth = parseFloat(maxWidthMatch[1]);
    result = result && width <= maxWidth;
  }

  // If no matches, return false (query not supported)
  if (!minWidthMatch && !maxWidthMatch) {
    return false;
  }

  return result;
}

/**
 * Hook to get the current breakpoint and boolean flags
 *
 * @param breakpoints - Custom breakpoint values (defaults to standard breakpoints)
 * @returns Object with current breakpoint and boolean flags
 *
 * @example
 * ```tsx
 * function Component() {
 *   const { breakpoint, isMd, isLg } = useBreakpoint();
 *
 *   return (
 *     <div>
 *       Current breakpoint: {breakpoint}
 *       {isLg && <LargeScreenContent />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBreakpoint(
  breakpoints: BreakpointValues = defaultBreakpoints
): UseBreakpointReturn {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>(() => {
    return getWindowDimensions();
  });

  useEffect(() => {
    // React Native: use Dimensions listener
    if (isReactNative()) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { Dimensions } = require('react-native');

        const handleChange = ({ window }: { window: { width: number; height: number } }) => {
          setDimensions({ width: window.width, height: window.height });
        };

        const subscription = Dimensions.addEventListener('change', handleChange);

        // Set initial value
        const { width, height } = Dimensions.get('window');
        setDimensions({ width, height });

        return () => {
          if (subscription?.remove) {
            subscription.remove();
          }
        };
      } catch {
        return;
      }
    }

    // Browser: use resize listener
    if (!isBrowser()) {
      return;
    }

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const result = useMemo<UseBreakpointReturn>(() => {
    const { width, height } = dimensions;

    // Determine current breakpoint based on width
    let currentBreakpoint: Breakpoint = 'xs';

    if (width >= breakpoints['2xl']) {
      currentBreakpoint = '2xl';
    } else if (width >= breakpoints.xl) {
      currentBreakpoint = 'xl';
    } else if (width >= breakpoints.lg) {
      currentBreakpoint = 'lg';
    } else if (width >= breakpoints.md) {
      currentBreakpoint = 'md';
    } else if (width >= breakpoints.sm) {
      currentBreakpoint = 'sm';
    }

    return {
      breakpoint: currentBreakpoint,
      isXs: true, // Always true since xs starts at 0
      isSm: width >= breakpoints.sm,
      isMd: width >= breakpoints.md,
      isLg: width >= breakpoints.lg,
      isXl: width >= breakpoints.xl,
      is2Xl: width >= breakpoints['2xl'],
      width,
      height,
    };
  }, [dimensions, breakpoints]);

  return result;
}

/**
 * Hook to get a value based on the current breakpoint
 *
 * @param values - Responsive value (single value or object with breakpoint keys)
 * @param options - Configuration options
 * @returns The resolved value for the current breakpoint
 *
 * @example
 * ```tsx
 * function Component() {
 *   const columns = useResponsiveValue({ base: 1, sm: 2, md: 3, lg: 4 });
 *   const padding = useResponsiveValue({ base: 16, md: 24, lg: 32 });
 *
 *   return (
 *     <Grid columns={columns} style={{ padding }}>
 *       {items.map(item => <Item key={item.id} {...item} />)}
 *     </Grid>
 *   );
 * }
 * ```
 */
export function useResponsiveValue<T>(
  values: ResponsiveValue<T>,
  options: UseResponsiveValueOptions = {}
): T {
  const { fallback = 'xs' } = options;
  const { breakpoint } = useBreakpoint();

  const resolvedValue = useMemo(() => {
    // Use the current breakpoint, or fallback for SSR
    const currentBreakpoint = breakpoint || fallback;
    return getResponsiveValue(values, currentBreakpoint);
  }, [values, breakpoint, fallback]);

  // Type assertion is safe because getResponsiveValue handles the fallback logic
  return resolvedValue as T;
}

// ============================================
// DEVICE-AWARE RESPONSIVE VALUE HOOK
// ============================================

/**
 * Device category for responsive values
 */
export type DeviceCategory = 'phone' | 'tablet' | 'desktop';

/**
 * Device-aware responsive value type
 * Simpler than breakpoint-based, uses device categories
 */
export type DeviceResponsiveValue<T> =
  | T
  | {
      phone?: T;
      tablet?: T;
      desktop?: T;
    };

/**
 * Options for useDeviceResponsiveValue hook
 */
export interface UseDeviceResponsiveValueOptions {
  /** Fallback device category */
  fallback?: DeviceCategory;
}

/**
 * Get value for the current device category
 */
function getDeviceResponsiveValue<T>(
  value: DeviceResponsiveValue<T>,
  deviceType: DeviceCategory
): T | undefined {
  // If it's a primitive value, return it directly
  if (value === null || typeof value !== 'object') {
    return value;
  }

  const responsiveValue = value as Record<string, T | undefined>;

  // Device order from smallest to largest
  const deviceOrder: DeviceCategory[] = ['phone', 'tablet', 'desktop'];
  const currentIndex = deviceOrder.indexOf(deviceType);

  // Find the closest defined value at or below the current device
  for (let i = currentIndex; i >= 0; i--) {
    const device = deviceOrder[i];
    if (responsiveValue[device] !== undefined) {
      return responsiveValue[device];
    }
  }

  // No value found, return undefined
  return undefined;
}

/**
 * Determine device category from screen dimensions
 */
function getDeviceCategoryFromDimensions(width: number, height: number): DeviceCategory {
  const diagonal = Math.sqrt(width * width + height * height);

  // Thresholds match the responsive config in tokens
  if (diagonal < 600) {
    return 'phone';
  } else if (diagonal <= 1400) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Hook to get a value based on device category (phone, tablet, desktop)
 *
 * This is a simpler alternative to useResponsiveValue when you just need
 * to differentiate between phones, tablets, and desktops.
 *
 * @param values - Device responsive value (single value or object with device keys)
 * @param options - Configuration options
 * @returns The resolved value for the current device
 *
 * @example
 * ```tsx
 * function ResponsiveGrid() {
 *   const columns = useDeviceResponsiveValue({
 *     phone: 1,
 *     tablet: 2,
 *     desktop: 4,
 *   });
 *
 *   return <Grid columns={columns}>{children}</Grid>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function ResponsiveLayout() {
 *   const direction = useDeviceResponsiveValue({
 *     phone: 'column',
 *     tablet: 'row',
 *   });
 *
 *   const gap = useDeviceResponsiveValue({
 *     phone: 8,
 *     tablet: 16,
 *     desktop: 24,
 *   });
 *
 *   return (
 *     <View style={{ flexDirection: direction, gap }}>
 *       {children}
 *     </View>
 *   );
 * }
 * ```
 */
export function useDeviceResponsiveValue<T>(
  values: DeviceResponsiveValue<T>,
  options: UseDeviceResponsiveValueOptions = {}
): T {
  const { fallback = 'phone' } = options;
  const { width, height } = useBreakpoint();

  const resolvedValue = useMemo(() => {
    const deviceType = getDeviceCategoryFromDimensions(width, height);
    const currentDevice = deviceType || fallback;
    return getDeviceResponsiveValue(values, currentDevice);
  }, [values, width, height, fallback]);

  return resolvedValue as T;
}
