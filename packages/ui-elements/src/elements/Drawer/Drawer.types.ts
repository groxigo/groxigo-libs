/**
 * Drawer Component Types
 */

import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  /**
   * Whether the drawer is visible
   */
  visible: boolean;

  /**
   * Callback when drawer should close
   */
  onClose: () => void;

  /**
   * Drawer content
   */
  children: ReactNode;

  /**
   * Position of the drawer
   * @default 'left'
   */
  position?: DrawerPosition;

  /**
   * Drawer size (width for left/right, height for top/bottom)
   * @default 'md'
   */
  size?: DrawerSize;

  /**
   * Whether clicking backdrop closes drawer
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Whether pressing escape closes drawer (web only)
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Drawer title
   */
  title?: string;

  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Custom style for drawer container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for backdrop
   */
  backdropStyle?: StyleProp<ViewStyle>;

  /**
   * Accessibility label for the drawer
   */
  accessibilityLabel?: string;
}

export interface DrawerHeaderProps {
  /**
   * Header content (typically title)
   */
  children?: ReactNode;

  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Close button callback
   */
  onClose?: () => void;

  /**
   * Custom style
   */
  style?: StyleProp<ViewStyle>;
}

export interface DrawerBodyProps {
  /**
   * Body content
   */
  children: ReactNode;

  /**
   * Custom style
   */
  style?: StyleProp<ViewStyle>;
}

export interface DrawerFooterProps {
  /**
   * Footer content
   */
  children: ReactNode;

  /**
   * Custom style
   */
  style?: StyleProp<ViewStyle>;
}
