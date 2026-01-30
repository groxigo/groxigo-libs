/**
 * Style Utilities
 *
 * Utilities for creating and manipulating styles.
 */

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import type { Theme, ThemeShadow } from '../theme/types';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Create styles with theme access
 */
export function createThemedStyles<T extends NamedStyles<T>>(
  styleCreator: (theme: Theme) => T
): (theme: Theme) => T {
  // Cache for memoization
  const cache = new WeakMap<Theme, T>();

  return (theme: Theme): T => {
    if (cache.has(theme)) {
      return cache.get(theme)!;
    }

    const styles = StyleSheet.create(styleCreator(theme));
    cache.set(theme, styles);
    return styles;
  };
}

/**
 * Merge multiple style objects
 */
export function mergeStyles<T extends ViewStyle | TextStyle | ImageStyle>(
  ...styles: (T | undefined | null | false)[]
): T {
  return Object.assign({}, ...styles.filter(Boolean)) as T;
}

/**
 * Apply opacity to a color
 */
export function withOpacity(color: string, opacity: number): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle rgb colors
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }

  // Handle rgba colors
  if (color.startsWith('rgba(')) {
    return color.replace(/[\d.]+\)$/, `${opacity})`);
  }

  return color;
}

/**
 * Lighten a color
 */
export function lighten(color: string, amount: number): string {
  if (!color.startsWith('#')) return color;

  const hex = color.slice(1);
  const num = parseInt(hex, 16);

  let r = (num >> 16) + Math.round(255 * amount);
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * amount);
  let b = (num & 0x0000ff) + Math.round(255 * amount);

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Darken a color
 */
export function darken(color: string, amount: number): string {
  return lighten(color, -amount);
}

/**
 * Get contrast text color (black or white) for a background
 */
export function getContrastText(backgroundColor: string): string {
  if (!backgroundColor.startsWith('#')) return '#000000';

  const hex = backgroundColor.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Convert shadow object to web box-shadow
 */
export function shadowToBoxShadow(shadow: ThemeShadow): string {
  // If boxShadow is already defined, use it directly
  if (shadow.boxShadow) {
    return shadow.boxShadow;
  }
  const { shadowColor, shadowOffset, shadowOpacity, shadowRadius } = shadow;
  if (!shadowColor || !shadowOffset) {
    return 'none';
  }
  const color = withOpacity(shadowColor, shadowOpacity ?? 0);
  return `${shadowOffset.width}px ${shadowOffset.height}px ${shadowRadius ?? 0}px ${color}`;
}

/**
 * Create spacing helper
 */
export function createSpacing(baseUnit: number = 4) {
  return (multiplier: number): number => baseUnit * multiplier;
}

/**
 * Convert rem to pixels (for web compatibility)
 */
export function remToPx(rem: number, baseFontSize: number = 16): number {
  return rem * baseFontSize;
}

/**
 * Convert pixels to rem (for web compatibility)
 */
export function pxToRem(px: number, baseFontSize: number = 16): number {
  return px / baseFontSize;
}

/**
 * Create responsive font size
 */
export function responsiveFontSize(
  size: number,
  minSize: number,
  maxSize: number,
  screenWidth: number,
  minWidth: number = 320,
  maxWidth: number = 1200
): number {
  if (screenWidth <= minWidth) return minSize;
  if (screenWidth >= maxWidth) return maxSize;

  const ratio = (screenWidth - minWidth) / (maxWidth - minWidth);
  return minSize + ratio * (maxSize - minSize);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Create a style object for absolute positioning
 */
export function absoluteFill(): ViewStyle {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
}

/**
 * Create a style object for centering content
 */
export function center(): ViewStyle {
  return {
    alignItems: 'center',
    justifyContent: 'center',
  };
}

/**
 * Create a style object for flex row
 */
export function row(gap?: number): ViewStyle {
  return {
    flexDirection: 'row',
    alignItems: 'center',
    ...(gap !== undefined && { gap }),
  };
}

/**
 * Create a style object for flex column
 */
export function column(gap?: number): ViewStyle {
  return {
    flexDirection: 'column',
    ...(gap !== undefined && { gap }),
  };
}
