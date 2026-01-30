/**
 * useDisclosure Hook
 *
 * Handles open/close state for modals, drawers, dropdowns, etc.
 * Shared by both React Native and Web implementations.
 */

import { useState, useCallback } from 'react';

export interface UseDisclosureOptions {
  /** Default open state */
  defaultIsOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when opened */
  onOpen?: () => void;
  /** Callback when closed */
  onClose?: () => void;
  /** Callback when toggled */
  onToggle?: (isOpen: boolean) => void;
}

export interface UseDisclosureReturn {
  /** Whether the disclosure is open */
  isOpen: boolean;
  /** Open the disclosure */
  open: () => void;
  /** Close the disclosure */
  close: () => void;
  /** Toggle the disclosure */
  toggle: () => void;
  /** Set open state directly */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Hook for managing disclosure state (open/close)
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const { isOpen, open, close } = useDisclosure();
 *
 *   return (
 *     <>
 *       <Button onPress={open}>Open Modal</Button>
 *       <ModalComponent isOpen={isOpen} onClose={close}>
 *         <p>Modal content</p>
 *       </ModalComponent>
 *     </>
 *   );
 * }
 * ```
 */
export function useDisclosure(options: UseDisclosureOptions = {}): UseDisclosureReturn {
  const {
    defaultIsOpen = false,
    isOpen: isOpenProp,
    onOpen,
    onClose,
    onToggle,
  } = options;

  const [isOpenState, setIsOpenState] = useState(defaultIsOpen);

  // Use controlled value if provided, otherwise use internal state
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;

  const open = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(true);
    }
    onOpen?.();
    onToggle?.(true);
  }, [isControlled, onOpen, onToggle]);

  const close = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(false);
    }
    onClose?.();
    onToggle?.(false);
  }, [isControlled, onClose, onToggle]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const setIsOpen = useCallback(
    (nextIsOpen: boolean) => {
      if (nextIsOpen) {
        open();
      } else {
        close();
      }
    },
    [open, close]
  );

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}
