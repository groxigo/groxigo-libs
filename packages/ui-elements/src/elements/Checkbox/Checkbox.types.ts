/**
 * Checkbox Component Types
 */

import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback when checkbox state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate?: boolean;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label text displayed next to the checkbox
   */
  label?: string;

  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Color scheme for the checkbox
   * @default 'primary'
   */
  colorScheme?: CheckboxColorScheme;

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
