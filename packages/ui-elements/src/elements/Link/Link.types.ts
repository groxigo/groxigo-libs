/**
 * Link Component Types
 */

import type { TextStyle, StyleProp, GestureResponderEvent } from 'react-native';

export type LinkSize = 'sm' | 'md' | 'lg';
export type LinkColorScheme = 'primary' | 'secondary' | 'accent' | 'neutral';

export interface LinkProps {
  /**
   * Link text content
   */
  children: React.ReactNode;

  /**
   * URL or path to navigate to (for web)
   */
  href?: string;

  /**
   * Callback when link is pressed
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Color scheme
   * @default 'primary'
   */
  colorScheme?: LinkColorScheme;

  /**
   * Size of the link text
   * @default 'md'
   */
  size?: LinkSize;

  /**
   * Whether to show underline
   * @default true
   */
  underline?: boolean;

  /**
   * Whether the link is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show external link indicator
   * @default false
   */
  isExternal?: boolean;

  /**
   * Text style
   */
  style?: StyleProp<TextStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
