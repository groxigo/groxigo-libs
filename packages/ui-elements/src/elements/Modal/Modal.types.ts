/**
 * Modal Component Types
 *
 * Extends ModalPropsBase from @groxigo/contracts
 */

import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode, RefObject } from 'react';
import type {
  ModalPropsBase,
  ModalHeaderPropsBase,
  ModalBodyPropsBase,
  ModalFooterPropsBase,
  ModalSize,
  ModalPlacement,
} from '@groxigo/contracts';

// Re-export contract types
export type { ModalSize, ModalPlacement } from '@groxigo/contracts';

export interface ModalProps extends Omit<ModalPropsBase, 'className'> {
  /**
   * Whether the modal is open
   * Matches ModalPropsBase.isOpen
   */
  isOpen: boolean;

  /**
   * @deprecated Use `isOpen` instead. Will be removed in next major version.
   */
  visible?: boolean;

  /**
   * Whether clicking backdrop closes modal
   * Matches ModalPropsBase.closeOnOverlayClick
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * @deprecated Use `closeOnOverlayClick` instead. Will be removed in next major version.
   */
  closeOnBackdrop?: boolean;

  /**
   * Whether pressing escape closes modal
   * Matches ModalPropsBase.closeOnEsc
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * @deprecated Use `closeOnEsc` instead. Will be removed in next major version.
   */
  closeOnEscape?: boolean;

  /**
   * Whether to trap focus inside modal
   * Note: React Native handles focus differently; this is for accessibility semantics
   * @default true
   */
  trapFocus?: boolean;

  /**
   * Whether to block scroll on body
   * Note: Handled by React Native Modal component
   * @default true
   */
  blockScroll?: boolean;

  /**
   * Initial focus element ref
   * Note: Limited support in React Native
   */
  initialFocusRef?: RefObject<any>;

  /**
   * Final focus element ref (on close)
   * Note: Limited support in React Native
   */
  finalFocusRef?: RefObject<any>;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Animation type (React Native specific)
   * @default 'fade'
   */
  animationType?: 'none' | 'fade' | 'slide';

  /**
   * Custom style for modal container (React Native specific)
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for backdrop (React Native specific)
   */
  backdropStyle?: StyleProp<ViewStyle>;

  /**
   * Accessibility label for the modal
   */
  accessibilityLabel?: string;
}

export interface ModalHeaderProps extends Omit<ModalHeaderPropsBase, 'className'> {
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
   * Custom style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;
}

export interface ModalBodyProps extends Omit<ModalBodyPropsBase, 'className'> {
  /**
   * Body content
   */
  children: ReactNode;

  /**
   * Custom style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;
}

export interface ModalFooterProps extends Omit<ModalFooterPropsBase, 'className'> {
  /**
   * Footer content (typically action buttons)
   */
  children: ReactNode;

  /**
   * Custom style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;
}
