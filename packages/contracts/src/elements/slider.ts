/**
 * Slider Component Contract
 *
 * Platform-agnostic interface for Slider/Range component.
 */

export type SliderSize = 'sm' | 'md' | 'lg';

/**
 * Base Slider props that all platforms must support
 */
export interface SliderPropsBase {
  /** Current value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value @default 0 */
  min?: number;
  /** Maximum value @default 100 */
  max?: number;
  /** Step increment @default 1 */
  step?: number;
  /** Slider size @default 'md' */
  size?: SliderSize;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether to show value tooltip */
  showTooltip?: boolean;
  /** When to show tooltip @default 'focus' */
  tooltipVisibility?: 'always' | 'focus' | 'never';
  /** Custom value formatter for tooltip */
  formatValue?: (value: number) => string;
  /** Whether to show marks */
  showMarks?: boolean;
  /** Custom marks */
  marks?: Array<{ value: number; label?: string }>;
  /** Whether the slider value is inverted */
  isReversed?: boolean;
  /** Slider name (for forms) */
  name?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Change end handler (on release) */
  onChangeEnd?: (value: number) => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Range Slider props (dual thumb)
 */
export interface RangeSliderPropsBase extends Omit<SliderPropsBase, 'value' | 'defaultValue' | 'onChange' | 'onChangeEnd'> {
  /** Current range values [min, max] */
  value?: [number, number];
  /** Default range values (uncontrolled) */
  defaultValue?: [number, number];
  /** Minimum distance between thumbs */
  minDistance?: number;
  /** Change handler */
  onChange?: (value: [number, number]) => void;
  /** Change end handler (on release) */
  onChangeEnd?: (value: [number, number]) => void;
}
