/**
 * Progress Component Types
 */

import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
export type ProgressVariant = 'default' | 'striped';

export interface ProgressProps {
  /**
   * Progress value (0-100)
   * @default 0
   */
  value?: number;

  /**
   * Whether to show indeterminate progress (animated)
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Size of the progress bar
   * @default 'md'
   */
  size?: ProgressSize;

  /**
   * Color scheme
   * @default 'primary'
   */
  colorScheme?: ProgressColorScheme;

  /**
   * Progress variant
   * @default 'default'
   */
  variant?: ProgressVariant;

  /**
   * Whether to show percentage label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Border radius style
   * @default 'full'
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

  /**
   * Additional container style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional label style
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
