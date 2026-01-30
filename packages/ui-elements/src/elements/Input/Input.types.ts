/**
 * Input Component Types
 */

import type { TextInputProps, ViewStyle, TextStyle, StyleProp } from 'react-native';

/** @deprecated Size is now handled automatically via responsive scaling */
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * @deprecated Input size is now handled automatically via responsive scaling (uiSize).
   * This prop is ignored - all inputs use md (44px) base size that scales on tablets.
   */
  size?: InputSize;

  /**
   * Input variant
   * @default 'outline'
   */
  variant?: InputVariant;

  /**
   * Label text
   */
  label?: string;

  /**
   * Error message (also marks input as invalid)
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Whether the input takes full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Container style
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Input wrapper style
   */
  wrapperStyle?: StyleProp<ViewStyle>;

  /**
   * Input text style
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;

  /**
   * Custom style for the wrapper (for backwards compatibility)
   */
  style?: StyleProp<ViewStyle>;
}
