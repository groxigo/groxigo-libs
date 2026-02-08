/**
 * Button Component Contract
 *
 * Platform-agnostic interface for Button component.
 */

import type { ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'soft';
export type ButtonColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Base Button props that all platforms must support
 *
 * @example
 * // Basic button
 * <Button onPress={() => console.log('clicked')}>
 *   Click Me
 * </Button>
 *
 * @example
 * // Button with icon and loading state
 * <Button
 *   variant="solid"
 *   colorScheme="primary"
 *   leftIcon={<CartIcon />}
 *   loading={isLoading}
 *   loadingText="Adding..."
 *   onPress={handleAddToCart}
 * >
 *   Add to Cart
 * </Button>
 *
 * @example
 * // Outline button with full width
 * <Button variant="outline" colorScheme="secondary" fullWidth>
 *   View Details
 * </Button>
 */
export interface ButtonPropsBase {
  /** Button variant @default 'solid' */
  variant?: ButtonVariant;
  /** Color scheme for the button @default 'primary' */
  colorScheme?: ButtonColorScheme;
  /** Button size @default 'md' */
  size?: ButtonSize;
  /** Whether the button takes full width @default false */
  fullWidth?: boolean;
  /** Whether the button is in loading state @default false */
  loading?: boolean;
  /** Loading text to display */
  loadingText?: string;
  /** Icon to display on the left */
  leftIcon?: ReactNode;
  /** Icon to display on the right */
  rightIcon?: ReactNode;
  /** Icon only mode (no text) @default false */
  iconOnly?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button content */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
  /** Click/press handler */
  onPress?: (event?: unknown) => void;
}
