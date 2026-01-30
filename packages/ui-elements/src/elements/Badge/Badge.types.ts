/**
 * Badge Component Types
 *
 * Extends BadgePropsBase from @groxigo/contracts
 */

import type { ViewProps, ViewStyle, TextStyle, StyleProp } from 'react-native';
import type {
  BadgePropsBase,
  BadgeVariant as ContractBadgeVariant,
  BadgeColorScheme,
  BadgeSize,
} from '@groxigo/contracts';

// Re-export contract types
export type { BadgeColorScheme, BadgeSize } from '@groxigo/contracts';

/**
 * Badge variant matching contract
 * Contract includes: 'solid' | 'outline' | 'subtle' | 'soft'
 */
export type BadgeVariant = ContractBadgeVariant;

export interface BadgeProps extends Omit<BadgePropsBase, 'className'>, Omit<ViewProps, 'style'> {
  /**
   * Badge variant
   * @default 'subtle'
   */
  variant?: BadgeVariant;

  /**
   * Color scheme
   * @default 'neutral'
   */
  colorScheme?: BadgeColorScheme;

  /**
   * Badge size
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Content to display
   */
  children: React.ReactNode;

  /**
   * Custom container style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom text style (React Native specific)
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;

  /**
   * Rounded pill style
   */
  rounded?: boolean;

  /**
   * Test ID
   */
  testID?: string;
}
