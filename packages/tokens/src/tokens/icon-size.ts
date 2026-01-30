/**
 * Groxigo Design Tokens - Icon Sizes
 *
 * Standardized icon sizes based on the 4-point grid system.
 * All sizes are multiples of 4 for consistency.
 *
 * Usage:
 * - xs: Inline icons, badges
 * - sm: Secondary actions, compact UI
 * - md: Default icon size
 * - lg: Primary actions, navigation
 * - xl: Feature icons, empty states
 * - 2xl: Large feature icons
 * - 3xl: Hero/illustration icons
 */

export const iconSize = {
  /** Extra small (12px) - Inline icons, badges, indicators */
  xs: 12,

  /** Small (16px) - Compact UI, secondary actions */
  sm: 16,

  /** Medium (20px) - Default icon size for most UI */
  md: 20,

  /** Large (24px) - Primary actions, navigation, buttons */
  lg: 24,

  /** Extra large (32px) - Feature icons, prominent actions */
  xl: 32,

  /** 2XL (40px) - Large feature icons, illustrations */
  '2xl': 40,

  /** 3XL (48px) - Hero icons, large illustrations */
  '3xl': 48,

  /** 4XL (64px) - Empty state icons, large illustrations */
  '4xl': 64,
} as const;

export type IconSizeKey = keyof typeof iconSize;

/**
 * Icon container sizes (for touch targets)
 * These ensure icons have adequate touch area (minimum 44px for iOS)
 */
export const iconContainer = {
  /** Small container (32px) - Compact touch target */
  sm: 32,

  /** Medium container (40px) - Default touch target */
  md: 40,

  /** Large container (44px) - iOS minimum touch target */
  lg: 44,

  /** Extra large container (48px) - Comfortable touch target */
  xl: 48,

  /** 2XL container (56px) - Large touch target */
  '2xl': 56,
} as const;

export type IconContainerKey = keyof typeof iconContainer;

/**
 * Icon stroke widths
 */
export const iconStroke = {
  /** Thin stroke (1px) */
  thin: 1,

  /** Light stroke (1.5px) - Default for outlined icons */
  light: 1.5,

  /** Regular stroke (2px) - Default for solid icons */
  regular: 2,

  /** Medium stroke (2.5px) - Emphasized icons */
  medium: 2.5,

  /** Bold stroke (3px) - Heavy emphasis */
  bold: 3,
} as const;

export type IconStrokeKey = keyof typeof iconStroke;

/**
 * Combined icon tokens
 */
export const icon = {
  size: iconSize,
  container: iconContainer,
  stroke: iconStroke,
} as const;
