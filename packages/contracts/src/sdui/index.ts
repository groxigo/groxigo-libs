/**
 * SDUI Types for Contracts
 *
 * These types enable server-driven UI styling for components.
 */

// Component catalog
export * from './components';

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
  background?: string;
  text?: string;
  textSecondary?: string;
  accent?: string;
  border?: string;
  icon?: string;
  badgeBackground?: string;
  badgeText?: string;
  buttonBackground?: string;
  buttonText?: string;
}

/**
 * Background configuration
 */
export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'image' | 'lottie';
  color?: string;
  colors?: string[];
  angle?: number;
  imageUrl?: string;
  lottieSource?: string;
  lottieLoop?: boolean;
  lottieSpeed?: number;
  opacity?: number;
}

// Note: LottieSource and LottiePropsBase are exported from '../animation'
// Import them from there to avoid duplication

/**
 * SDUI styling props - add to component props for SDUI support
 */
export interface SDUIStyleProps {
  /** Preset color scheme */
  colorScheme?: ColorScheme;
  /** Custom color overrides */
  customColors?: CustomColors;
  /** Background configuration */
  background?: BackgroundConfig;
}
