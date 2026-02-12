/**
 * Tooltip Component Contract
 *
 * Platform-agnostic interface for Tooltip component.
 */

import type { ReactNode } from 'react';

export type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

/**
 * Base Tooltip props that all platforms must support
 */
export interface TooltipPropsBase {
  /** Tooltip content */
  label: ReactNode;
  /** Trigger element */
  children: ReactNode;
  /** Tooltip placement @default 'top' */
  placement?: TooltipPlacement;
  /** Delay before showing (ms) @default 0 */
  openDelay?: number;
  /** Delay before hiding (ms) @default 0 */
  closeDelay?: number;
  /** Whether tooltip is disabled */
  isDisabled?: boolean;
  /** Whether tooltip is always open */
  isOpen?: boolean;
  /** Default open state (uncontrolled) */
  defaultIsOpen?: boolean;
  /** Whether tooltip should close on click */
  closeOnClick?: boolean;
  /** Whether tooltip should close on scroll */
  closeOnScroll?: boolean;
  /** Whether tooltip should close on pointer down outside */
  closeOnPointerDown?: boolean;
  /** Whether tooltip has arrow @default true */
  hasArrow?: boolean;
  /** Arrow size @default 8 */
  arrowSize?: number;
  /** Arrow shadow color */
  arrowShadowColor?: string;
  /** Offset from trigger [x, y] @default [0, 8] */
  offset?: [number, number];
  /** Open state change handler */
  onOpen?: () => void;
  /** Close state change handler */
  onClose?: () => void;
  /** Test ID for testing */
  testID?: string;
}
