/**
 * Progress Component Contract
 *
 * Platform-agnostic interface for Progress/ProgressBar component.
 */

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
export type ProgressVariant = 'determinate' | 'indeterminate';

/**
 * Base Progress props that all platforms must support
 */
export interface ProgressPropsBase {
  /** Progress value (0-100) */
  value?: number;
  /** Minimum value @default 0 */
  min?: number;
  /** Maximum value @default 100 */
  max?: number;
  /** Progress size @default 'md' */
  size?: ProgressSize;
  /** Color scheme @default 'primary' */
  colorScheme?: ProgressColorScheme;
  /** Progress variant @default 'determinate' */
  variant?: ProgressVariant;
  /** Whether to show value label */
  showValue?: boolean;
  /** Custom value label formatter */
  formatValue?: (value: number, max: number) => string;
  /** Whether progress has stripe pattern */
  hasStripe?: boolean;
  /** Whether stripe is animated */
  isAnimated?: boolean;
  /** Border radius */
  borderRadius?: number | 'full';
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Circular Progress props
 */
export interface CircularProgressPropsBase {
  /** Progress value (0-100) */
  value?: number;
  /** Minimum value @default 0 */
  min?: number;
  /** Maximum value @default 100 */
  max?: number;
  /** Circle size in pixels @default 48 */
  size?: number;
  /** Stroke thickness @default 4 */
  thickness?: number;
  /** Color scheme @default 'primary' */
  colorScheme?: ProgressColorScheme;
  /** Progress variant @default 'determinate' */
  variant?: ProgressVariant;
  /** Track color */
  trackColor?: string;
  /** Whether to show value in center */
  showValue?: boolean;
  /** Custom value label formatter */
  formatValue?: (value: number, max: number) => string;
  /** Start angle in degrees @default -90 */
  startAngle?: number;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
