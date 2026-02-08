/**
 * Groxigo Design Tokens - Text Styles
 *
 * Semantic typography presets combining font size, weight, and line height.
 * These are ready-to-use text style objects for React Native StyleSheet.
 *
 * Naming convention:
 * - display: Large marketing/hero text
 * - heading (h1-h6): Section headings
 * - body: Paragraph text
 * - label: Form labels, buttons
 * - caption: Small helper text
 */

import { typography } from './typography';

/**
 * Text style definition
 */
export interface TextStyle {
  fontSize: number;
  fontWeight: 300 | 400 | 500 | 600 | 700;
  lineHeight: number;
  letterSpacing?: number;
  fontFamily?: string;
}

/**
 * Display text styles - Large marketing/hero text
 */
export const displayStyles = {
  /** Display Large - Hero text (36px, bold) */
  displayLarge: {
    fontSize: typography.fontSize['4xl'], // 36
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight, // 45
    letterSpacing: typography.letterSpacing.tight,
    fontFamily: typography.fontFamily.sansBold,
  },

  /** Display Medium - Section hero (30px, bold) */
  displayMedium: {
    fontSize: typography.fontSize['3xl'], // 30
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight, // 37.5
    letterSpacing: typography.letterSpacing.tight,
    fontFamily: typography.fontFamily.sansBold,
  },

  /** Display Small - Sub-hero (24px, semibold) */
  displaySmall: {
    fontSize: typography.fontSize['2xl'], // 24
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight, // 30
    letterSpacing: typography.letterSpacing.tight,
    fontFamily: typography.fontFamily.sansSemiBold,
  },
} as const;

/**
 * Heading text styles - Section headings
 */
export const headingStyles = {
  /** Heading 1 - Page title (24px, semibold) */
  h1: {
    fontSize: typography.fontSize['2xl'], // 24
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight, // 30
    fontFamily: typography.fontFamily.sansSemiBold,
  },

  /** Heading 2 - Section title (20px, semibold) */
  h2: {
    fontSize: typography.fontSize.xl, // 20
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight, // 25
    fontFamily: typography.fontFamily.sansSemiBold,
  },

  /** Heading 3 - Subsection title (18px, semibold) */
  h3: {
    fontSize: typography.fontSize.lg, // 18
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.lg * typography.lineHeight.tight, // 22.5
    fontFamily: typography.fontFamily.sansSemiBold,
  },

  /** Heading 4 - Card title (16px, semibold) */
  h4: {
    fontSize: typography.fontSize.base, // 16
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.base * typography.lineHeight.tight, // 20
    fontFamily: typography.fontFamily.sansSemiBold,
  },

  /** Heading 5 - Small heading (14px, semibold) */
  h5: {
    fontSize: typography.fontSize.sm, // 14
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.sm * typography.lineHeight.tight, // 17.5
    fontFamily: typography.fontFamily.sansSemiBold,
  },

  /** Heading 6 - Smallest heading (12px, semibold) */
  h6: {
    fontSize: typography.fontSize.xs, // 12
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.xs * typography.lineHeight.tight, // 15
    fontFamily: typography.fontFamily.sansSemiBold,
  },
} as const;

/**
 * Body text styles - Paragraph and content text
 */
export const bodyStyles = {
  /** Body Large - Prominent content (18px, regular) */
  bodyLarge: {
    fontSize: typography.fontSize.lg, // 18
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal, // 27
    fontFamily: typography.fontFamily.sans,
  },

  /** Body - Default content (16px, regular) */
  body: {
    fontSize: typography.fontSize.base, // 16
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal, // 24
    fontFamily: typography.fontFamily.sans,
  },

  /** Body Small - Secondary content (14px, regular) */
  bodySmall: {
    fontSize: typography.fontSize.sm, // 14
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal, // 21
    fontFamily: typography.fontFamily.sans,
  },

  /** Body Extra Small - Compact content (12px, regular) */
  bodyXs: {
    fontSize: typography.fontSize.xs, // 12
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal, // 18
    fontFamily: typography.fontFamily.sans,
  },
} as const;

/**
 * Label text styles - Form labels, buttons, navigation
 */
export const labelStyles = {
  /** Label Large - Primary buttons (16px, semibold) */
  labelLarge: {
    fontSize: typography.fontSize.base, // 16
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.base * 1, // 16 (single line)
    fontFamily: typography.fontFamily.sansSemiBold,
  },

  /** Label - Default buttons, form labels (14px, medium) */
  label: {
    fontSize: typography.fontSize.sm, // 14
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.sm * 1, // 14 (single line)
    fontFamily: typography.fontFamily.sansMedium,
  },

  /** Label Small - Secondary buttons, tags (12px, medium) */
  labelSmall: {
    fontSize: typography.fontSize.xs, // 12
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.xs * 1, // 12 (single line)
    fontFamily: typography.fontFamily.sansMedium,
  },
} as const;

/**
 * Caption text styles - Helper text, metadata
 */
export const captionStyles = {
  /** Caption - Helper text (12px, regular) */
  caption: {
    fontSize: typography.fontSize.xs, // 12
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal, // 18
    fontFamily: typography.fontFamily.sans,
  },

  /** Caption Strong - Emphasized helper text (12px, medium) */
  captionStrong: {
    fontSize: typography.fontSize.xs, // 12
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal, // 18
    fontFamily: typography.fontFamily.sansMedium,
  },

  /** Overline - Category labels, uppercase (10px, semibold) */
  overline: {
    fontSize: typography.fontSize['2xs'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize['2xs'] * typography.lineHeight.normal, // 15
    letterSpacing: typography.letterSpacing.wide,
    fontFamily: typography.fontFamily.sansSemiBold,
  },
} as const;

/**
 * Specialized text styles
 */
export const specialStyles = {
  /** Price - Product prices (16px, bold) */
  price: {
    fontSize: typography.fontSize.base, // 16
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize.base * 1, // 16 (single line)
    fontFamily: typography.fontFamily.sansBold,
  },

  /** Price Large - Featured prices (20px, bold) */
  priceLarge: {
    fontSize: typography.fontSize.xl, // 20
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize.xl * 1, // 20 (single line)
    fontFamily: typography.fontFamily.sansBold,
  },

  /** Price Small - Discounted/original prices (14px, medium) */
  priceSmall: {
    fontSize: typography.fontSize.sm, // 14
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.sm * 1, // 14 (single line)
    fontFamily: typography.fontFamily.sansMedium,
  },

  /** Badge - Badge text (10px, semibold) */
  badge: {
    fontSize: typography.fontSize['2xs'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize['2xs'] * 1, // 10 (single line)
    fontFamily: typography.fontFamily.sansSemiBold,
  },

  /** Code - Monospace text (14px, regular) */
  code: {
    fontSize: typography.fontSize.sm, // 14
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal, // 21
    fontFamily: typography.fontFamily.mono,
  },
} as const;

/**
 * Complete text styles export
 */
export const textStyles = {
  // Display
  ...displayStyles,

  // Headings
  ...headingStyles,

  // Body
  ...bodyStyles,

  // Labels
  ...labelStyles,

  // Captions
  ...captionStyles,

  // Special
  ...specialStyles,
} as const;

export type TextStyleKey = keyof typeof textStyles;

/**
 * Get text style by key
 */
export const getTextStyle = (key: TextStyleKey): TextStyle => {
  return textStyles[key] as TextStyle;
};
