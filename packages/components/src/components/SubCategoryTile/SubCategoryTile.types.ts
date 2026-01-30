import { ReactNode } from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';
import { IconName } from '@groxigo/ui-elements';

/**
 * SubCategoryTile component props
 * Smaller tile component for displaying subcategories in navigation
 */
export interface SubCategoryTileProps {
  /**
   * SubCategory title/label displayed below or beside the image/icon
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
   * Whether the tile is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the tile is active/selected
   * @default false
   */
  active?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  /**
   * Custom inner container style
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

