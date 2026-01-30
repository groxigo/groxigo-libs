import { ReactNode } from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';
import { IconName } from '@groxigo/ui-elements';

/**
 * CategoryTile component props
 */
export interface CategoryTileProps {
  /**
   * Category title/label displayed below the image/icon
   */
  title: string;

  /**
   * Image source (takes precedence over icon if both provided)
   */
  image?: ImageSourcePropType;

  /**
   * Icon name (used if image is not provided)
   */
  icon?: IconName;

  /**
   * Callback when tile is pressed
   */
  onPress?: () => void;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Override width (passed by FluidGrid)
   * When provided, tile uses this width for consistent sizing with ProductTile
   */
  width?: number;

  /**
   * Whether the tile is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

