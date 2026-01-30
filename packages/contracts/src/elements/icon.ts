/**
 * Icon Component Contract
 *
 * Platform-agnostic interface for Icon component.
 */

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | number;
export type IconColorScheme = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'muted';

/**
 * Standard icon names supported across platforms
 */
export type IconName =
  // Navigation
  | 'home' | 'home-fill'
  | 'chevron-right' | 'chevron-left' | 'chevron-up' | 'chevron-down'
  | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down'
  | 'menu' | 'close'
  // Actions
  | 'search' | 'plus' | 'minus' | 'check' | 'x' | 'x-circle' | 'x-circle-fill'
  | 'refresh' | 'external-link' | 'copy' | 'share' | 'download' | 'upload'
  | 'filter' | 'more' | 'more-vertical'
  // Content
  | 'heart' | 'heart-fill' | 'star' | 'star-fill'
  | 'bookmark' | 'bookmark-fill' | 'tag' | 'tag-fill'
  // User
  | 'user' | 'user-fill' | 'settings' | 'settings-fill'
  // Commerce
  | 'cart' | 'cart-fill'
  // Status
  | 'info' | 'info-circle' | 'info-circle-fill' | 'warning' | 'warning-fill'
  // Media
  | 'trash' | 'edit' | 'camera' | 'image' | 'play' | 'pause' | 'stop' | 'next' | 'previous'
  // Communication
  | 'mail' | 'phone' | 'bell' | 'bell-fill'
  // Location & Time
  | 'location' | 'calendar' | 'clock'
  // Security
  | 'lock' | 'unlock' | 'eye' | 'eye-off' | 'key'
  // Nature & Objects
  | 'leaf' | 'nutrition' | 'water' | 'cube' | 'restaurant' | 'book' | 'grid';

/**
 * Base Icon props that all platforms must support
 */
export interface IconPropsBase {
  /** Icon name */
  name: IconName | string;
  /** Icon size @default 'md' */
  size?: IconSize;
  /** Color scheme @default 'default' */
  colorScheme?: IconColorScheme;
  /** Custom color (overrides colorScheme) */
  color?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
