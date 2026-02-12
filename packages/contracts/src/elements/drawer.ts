/**
 * Drawer Component Contract
 *
 * Platform-agnostic interface for Drawer/Sheet component.
 */

import type { ReactNode } from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Base Drawer props that all platforms must support
 */
export interface DrawerPropsBase {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Drawer placement @default 'right' */
  placement?: DrawerPlacement;
  /** Drawer size @default 'md' */
  size?: DrawerSize;
  /** Whether clicking backdrop closes drawer @default true */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes drawer @default true */
  closeOnEsc?: boolean;
  /** Whether to show close button @default true */
  showCloseButton?: boolean;
  /** Whether to trap focus inside drawer @default true */
  trapFocus?: boolean;
  /** Whether to block scroll on body @default true */
  blockScroll?: boolean;
  /** Whether drawer is full height/width @default true */
  isFullHeight?: boolean;
  /** Whether to preserve content when closed @default false */
  preserveContent?: boolean;
  /** Initial focus element ref */
  initialFocusRef?: React.RefObject<unknown>;
  /** Final focus element ref (on close) */
  finalFocusRef?: React.RefObject<unknown>;
  /** Open animation callback */
  onOpen?: () => void;
  /** Animation complete callback */
  onAnimationComplete?: () => void;
  /** Drawer content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Drawer Header props
 */
export interface DrawerHeaderPropsBase {
  /** Header content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Drawer Body props
 */
export interface DrawerBodyPropsBase {
  /** Body content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Drawer Footer props
 */
export interface DrawerFooterPropsBase {
  /** Footer content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}
