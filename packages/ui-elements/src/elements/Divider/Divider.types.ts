/**
 * Divider Component Types
 */

import type { ViewStyle, StyleProp } from 'react-native';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerThickness = 'thin' | 'medium' | 'thick';

export interface DividerProps {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Variant style
   * @default 'solid'
   */
  variant?: DividerVariant;

  /**
   * Thickness of the divider
   * @default 'thin'
   */
  thickness?: DividerThickness;

  /**
   * Custom color (uses theme border color by default)
   */
  color?: string;

  /**
   * Spacing around the divider (margin)
   */
  spacing?: number;

  /**
   * Label to display in the center of the divider
   */
  label?: string;

  /**
   * Label position
   * @default 'center'
   */
  labelPosition?: 'left' | 'center' | 'right';

  /**
   * Additional style
   */
  style?: StyleProp<ViewStyle>;
}
