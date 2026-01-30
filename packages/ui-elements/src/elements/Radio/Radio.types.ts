/**
 * Radio Component Types
 */

import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface RadioProps {
  /**
   * Whether this radio is selected
   * @default false
   */
  selected?: boolean;

  /**
   * Callback when radio is selected
   */
  onSelect?: () => void;

  /**
   * Whether the radio is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label text displayed next to the radio
   */
  label?: string;

  /**
   * Value of this radio option (for group management)
   */
  value?: string;

  /**
   * Size of the radio
   * @default 'md'
   */
  size?: RadioSize;

  /**
   * Color scheme
   * @default 'primary'
   */
  colorScheme?: RadioColorScheme;

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

export interface RadioGroupProps {
  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * Radio options
   */
  children: React.ReactNode;

  /**
   * Layout direction
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Gap between items
   */
  gap?: number;

  /**
   * Size for all radios
   */
  size?: RadioSize;

  /**
   * Color scheme for all radios
   */
  colorScheme?: RadioColorScheme;

  /**
   * Additional container style
   */
  style?: StyleProp<ViewStyle>;
}
