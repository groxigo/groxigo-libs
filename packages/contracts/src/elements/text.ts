/**
 * Text Component Contract
 *
 * Platform-agnostic interface for Text component.
 * Both React Native and Web implementations must conform to this contract.
 */

import type { ReactNode } from 'react';

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

/**
 * Base Text props that all platforms must support
 *
 * @example
 * // Basic usage
 * <Text variant="body">Hello World</Text>
 *
 * @example
 * // Heading with custom color
 * <Text variant="h1" weight="bold" colorScheme="primary">
 *   Welcome to Groxigo
 * </Text>
 *
 * @example
 * // Truncated text
 * <Text variant="bodySmall" truncate>
 *   This is a very long text that will be truncated...
 * </Text>
 */
export interface TextPropsBase {
  /** Text variant (typography style) @default 'body' */
  variant?: TextVariant;
  /** Font weight @default 'normal' */
  weight?: TextWeight;
  /** Text alignment */
  align?: TextAlign;
  /** Color scheme for the text @default 'default' */
  colorScheme?: TextColorScheme;
  /** Direct color override (takes precedence over colorScheme) */
  color?: string;
  /** Whether text should be truncated with ellipsis */
  truncate?: boolean;
  /** Text content */
  children?: ReactNode;
  /** Additional CSS class (web only, ignored on native) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
