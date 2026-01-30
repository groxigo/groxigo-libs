/**
 * Avatar Component Types
 */

import type { ViewStyle, ImageStyle, StyleProp, ImageSourcePropType } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';
export type AvatarColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface AvatarProps {
  /**
   * Image source (URI or require)
   */
  source?: ImageSourcePropType;

  /**
   * Fallback text (initials or name) when image is not available
   */
  fallback?: string;

  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Shape variant
   * @default 'circle'
   */
  variant?: AvatarVariant;

  /**
   * Color scheme for fallback background
   * @default 'primary'
   */
  colorScheme?: AvatarColorScheme;

  /**
   * Show online/offline status indicator
   */
  showStatus?: boolean;

  /**
   * Status: online, offline, busy, away
   */
  status?: 'online' | 'offline' | 'busy' | 'away';

  /**
   * Additional container style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional image style
   */
  imageStyle?: StyleProp<ImageStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
