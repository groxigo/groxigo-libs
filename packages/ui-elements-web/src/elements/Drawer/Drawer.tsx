/**
 * Drawer Component (Web)
 *
 * A sliding drawer/panel component for web.
 * Implements @groxigo/contracts DrawerPropsBase.
 */

import React, { forwardRef, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type {
  DrawerPropsBase,
  DrawerHeaderPropsBase,
  DrawerBodyPropsBase,
  DrawerFooterPropsBase,
  DrawerPlacement,
  DrawerSize,
} from '@groxigo/contracts';

// Size configurations (percentage of viewport)
const sizeClasses: Record<DrawerPlacement, Record<DrawerSize, string>> = {
  left: {
    xs: 'w-64',
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[32rem]',
    xl: 'w-[40rem]',
    full: 'w-full',
  },
  right: {
    xs: 'w-64',
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[32rem]',
    xl: 'w-[40rem]',
    full: 'w-full',
  },
  top: {
    xs: 'h-32',
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-96',
    xl: 'h-[32rem]',
    full: 'h-full',
  },
  bottom: {
    xs: 'h-32',
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-96',
    xl: 'h-[32rem]',
    full: 'h-full',
  },
};

// Position classes for drawer placement
const placementClasses: Record<DrawerPlacement, string> = {
  left: 'inset-y-0 left-0',
  right: 'inset-y-0 right-0',
  top: 'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0',
};

// Transform classes for slide animations (closed state)
const transformClosedClasses: Record<DrawerPlacement, string> = {
  left: '-translate-x-full',
  right: 'translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
};

// ============================================
// DRAWER HEADER COMPONENT
// ============================================

export interface DrawerHeaderProps extends DrawerHeaderPropsBase {
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Close handler */
  onClose?: () => void;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className, showCloseButton = true, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between px-4 py-3 border-b border-border',
          className
        )}
        {...props}
      >
        <div className="flex-1 text-lg font-semibold text-text-primary">
          {children}
        </div>
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-surface-secondary text-text-secondary hover:bg-surface-tertiary transition-colors"
            aria-label="Close drawer"
          >
            <span className="text-lg font-semibold" aria-hidden="true">
              &times;
            </span>
          </button>
        )}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

// ============================================
// DRAWER BODY COMPONENT
// ============================================

export interface DrawerBodyProps extends DrawerBodyPropsBase {}

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-y-auto p-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

// ============================================
// DRAWER FOOTER COMPONENT
// ============================================

export interface DrawerFooterProps extends DrawerFooterPropsBase {}

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-end gap-3 px-4 py-3 border-t border-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';

// ============================================
// DRAWER COMPONENT
// ============================================

export interface DrawerProps extends DrawerPropsBase {}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      placement = 'right',
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      trapFocus = true,
      blockScroll = true,
      isFullHeight = true,
      preserveContent = false,
      initialFocusRef,
      finalFocusRef,
      onOpen,
      onAnimationComplete,
      children,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<Element | null>(null);

    // Combine forwarded ref with internal ref
    const combinedRef = (node: HTMLDivElement | null) => {
      drawerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Handle escape key
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
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
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }

      return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }, [isOpen, blockScroll]);

    // Handle focus management
    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement;
        onOpen?.();

        // Focus initial element or drawer itself
        requestAnimationFrame(() => {
          if (initialFocusRef?.current) {
            initialFocusRef.current.focus();
          } else if (drawerRef.current) {
            drawerRef.current.focus();
          }
        });
      } else {
        // Return focus on close
        if (finalFocusRef?.current) {
          finalFocusRef.current.focus();
        } else if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus();
        }
      }
    }, [isOpen, onOpen, initialFocusRef, finalFocusRef]);

    // Handle focus trap
    const handleFocusTrap = useCallback(
      (e: KeyboardEvent) => {
        if (!trapFocus || !isOpen || !drawerRef.current) return;
        if (e.key !== 'Tab') return;

        const focusableElements = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      },
      [trapFocus, isOpen]
    );

    useEffect(() => {
      if (trapFocus && isOpen) {
        document.addEventListener('keydown', handleFocusTrap);
        return () => document.removeEventListener('keydown', handleFocusTrap);
      }
    }, [trapFocus, isOpen, handleFocusTrap]);

    // Handle animation complete
    const handleTransitionEnd = useCallback(() => {
      onAnimationComplete?.();
    }, [onAnimationComplete]);

    // Handle overlay click
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose]
    );

    // Don't render if closed and not preserving content
    if (!isOpen && !preserveContent) {
      return null;
    }

    const isHorizontal = placement === 'left' || placement === 'right';

    const drawerClasses = cn(
      'fixed z-50 flex flex-col bg-surface-primary shadow-xl',
      placementClasses[placement],
      sizeClasses[placement][size],
      isFullHeight && isHorizontal && 'h-full',
      isFullHeight && !isHorizontal && 'w-full',
      'transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0 translate-y-0' : transformClosedClasses[placement],
      className
    );

    const overlayClasses = cn(
      'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    );

    const content = (
      <>
        {/* Overlay/Backdrop */}
        <div
          className={overlayClasses}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          ref={combinedRef}
          role="dialog"
          aria-modal="true"
          aria-label="Drawer"
          tabIndex={-1}
          className={drawerClasses}
          onTransitionEnd={handleTransitionEnd}
          data-testid={testID}
          {...props}
        >
          {/* Inject close handler and showCloseButton into DrawerHeader if present */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === DrawerHeader) {
              return React.cloneElement(
                child as React.ReactElement<DrawerHeaderProps>,
                {
                  showCloseButton:
                    (child.props as DrawerHeaderProps).showCloseButton ??
                    showCloseButton,
                  onClose: (child.props as DrawerHeaderProps).onClose ?? onClose,
                }
              );
            }
            return child;
          })}
        </div>
      </>
    );

    // Render via portal
    if (typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return null;
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
