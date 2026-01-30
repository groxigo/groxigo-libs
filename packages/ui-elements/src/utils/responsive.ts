/**
 * Responsive Utilities
 *
 * Utilities for building responsive layouts.
 * Platform-agnostic - works on iOS, Android, and Web.
 */

import { Platform, Dimensions, ScaledSize } from 'react-native';
import type { Breakpoint, ThemeBreakpoints, ResponsiveValue } from '../theme/types';

// ============================================
// TYPES
// ============================================

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PlatformType = 'ios' | 'android' | 'web' | 'native';

// ============================================
// DEFAULT BREAKPOINTS
// ============================================

/**
 * Default breakpoints (matches Tailwind CSS)
 */
export const defaultBreakpoints: ThemeBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// ============================================
// SCREEN DIMENSIONS
// ============================================

/**
 * Get current screen dimensions
 */
export function getScreenDimensions(): ScaledSize {
  return Dimensions.get('window');
}

/**
 * Check if device is in portrait mode
 */
export function isPortrait(): boolean {
  const { width, height } = getScreenDimensions();
  return height >= width;
}

/**
 * Check if device is in landscape mode
 */
export function isLandscape(): boolean {
  return !isPortrait();
}

/**
 * Get aspect ratio of the screen
 */
export function getAspectRatio(): number {
  const { width, height } = getScreenDimensions();
  return width / height;
}

// ============================================
// BREAKPOINT UTILITIES
// ============================================

/**
 * Get current breakpoint based on screen width
 */
