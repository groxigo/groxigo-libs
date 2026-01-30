/**
 * Button Types
 *
 * React Native implementation extends the platform-agnostic contract.
 */

import type { PressableProps, ViewStyle, TextStyle, StyleProp } from 'react-native';
import type {
  ButtonPropsBase,
  ButtonVariant,
  ButtonColorScheme,
  ButtonSize,
} from '@groxigo/contracts';

// Re-export types from contracts for convenience
export type { ButtonVariant, ButtonColorScheme, ButtonSize };

/**
 * React Native Button props
 * Extends the base contract with platform-specific props
 */
export interface ButtonProps
  extends ButtonPropsBase,
    Omit<PressableProps, 'style' | 'children' | 'disabled' | 'onPress'> {
  /** Custom style for the button container */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the button text */
  textStyle?: StyleProp<TextStyle>;
}
