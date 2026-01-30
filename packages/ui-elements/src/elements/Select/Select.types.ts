/**
 * Select Component Types
 */

import type { ViewProps, ViewStyle, TextStyle, StyleProp } from 'react-native';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';
export type SelectColorScheme = 'primary' | 'secondary' | 'accent' | 'neutral';

export interface SelectOption {
  /**
   * Display label for the option
   */
  label: string;

  /**
   * Value of the option
   */
  value: string | number;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;

  /**
   * Icon to display before the label (optional)
   */
  icon?: React.ReactNode;
}

export interface SelectProps extends Omit<ViewProps, 'style'> {
  /**
   * Size of the select
   * @default 'md'
   */
  size?: SelectSize;

  /**
   * Visual variant
   * @default 'outline'
   */
  variant?: SelectVariant;

  /**
   * Color scheme
   * @default 'primary'
   */
  colorScheme?: SelectColorScheme;

  /**
   * Label text
   */
  label?: string;

  /**
   * Selected value
   */
  value?: string | number;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number) => void;

  /**
   * Options to display
   */
  options: SelectOption[];

  /**
   * Placeholder text
   * @default 'Select an option'
   */
  placeholder?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the select is full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Container style
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Select trigger style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Label style
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
