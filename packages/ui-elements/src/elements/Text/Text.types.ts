/**
 * Text Component Types
 */

import type { TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodyLarge'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'overline';

export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextColorScheme =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted';

export interface TextProps extends RNTextProps {
  /**
   * Text variant (typography style)
   * @default 'body'
   */
  variant?: TextVariant;

  /**
   * Font weight
   * @default 'normal'
   */
  weight?: TextWeight;

  /**
   * Text alignment
   */
  align?: TextAlign;

  /**
   * Color scheme for the text
   * @default 'default'
   */
  colorScheme?: TextColorScheme;

  /**
   * Direct color override (takes precedence over colorScheme)
   */
  color?: string;

  /**
   * Whether text should be truncated with ellipsis
   */
  truncate?: boolean;

  /**
   * Whether to apply responsive font scaling for tablets/large screens
   * When true, font sizes automatically scale up on larger devices
   * @default true
   */
  responsive?: boolean;

  /**
   * Custom style
   */
  style?: StyleProp<TextStyle>;

  /**
   * Text content
   */
  children?: React.ReactNode;
}
