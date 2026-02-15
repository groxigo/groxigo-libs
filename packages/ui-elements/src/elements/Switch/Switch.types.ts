/**
 * Switch Component Types
 *
 * Extends SwitchPropsBase from @groxigo/contracts
 */

import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { SwitchPropsBase, SwitchSize } from '@groxigo/contracts';

// Re-export contract types
export type { SwitchSize } from '@groxigo/contracts';

// SwitchColorScheme is defined locally (not in contracts)
export type SwitchColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface SwitchProps extends Omit<SwitchPropsBase, 'value' | 'className'> {
  /**
   * Whether the switch is on
   * Matches SwitchPropsBase.checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback when switch value changes
   * Matches SwitchPropsBase.onChange
   */
  onChange?: (checked: boolean) => void;

  /**
   * @deprecated Use `checked` instead. Will be removed in next major version.
   */
  value?: boolean;

  /**
   * @deprecated Use `onChange` instead. Will be removed in next major version.
   */
  onValueChange?: (value: boolean) => void;

  /**
   * Color scheme for the switch
   * @default 'primary'
   */
  colorScheme?: SwitchColorScheme;

  /**
   * Additional container style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional label style (React Native specific)
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