export function getCurrentBreakpoint(
  width?: number,
  breakpoints: ThemeBreakpoints = defaultBreakpoints
): Breakpoint {
  const screenWidth = width ?? getScreenDimensions().width;

  if (screenWidth >= breakpoints['2xl']) return '2xl';
  if (screenWidth >= breakpoints.xl) return 'xl';
  if (screenWidth >= breakpoints.lg) return 'lg';
  if (screenWidth >= breakpoints.md) return 'md';
  if (screenWidth >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * Check if screen width is at least a breakpoint
 */
export function isBreakpointUp(
  breakpoint: Breakpoint,
  width?: number,
  breakpoints: ThemeBreakpoints = defaultBreakpoints
): boolean {
  const screenWidth = width ?? getScreenDimensions().width;
  return screenWidth >= breakpoints[breakpoint];
}

/**
 * Check if screen width is below a breakpoint
 */
export function isBreakpointDown(
  breakpoint: Breakpoint,
  width?: number,
  breakpoints: ThemeBreakpoints = defaultBreakpoints
): boolean {
  const screenWidth = width ?? getScreenDimensions().width;
  return screenWidth < breakpoints[breakpoint];
}

/**
 * Check if screen width is between two breakpoints
 */
export function isBreakpointBetween(
  start: Breakpoint,
  end: Breakpoint,
  width?: number,
  breakpoints: ThemeBreakpoints = defaultBreakpoints
): boolean {
  const screenWidth = width ?? getScreenDimensions().width;
  return screenWidth >= breakpoints[start] && screenWidth < breakpoints[end];
}

// ============================================
// RESPONSIVE VALUES
// ============================================

/**
 * Resolve a responsive value based on current breakpoint
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  defaultValue: T,
  width?: number,
  breakpoints: ThemeBreakpoints = defaultBreakpoints
): T {
  // If not a responsive object, return as-is
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  const responsiveValue = value as Partial<Record<Breakpoint, T>>;
  const currentBreakpoint = getCurrentBreakpoint(width, breakpoints);

  // Order from smallest to largest (mobile-first)
  const orderedBreakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = orderedBreakpoints.indexOf(currentBreakpoint);

  // Look for value at current breakpoint or smaller (mobile-first)
  for (let i = currentIndex; i >= 0; i--) {
    const bp = orderedBreakpoints[i];
    if (responsiveValue[bp] !== undefined) {
      return responsiveValue[bp] as T;
    }
  }

  return defaultValue;
}

/**
 * Create a responsive object
 */
export function responsive<T>(values: Partial<Record<Breakpoint, T>>): ResponsiveValue<T> {
  return values;
}

// ============================================
// SCALING UTILITIES
// ============================================

/**
 * Scale a value based on screen width
 */
export function scaleWidth(
  value: number,
  baseWidth: number = 375 // iPhone standard width
): number {
  const { width } = getScreenDimensions();
  return (width / baseWidth) * value;
}

/**
 * Scale a value based on screen height
 */
export function scaleHeight(
  value: number,
  baseHeight: number = 812 // iPhone X height
): number {
  const { height } = getScreenDimensions();
  return (height / baseHeight) * value;
}

/**
 * Moderate scale - a balanced approach between fixed and scaled
 */
export function moderateScale(
  value: number,
  factor: number = 0.5,
  baseWidth: number = 375
): number {
  const { width } = getScreenDimensions();
  const scaleFactor = width / baseWidth;
  return value + (value * (scaleFactor - 1) * factor);
}

// ============================================
// GRID UTILITIES
// ============================================

/**
 * Calculate number of columns for a grid based on screen width
 */
export function getGridColumns(
  options: Partial<Record<Breakpoint, number>>,
  width?: number,
  breakpoints: ThemeBreakpoints = defaultBreakpoints
): number {
  const screenWidth = width ?? getScreenDimensions().width;
  const currentBreakpoint = getCurrentBreakpoint(screenWidth, breakpoints);

  const orderedBreakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = orderedBreakpoints.indexOf(currentBreakpoint);

  // Find value for current breakpoint or smaller
  for (let i = currentIndex; i >= 0; i--) {
    const bp = orderedBreakpoints[i];
    if (options[bp] !== undefined) {
      return options[bp]!;
    }
  }

  return 1; // Default to 1 column
}

/**
 * Calculate item width for a grid
 */
export function getGridItemWidth(
  columns: number,
  gap: number = 0,
  containerWidth?: number
): number {
  const width = containerWidth ?? getScreenDimensions().width;
  const totalGap = gap * (columns - 1);
  return (width - totalGap) / columns;
}

// ============================================
// COMPONENT SIZE UTILITIES
// ============================================

/**
 * Size scales for components (8px grid aligned)
 */
export const componentSizes = {
  height: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  },
  padding: {
    xs: { h: 8, v: 4 },
    sm: { h: 12, v: 6 },
    md: { h: 16, v: 8 },
    lg: { h: 20, v: 10 },
    xl: { h: 24, v: 12 },
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  iconSize: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  },
  borderRadius: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

/**
 * Get component height for a size
 */
export function getComponentHeight(size: ComponentSize): number {
  return componentSizes.height[size];
}

/**
 * Get component padding for a size
 */
export function getComponentPadding(size: ComponentSize): { h: number; v: number } {
  return componentSizes.padding[size];
}

/**
 * Get font size for a component size
 */
export function getComponentFontSize(size: ComponentSize): number {
  return componentSizes.fontSize[size];
}

/**
 * Get icon size for a component size
 */
export function getComponentIconSize(size: ComponentSize): number {
  return componentSizes.iconSize[size];
}

/**
 * Get border radius for a component size
 */
export function getComponentBorderRadius(size: ComponentSize): number {
  return componentSizes.borderRadius[size];
}

// ============================================
// PLATFORM UTILITIES
// ============================================

/**
 * Check if current platform is web
 */
export function isWebPlatform(): boolean {
  return Platform.OS === 'web';
}

/**
 * Check if current platform is mobile (iOS or Android)
 */
export function isMobilePlatform(): boolean {
  return Platform.OS === 'ios' || Platform.OS === 'android';
}

/**
 * Get current platform type
 */
export function getPlatformType(): PlatformType {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  if (Platform.OS === 'web') return 'web';
  return 'native';
}

/**
 * Get platform-adjusted value (web typically needs slightly larger touch targets)
 */
export function getPlatformValue<T>(values: {
  mobile?: T;
  web?: T;
  default: T;
}): T {
  if (isWebPlatform() && values.web !== undefined) {
    return values.web;
  }
  if (isMobilePlatform() && values.mobile !== undefined) {
    return values.mobile;
  }
  return values.default;
}

// ============================================
// LAYOUT UTILITIES
// ============================================

/**
 * Get container max width based on breakpoint
 */
export function getContainerMaxWidth(
  breakpoint?: Breakpoint,
  breakpoints: ThemeBreakpoints = defaultBreakpoints
): number | undefined {
  const bp = breakpoint ?? getCurrentBreakpoint(undefined, breakpoints);

  const maxWidths: Partial<Record<Breakpoint, number>> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  return maxWidths[bp];
}

/**
 * Get container padding based on screen size
 */
export function getContainerPadding(width?: number): number {
  const screenWidth = width ?? getScreenDimensions().width;

  if (screenWidth >= 1280) return 32; // xl+
  if (screenWidth >= 1024) return 24; // lg
  if (screenWidth >= 768) return 20;  // md
  if (screenWidth >= 640) return 16;  // sm
  return 16; // xs
}

/**
 * Get spacing between sections based on screen size
 */
export function getSectionSpacing(width?: number): number {
  const screenWidth = width ?? getScreenDimensions().width;

  if (screenWidth >= 1024) return 48; // lg+
  if (screenWidth >= 768) return 40;  // md
  return 32; // sm and below
}

/**
 * Get gap for component groups based on screen size
 */
export function getComponentGap(width?: number): number {
  const screenWidth = width ?? getScreenDimensions().width;

  if (screenWidth >= 1024) return 16; // lg+
  if (screenWidth >= 768) return 12;  // md
  return 8; // sm and below
}
