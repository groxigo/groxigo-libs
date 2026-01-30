/**
 * Tooltip Component Types
 *
 * A tooltip component for displaying contextual information.
 */

import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface TooltipProps {
  /**
   * Tooltip content (text or custom content)
   */
  content: string | ReactNode;

  /**
   * The element that triggers the tooltip
   */
  children: ReactNode;

  /**
   * Placement of the tooltip relative to trigger
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Delay before showing tooltip (ms)
   * @default 0
   */
  showDelay?: number;

  /**
   * Delay before hiding tooltip (ms)
   * @default 0
   */
  hideDelay?: number;

  /**
   * Whether tooltip is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show arrow pointer
   * @default true
   */
  showArrow?: boolean;

  /**
   * Custom style for tooltip container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for tooltip content
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * Maximum width of tooltip
   * @default 250
   */
  maxWidth?: number;

  /**
   * Accessibility label for the tooltip
   */
  accessibilityLabel?: string;

  /**
   * Controlled visibility state
   */
  visible?: boolean;

  /**
   * Callback when visibility changes
   */
  onVisibleChange?: (visible: boolean) => void;
}
