/**
 * Skeleton Component Types
 */

import type { ViewProps, ViewStyle, StyleProp } from 'react-native';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps extends Omit<ViewProps, 'style'> {
  /**
   * Variant of the skeleton
   * @default 'rectangular'
   */
  variant?: SkeletonVariant;

  /**
   * Width of the skeleton
   */
  width?: number;

  /**
   * Height of the skeleton
   */
  height?: number;

  /**
   * Border radius (only for rectangular variant)
   */
  radius?: number;

  /**
   * Whether to show pulse animation
   * @default true
   */
  animated?: boolean;

  /**
   * Number of lines (for text variant)
   * @default 1
   */
  lines?: number;

  /**
   * Gap between lines (for text variant)
   * @default 8
   */
  lineGap?: number;

  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
}
