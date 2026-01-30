/**
 * Spinner Component Types
 */

import type { ViewStyle, StyleProp } from 'react-native';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface SpinnerProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: SpinnerSize;

  /**
   * Color scheme for the spinner
   * @default 'primary'
   */
  colorScheme?: SpinnerColorScheme;

  /**
   * Custom color (overrides colorScheme)
   */
  color?: string;

  /**
   * Additional style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Accessibility label
   * @default 'Loading'
   */
  accessibilityLabel?: string;
}
