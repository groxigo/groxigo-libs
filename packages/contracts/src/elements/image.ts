/**
 * Image Component Contract
 */

import type { ReactNode } from 'react';

export type ImageResizeMode = 'cover' | 'contain' | 'stretch' | 'center';

export interface ImagePropsBase {
  /** Image source URI */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Image width */
  width?: number | string;
  /** Image height */
  height?: number | string;
  /** Resize mode @default 'cover' */
  resizeMode?: ImageResizeMode;
  /** Border radius */
  borderRadius?: number;
  /** Fallback element when image fails to load */
  fallback?: ReactNode;
  /** Placeholder while loading */
  placeholder?: ReactNode;
  /** Load handler */
  onLoad?: () => void;
  /** Error handler */
  onError?: () => void;
  /** Test ID */
  testID?: string;
}
