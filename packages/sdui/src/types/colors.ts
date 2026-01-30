/**
 * SDUI Color Types
 *
 * Supports both preset color schemes and custom color overrides.
 */

/**
 * Preset color schemes
 */
export type ColorScheme =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'highlight'
  | 'sale'
  | 'new'
  | 'featured'
  | 'warning'
  | 'error'
  | 'success'
  | 'info'
  | 'muted'
  | 'holiday'
  | 'custom';

/**
 * Custom color overrides
 */
export interface CustomColors {
  /** Background color */
  background?: string;
  /** Primary text color */
  text?: string;
  /** Secondary text color */
  textSecondary?: string;
  /** Accent/highlight color */
  accent?: string;
  /** Border color */
  border?: string;
  /** Icon color */
  icon?: string;
  /** Badge background */
  badgeBackground?: string;
  /** Badge text */
  badgeText?: string;
  /** Button background */
  buttonBackground?: string;
  /** Button text */
  buttonText?: string;
  /** Overlay color */
  overlay?: string;
}

/**
 * Gradient definition
 */
export interface GradientColors {
  type: 'linear' | 'radial';
  colors: string[];
  /** Angle for linear gradient (degrees) */
  angle?: number;
  /** Locations for each color (0-1) */
  locations?: number[];
}

/**
 * Background definition - can be solid, gradient, image, or lottie
 */
export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'image' | 'lottie';
  /** For solid backgrounds */
  color?: string;
  /** For gradient backgrounds */
  gradient?: GradientColors;
  /** For image backgrounds */
  imageUrl?: string;
  /** For lottie backgrounds */
  lottieSource?: string;
  lottieLoop?: boolean;
  lottieSpeed?: number;
  /** Opacity (0-1) */
  opacity?: number;
}

/**
 * Color props that components can accept for SDUI styling
 */
export interface SDUIColorProps {
  /** Preset color scheme */
  colorScheme?: ColorScheme;
  /** Custom color overrides (used when colorScheme is 'custom' or to override preset) */
  customColors?: CustomColors;
  /** Background configuration */
  background?: BackgroundConfig;
}
