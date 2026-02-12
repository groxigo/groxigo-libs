/**
 * Skeleton Component Contract
 */

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonPropsBase {
  /** Skeleton variant @default 'rectangular' */
  variant?: SkeletonVariant;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Border radius (for rounded variant) */
  borderRadius?: number;
  /** Whether to animate @default true */
  animate?: boolean;
  /** Test ID */
  testID?: string;
}
