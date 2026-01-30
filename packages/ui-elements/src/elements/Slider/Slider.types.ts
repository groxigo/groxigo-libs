/**
 * Slider Component Types
 */

import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface SliderProps {
  /**
   * Current value of the slider
   * @default 0
   */
  value?: number;

  /**
   * Minimum value
   * @default 0
   */
  minimumValue?: number;

  /**
   * Maximum value
   * @default 100
   */
  maximumValue?: number;

  /**
   * Step value for discrete sliders
   */
  step?: number;

  /**
   * Callback when slider value changes
   */
  onValueChange?: (value: number) => void;

  /**
   * Callback when user finishes dragging
   */
  onSlidingComplete?: (value: number) => void;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label text displayed above the slider
   */
  label?: string;

  /**
   * Whether to show the current value
   * @default false
   */
  showValue?: boolean;

  /**
   * Format function for the displayed value
   */
  formatValue?: (value: number) => string;

  /**
   * Size of the slider
   * @default 'md'
   */
  size?: SliderSize;

  /**
   * Color scheme for the slider
   * @default 'primary'
   */
  colorScheme?: SliderColorScheme;

  /**
   * Additional container style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional label style
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Additional value style
   */
  valueStyle?: StyleProp<TextStyle>;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}
