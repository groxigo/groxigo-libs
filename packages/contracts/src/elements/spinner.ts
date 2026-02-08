/**
 * Spinner Component Contract
 */

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface SpinnerPropsBase {
  /** Spinner size @default 'md' */
  size?: SpinnerSize;
  /** Direct color override */
  color?: string;
  /** Accessibility label */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}
