/**
 * Image Component Types
 */

import type { ImageProps as RNImageProps, ImageStyle, ViewStyle, StyleProp } from 'react-native';

export type ImageResizeMode = 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
export type ImageFallback = 'color' | 'skeleton' | 'custom';

export interface ImageProps extends Omit<RNImageProps, 'style' | 'resizeMode' | 'width' | 'height'> {
  /**
   * Source of the image
   */
  source: RNImageProps['source'];

  /**
   * Resize mode
   * @default 'cover'
   */
  resizeMode?: ImageResizeMode;

  /**
   * Width of the image
   */
  width?: number;

  /**
   * Height of the image
   */
  height?: number;

  /**
   * Aspect ratio (e.g., 16/9, 1, 4/3)
   */
  aspectRatio?: number;

  /**
   * Border radius (all corners)
   */
  borderRadius?: number;

  /**
   * Individual corner radii (override borderRadius)
   */
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;

  /**
   * Whether image is circular (requires width/height)
   * @default false
   */
  circular?: boolean;

  /**
   * Fallback type when loading or on error
   * @default 'skeleton'
   */
  fallbackType?: ImageFallback;

  /**
   * Custom fallback component
   */
  fallback?: React.ReactNode;

  /**
   * Background color for the image container
   * Useful for transparent images to show a colored background
   */
  backgroundColor?: string;

  /**
   * Image style
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
