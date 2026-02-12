/**
 * Progress Component Contract
 *
 * Platform-agnostic interface for Progress/ProgressBar component.
 */

export type ProgressSize = 'xs' | 'sm' | 'md';
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
  /** Test ID for testing */
  testID?: string;
}
