/**
 * Modal Component (Web)
 *
 * Implements @groxigo/contracts ModalPropsBase for web platform.
 * Provides a flexible modal/dialog with overlay, focus management, and accessibility.
 */

import React, {
  forwardRef,
  useEffect,
  useCallback,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import type {
  ModalPropsBase,
  ModalHeaderPropsBase,
  ModalBodyPropsBase,
  ModalFooterPropsBase,
  ModalSize,
  ModalPlacement,
} from '@groxigo/contracts';
import styles from './Modal.module.css';

// Size configuration mapped to CSS module classes
const sizeClassMap: Record<ModalSize, string> = {
  xs: styles.sizeSm, // xs uses sm styling (400px)
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  full: styles.sizeFull,
};

// Placement configuration mapped to CSS module classes
const placementClassMap: Record<ModalPlacement, string> = {
  center: styles.placementCenter,
  top: styles.placementTop,
  bottom: styles.placementBottom,
};

export interface ModalProps extends ModalPropsBase {
  /** ID for the modal element */
  id?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'md',
      placement = 'center',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      trapFocus = true,
      blockScroll = true,
      usePortal = true,
      initialFocusRef,
      finalFocusRef,
      onOpen,
      onAnimationComplete,
      children,
      className,
      testID,
      id,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Handle client-side only rendering for portal
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Handle open callback
    useEffect(() => {
      if (isOpen) {
        onOpen?.();
        setIsAnimating(true);
        // Trigger animation complete after transition
        const timer = setTimeout(() => {
          setIsAnimating(false);
          onAnimationComplete?.();
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [isOpen, onOpen, onAnimationComplete]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEsc, onClose]);

    // Handle body scroll lock
    useEffect(() => {
      if (!blockScroll) return;

      if (isOpen) {
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
          document.body.style.overflow = originalOverflow;
          document.body.style.paddingRight = originalPaddingRight;
        };
      }
    }, [isOpen, blockScroll]);

    // Handle focus management
    useEffect(() => {
      if (!isOpen || !trapFocus) return;

      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus initial element or modal
      const elementToFocus = initialFocusRef?.current || modalRef.current;
      if (elementToFocus) {
        // Delay focus to ensure modal is visible
        requestAnimationFrame(() => {
          elementToFocus.focus();
        });
      }

      return () => {
        // Restore focus on close
        const elementToRestore =
          finalFocusRef?.current || previousActiveElement.current;
        if (elementToRestore) {
          elementToRestore.focus();
        }
      };
    }, [isOpen, trapFocus, initialFocusRef, finalFocusRef]);

    // Focus trap handler
    const handleFocusTrap = useCallback(
      (event: KeyboardEvent) => {
        if (!trapFocus || !isOpen || event.key !== 'Tab') return;

        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      },
      [trapFocus, isOpen]
    );

    useEffect(() => {
      if (isOpen && trapFocus) {
        document.addEventListener('keydown', handleFocusTrap);
        return () => document.removeEventListener('keydown', handleFocusTrap);
      }
    }, [isOpen, trapFocus, handleFocusTrap]);

    // Handle overlay click
    const handleOverlayClick = useCallback(
      (event: React.MouseEvent) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose]
    );

    // Handle close button click
    const handleCloseClick = useCallback(() => {
      onClose();
    }, [onClose]);

    if (!isOpen) return null;

    const modalContent = (
      <div
        className={clsx(
          styles.overlay,
          placementClassMap[placement]
        )}
        role="presentation"
      >
        {/* Overlay/Backdrop */}
        <div
          className={clsx(
            styles.backdrop,
            isOpen ? styles.backdropVisible : styles.backdropHidden
          )}
          aria-hidden="true"
          onClick={handleOverlayClick}
        />

        {/* Modal Container */}
        <div
          ref={(node) => {
            // Handle both refs
            (modalRef as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-labelledby={id ? `${id}-title` : undefined}
          tabIndex={-1}
          className={clsx(
            styles.modal,
            isOpen && !isAnimating
              ? styles.modalVisible
              : styles.modalEntering,
            sizeClassMap[size],
            className
          )}
          data-testid={testID}
        >
          {/* Close Button */}
          {showCloseButton && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCloseClick}
              aria-label="Close modal"
            >
              <svg
                className={styles.closeIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {children}
        </div>
      </div>
    );

    // Use portal or render inline
    if (usePortal && isMounted) {
      return createPortal(modalContent, document.body);
    }

    return modalContent;
  }
);

Modal.displayName = 'Modal';

// ============================================
// MODAL HEADER COMPONENT
// ============================================

export interface ModalHeaderProps extends ModalHeaderPropsBase {
  /** ID for aria-labelledby */
  id?: string;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, id, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.header, className)}
      {...props}
    >
      <div className={styles.headerContent}>
        {typeof children === 'string' ? (
          <h2 id={id} className={styles.headerTitle}>{children}</h2>
        ) : (
          <div id={id}>{children}</div>
        )}
      </div>
    </div>
  )
);

ModalHeader.displayName = 'ModalHeader';

// ============================================
// MODAL BODY COMPONENT
// ============================================

export interface ModalBodyProps extends ModalBodyPropsBase {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.body, className)}
      {...props}
    >
      {children}
    </div>
  )
);

ModalBody.displayName = 'ModalBody';

// ============================================
// MODAL FOOTER COMPONENT
// ============================================

export interface ModalFooterProps extends ModalFooterPropsBase {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.footer, className)}
      {...props}
    >
      {children}
    </div>
  )
);

ModalFooter.displayName = 'ModalFooter';

export default Modal;
