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

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Base Text props that all platforms must support
 *
 * @example
 * // Basic usage
 * <Text variant="body">Hello World</Text>
 *
 * @example
 * // Heading with custom color
 * <Text variant="h1" color="#2563eb">
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
  /** Text alignment */
  align?: TextAlign;
  /** Direct color override */
  color?: string;
  /** Whether text should be truncated with ellipsis */
  truncate?: boolean;
  /** Text content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}
