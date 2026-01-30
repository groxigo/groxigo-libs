/**
 * Spinner Component Contract
 */

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColorScheme = 'primary' | 'secondary' | 'accent' | 'white';

export interface SpinnerPropsBase {
  /** Spinner size @default 'md' */
  size?: SpinnerSize;
  /** Color scheme @default 'primary' */
  colorScheme?: SpinnerColorScheme;
  /** Direct color override */
  color?: string;
  /** Accessibility label */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}
