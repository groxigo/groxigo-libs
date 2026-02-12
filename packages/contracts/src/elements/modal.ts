/**
 * Modal Component Contract
 *
 * Platform-agnostic interface for Modal/Dialog component.
 */

import type { ReactNode } from 'react';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPlacement = 'center' | 'top' | 'bottom';

/**
 * Base Modal props that all platforms must support
 *
 * @example
 * // Basic modal
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <ModalHeader>Modal Title</ModalHeader>
 *   <ModalBody>
 *     <Text>Modal content here</Text>
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button onPress={() => setIsOpen(false)}>Close</Button>
 *   </ModalFooter>
 * </Modal>
 *
 * @example
 * // Large modal with custom options
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   size="lg"
 *   closeOnOverlayClick={false}
 *   showCloseButton
 * >
 *   <ModalHeader>Edit Profile</ModalHeader>
 *   <ModalBody>
 *     <Form>...</Form>
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button variant="ghost" onPress={handleClose}>Cancel</Button>
 *     <Button onPress={handleSave}>Save</Button>
 *   </ModalFooter>
 * </Modal>
 */
export interface ModalPropsBase {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal size @default 'md' */
  size?: ModalSize;
  /** Modal placement @default 'center' */
  placement?: ModalPlacement;
  /** Whether clicking backdrop closes modal @default true */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes modal @default true */
  closeOnEsc?: boolean;
  /** Whether to show close button @default true */
  showCloseButton?: boolean;
  /** Whether to trap focus inside modal @default true */
  trapFocus?: boolean;
  /** Whether to block scroll on body @default true */
  blockScroll?: boolean;
  /** Whether to use portal @default true */
  usePortal?: boolean;
  /** Initial focus element ref */
  initialFocusRef?: React.RefObject<unknown>;
  /** Final focus element ref (on close) */
  finalFocusRef?: React.RefObject<unknown>;
  /** Open animation callback */
  onOpen?: () => void;
  /** Animation complete callback */
  onAnimationComplete?: () => void;
  /** Modal content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Modal Header props
 */
export interface ModalHeaderPropsBase {
  /** Header content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Modal Body props
 */
export interface ModalBodyPropsBase {
  /** Body content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Modal Footer props
 */
export interface ModalFooterPropsBase {
  /** Footer content */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Alert Dialog props (confirmation modal)
 */
export interface AlertDialogPropsBase extends Omit<ModalPropsBase, 'closeOnOverlayClick'> {
  /** Whether clicking backdrop closes dialog @default false */
  closeOnOverlayClick?: boolean;
  /** Reference to the least destructive button */
  leastDestructiveRef?: React.RefObject<unknown>;
}
