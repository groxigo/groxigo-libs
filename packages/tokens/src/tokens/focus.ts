/**
 * Groxigo Design Tokens - Focus
 *
 * Focus ring tokens for accessibility and keyboard navigation.
 * These ensure consistent, visible focus indicators across the application.
 *
 * WCAG 2.1 Requirements:
 * - Focus indicators must be visible
 * - Must have sufficient contrast (3:1 minimum)
 * - Should not rely solely on color
 */

import { primitives } from './colors';

/**
 * Focus ring widths
 */
export const focusRingWidth = {
  /** Thin focus ring (2px) - Subtle focus indication */
  thin: 2,

  /** Default focus ring (3px) - Standard focus indication */
  default: 3,

  /** Thick focus ring (4px) - High visibility focus */
  thick: 4,
} as const;

export type FocusRingWidthKey = keyof typeof focusRingWidth;

/**
 * Focus ring offsets (gap between element and ring)
 */
export const focusRingOffset = {
  /** No offset - Ring touches element */
  none: 0,

  /** Tight offset (1px) */
  tight: 1,

  /** Default offset (2px) */
  default: 2,

  /** Spacious offset (3px) */
  spacious: 3,
} as const;

export type FocusRingOffsetKey = keyof typeof focusRingOffset;

/**
 * Focus ring colors - Light mode
 */
export const focusRingColors = {
  /** Primary focus color - Blue (default) */
  primary: primitives.blue[500],

  /** Primary focus ring shadow */
  primaryRing: `0 0 0 ${focusRingWidth.default}px ${primitives.blue[500]}`,

  /** Primary focus with offset */
  primaryWithOffset: `0 0 0 ${focusRingOffset.default}px ${primitives.white}, 0 0 0 ${focusRingOffset.default + focusRingWidth.default}px ${primitives.blue[500]}`,

  /** Error/danger focus color */
  error: primitives.red[500],

  /** Error focus ring shadow */
  errorRing: `0 0 0 ${focusRingWidth.default}px ${primitives.red[500]}`,

  /** Success focus color */
  success: primitives.green[500],

  /** Success focus ring shadow */
  successRing: `0 0 0 ${focusRingWidth.default}px ${primitives.green[500]}`,

  /** Neutral/secondary focus color */
  neutral: primitives.gray[500],

  /** Neutral focus ring shadow */
  neutralRing: `0 0 0 ${focusRingWidth.default}px ${primitives.gray[500]}`,

  /** Inverse focus (for dark backgrounds) */
  inverse: primitives.white,

  /** Inverse focus ring shadow */
  inverseRing: `0 0 0 ${focusRingWidth.default}px ${primitives.white}`,
} as const;

/**
 * Focus ring colors - Dark mode
 */
export const focusRingColorsDark = {
  /** Primary focus color - Blue (lighter for dark mode) */
  primary: primitives.blue[400],

  /** Primary focus ring shadow */
  primaryRing: `0 0 0 ${focusRingWidth.default}px ${primitives.blue[400]}`,

  /** Primary focus with offset */
  primaryWithOffset: `0 0 0 ${focusRingOffset.default}px ${primitives.gray[900]}, 0 0 0 ${focusRingOffset.default + focusRingWidth.default}px ${primitives.blue[400]}`,

  /** Error/danger focus color */
  error: primitives.red[400],

  /** Error focus ring shadow */
  errorRing: `0 0 0 ${focusRingWidth.default}px ${primitives.red[400]}`,

  /** Success focus color */
  success: primitives.green[400],

  /** Success focus ring shadow */
  successRing: `0 0 0 ${focusRingWidth.default}px ${primitives.green[400]}`,

  /** Neutral/secondary focus color */
  neutral: primitives.gray[400],

  /** Neutral focus ring shadow */
  neutralRing: `0 0 0 ${focusRingWidth.default}px ${primitives.gray[400]}`,

  /** Inverse focus (for light elements on dark bg) */
  inverse: primitives.gray[900],

  /** Inverse focus ring shadow */
  inverseRing: `0 0 0 ${focusRingWidth.default}px ${primitives.gray[900]}`,
} as const;

/**
 * Focus ring style presets
 */
export const focusRingStyle = {
  /** Default focus ring - primary color, default width */
  default: {
    outlineWidth: focusRingWidth.default,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColors.primary,
    outlineOffset: focusRingOffset.default,
  },

  /** Thin focus ring */
  thin: {
    outlineWidth: focusRingWidth.thin,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColors.primary,
    outlineOffset: focusRingOffset.tight,
  },

  /** Thick focus ring - high visibility */
  thick: {
    outlineWidth: focusRingWidth.thick,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColors.primary,
    outlineOffset: focusRingOffset.default,
  },

  /** Inset focus ring - no offset */
  inset: {
    outlineWidth: focusRingWidth.default,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColors.primary,
    outlineOffset: focusRingOffset.none,
  },

  /** Error focus ring */
  error: {
    outlineWidth: focusRingWidth.default,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColors.error,
    outlineOffset: focusRingOffset.default,
  },
} as const;

/**
 * Focus ring style presets - Dark mode
 */
export const focusRingStyleDark = {
  /** Default focus ring - primary color, default width */
  default: {
    outlineWidth: focusRingWidth.default,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColorsDark.primary,
    outlineOffset: focusRingOffset.default,
  },

  /** Thin focus ring */
  thin: {
    outlineWidth: focusRingWidth.thin,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColorsDark.primary,
    outlineOffset: focusRingOffset.tight,
  },

  /** Thick focus ring - high visibility */
  thick: {
    outlineWidth: focusRingWidth.thick,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColorsDark.primary,
    outlineOffset: focusRingOffset.default,
  },

  /** Inset focus ring - no offset */
  inset: {
    outlineWidth: focusRingWidth.default,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColorsDark.primary,
    outlineOffset: focusRingOffset.none,
  },

  /** Error focus ring */
  error: {
    outlineWidth: focusRingWidth.default,
    outlineStyle: 'solid' as const,
    outlineColor: focusRingColorsDark.error,
    outlineOffset: focusRingOffset.default,
  },
} as const;

/**
 * Combined focus tokens
 */
export const focus = {
  width: focusRingWidth,
  offset: focusRingOffset,
  colors: focusRingColors,
  colorsDark: focusRingColorsDark,
  style: focusRingStyle,
  styleDark: focusRingStyleDark,
} as const;

/**
 * Get focus ring CSS box-shadow for web
 * @param color - Focus ring color
 * @param width - Ring width in pixels
 * @param offset - Offset from element in pixels
 */
export const getFocusRingShadow = (
  color: string = focusRingColors.primary,
  width: number = focusRingWidth.default,
  offset: number = focusRingOffset.default
): string => {
  if (offset > 0) {
    return `0 0 0 ${offset}px ${primitives.white}, 0 0 0 ${offset + width}px ${color}`;
  }
  return `0 0 0 ${width}px ${color}`;
};
