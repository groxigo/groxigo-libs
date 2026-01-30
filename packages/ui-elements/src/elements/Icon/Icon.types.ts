/**
 * Icon Component Types
 */

import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

/**
 * Icon name identifiers
 * These are abstract names that map to platform-specific icon names
 */
export type IconName =
  | 'home'
  | 'home-fill'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'chevron-down'
  | 'search'
  | 'heart'
  | 'heart-fill'
  | 'cart'
  | 'cart-fill'
  | 'user'
  | 'user-fill'
  | 'settings'
  | 'settings-fill'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'plus'
  | 'minus'
  | 'check'
  | 'x'
  | 'x-circle'
  | 'x-circle-fill'
  | 'info'
  | 'info-circle'
  | 'info-circle-fill'
  | 'warning'
  | 'warning-fill'
  | 'star'
  | 'star-fill'
  | 'filter'
  | 'share'
  | 'more'
  | 'more-vertical'
  | 'trash'
  | 'edit'
  | 'camera'
  | 'image'
  | 'mail'
  | 'phone'
  | 'location'
  | 'calendar'
  | 'clock'
  | 'bell'
  | 'bell-fill'
  | 'lock'
  | 'unlock'
  | 'eye'
  | 'eye-off'
  | 'key'
  | 'tag'
  | 'tag-fill'
  | 'bookmark'
  | 'bookmark-fill'
  | 'download'
  | 'upload'
  | 'refresh'
  | 'play'
  | 'pause'
  | 'stop'
  | 'next'
  | 'previous'
  | 'menu'
  | 'close'
  | 'copy'
  | 'external-link'
  | 'leaf'
  | 'nutrition'
  | 'water'
  | 'cube'
  | 'restaurant'
  | 'book'
  | 'grid';

/**
 * Icon size - can be a named size or a number
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

/**
 * Icon color scheme
 */
export type IconColorScheme = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'muted';

/**
 * Icon component props
 */
export interface IconProps {
  /**
   * Icon name identifier
   */
  name: IconName | string;

  /**
   * Icon size - 'xs' (12px), 'sm' (16px), 'md' (20px), 'lg' (24px), 'xl' (32px), or custom number
   * @default 'md'
   */
  size?: IconSize;

  /**
   * Color scheme for the icon
   * @default 'default'
   */
  colorScheme?: IconColorScheme;

  /**
   * Direct color override (takes precedence over colorScheme)
   */
  color?: string;

  /**
   * Additional style
   */
  style?: StyleProp<ViewStyle | TextStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
