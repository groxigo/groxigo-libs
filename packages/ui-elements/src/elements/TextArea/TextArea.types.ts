/**
 * TextArea Component Types
 */

import type { TextInputProps, ViewStyle, TextStyle, StyleProp } from 'react-native';

export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';
export type TextAreaResize = 'none' | 'vertical' | 'auto';

export interface TextAreaProps extends Omit<TextInputProps, 'style' | 'multiline'> {
  /**
   * Size of the textarea
   * @default 'md'
   */
  size?: TextAreaSize;

  /**
   * Visual variant
   * @default 'outline'
   */
  variant?: TextAreaVariant;

  /**
   * Label text
   */
  label?: string;

  /**
   * Error message (also marks as invalid)
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Number of rows (minimum)
   * @default 4
   */
  rows?: number;

  /**
   * Whether the textarea is full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;

  /**
   * Whether the textarea is read-only
   */
  readOnly?: boolean;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Resize behavior (web)
   * @default 'vertical'
   */
  resize?: TextAreaResize;

  /**
   * Container style
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Textarea style
   */
  textAreaStyle?: StyleProp<TextStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
