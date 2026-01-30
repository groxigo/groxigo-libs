/**
 * Spacer Component Types
 */

import type { ViewProps, ViewStyle, StyleProp } from 'react-native';

export type SpacerSize = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64;

export interface SpacerProps extends Omit<ViewProps, 'style'> {
  /**
   * Size multiplier (multiplied by 4px base)
   * e.g., size=4 gives 16px
   * @default 4
   */
  size?: SpacerSize | number;

  /**
   * Custom width (overrides size for width)
   */
  width?: number;

  /**
   * Custom height (overrides size for height)
   */
  height?: number;

  /**
   * Whether to take full width (flex: 1 in row layouts)
   * @default false
   */
  flex?: boolean;

  /**
   * Horizontal spacing only
   */
  x?: number;

  /**
   * Vertical spacing only
   */
  y?: number;

  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
}
