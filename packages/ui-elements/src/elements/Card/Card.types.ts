/**
 * Card Component Types
 *
 * Extends CardPropsBase from @groxigo/contracts
 */

import type { ViewProps, ViewStyle, StyleProp } from 'react-native';
import type {
  CardPropsBase,
  CardHeaderPropsBase,
  CardBodyPropsBase,
  CardFooterPropsBase,
  CardVariant as ContractCardVariant,
  CardSize,
} from '@groxigo/contracts';

// Re-export contract types
export type { CardSize } from '@groxigo/contracts';

/**
 * Card variant type matching contract
 * 'outline' matches contract (deprecated: 'outlined')
 * 'unstyled' matches contract (deprecated: 'ghost')
 */
export type CardVariant = ContractCardVariant;

/**
 * @deprecated Use CardVariant instead. 'outlined' -> 'outline', 'ghost' -> 'unstyled'
 */
export type CardVariantDeprecated = 'elevated' | 'outlined' | 'filled' | 'ghost';

export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends Omit<CardPropsBase, 'className'>, Omit<ViewProps, 'style'> {
  /**
   * Card variant
   * Matches CardPropsBase.variant
   * @default 'elevated'
   */
  variant?: CardVariant;

  /**
   * Card size (affects padding)
   * Matches CardPropsBase.size
   * @default 'md'
   */
  size?: CardSize;

  /**
   * Padding size (React Native specific, overrides size)
   * @default 'md'
   */
  padding?: CardPadding;

  /**
   * Border radius size (React Native specific)
   * @default 'md'
   */
  radius?: CardRadius;

  /**
   * Whether the card is pressable
   * Matches CardPropsBase.pressable
   */
  pressable?: boolean;

  /**
   * Whether the card is disabled (only applicable when pressable)
   */
  disabled?: boolean;

  /**
   * Callback when card is pressed
   * Matches CardPropsBase.onPress
   */
  onPress?: () => void;

  /**
   * Content to display
   */
  children: React.ReactNode;

  /**
   * Custom style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test ID
   */
  testID?: string;
}

export interface CardHeaderProps extends Omit<CardHeaderPropsBase, 'className'> {
  /**
   * Title text
   */
  title?: string;

  /**
   * Subtitle text
   */
  subtitle?: string;

  /**
   * Left content (e.g., avatar, icon)
   */
  left?: React.ReactNode;

  /**
   * Right content (e.g., action buttons)
   */
  right?: React.ReactNode;

  /**
   * Custom style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Children override
   */
  children?: React.ReactNode;
}

/**
 * CardBody props - matches contract naming (was CardContent)
 */
export interface CardBodyProps extends Omit<CardBodyPropsBase, 'className'> {
  /**
   * Content
   */
  children: React.ReactNode;

  /**
   * Custom style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * @deprecated Use CardBodyProps instead
 */
export type CardContentProps = CardBodyProps;

export interface CardFooterProps extends Omit<CardFooterPropsBase, 'className'> {
  /**
   * Content
   */
  children: React.ReactNode;

  /**
   * Custom style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;
}
