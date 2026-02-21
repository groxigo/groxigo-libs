'use client';

/**
 * Drawer Component (Web)
 *
 * A sliding drawer/panel component for web.
 * Implements @groxigo/contracts DrawerPropsBase.
 */

import { forwardRef, useEffect, useCallback, useRef, Children, isValidElement, cloneElement, type MouseEvent, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import type {
  DrawerPropsBase,
  DrawerHeaderPropsBase,
  DrawerBodyPropsBase,
  DrawerFooterPropsBase,
  DrawerPlacement,
  DrawerSize,
} from '@groxigo/contracts';
import styles from './Drawer.module.css';

// Size class maps for horizontal (left/right) placement
const horizontalSizeClassMap: Record<DrawerSize, string> = {
  xs: styles.horizontalXs,
  sm: styles.horizontalSm,
  md: styles.horizontalMd,
  lg: styles.horizontalLg,
  xl: styles.horizontalXl,
  full: styles.horizontalFull,
};

// Size class maps for vertical (top/bottom) placement
const verticalSizeClassMap: Record<DrawerSize, string> = {
  xs: styles.verticalXs,
  sm: styles.verticalSm,
  md: styles.verticalMd,
  lg: styles.verticalLg,
  xl: styles.verticalXl,
  full: styles.verticalFull,
};

// Placement classes
const placementClassMap: Record<DrawerPlacement, string> = {
  left: styles.placementLeft,
  right: styles.placementRight,
  top: styles.placementTop,
  bottom: styles.placementBottom,
};

// Transform classes for closed state
const transformClosedClassMap: Record<DrawerPlacement, string> = {
  left: styles.closedLeft,
  right: styles.closedRight,
  top: styles.closedTop,
  bottom: styles.closedBottom,
};

// ============================================
// DRAWER HEADER COMPONENT
// ============================================

export interface DrawerHeaderProps extends DrawerHeaderPropsBase {
  className?: string;
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
        className={clsx(styles.header, className)}
        {...props}
      >
        <div className={styles.headerContent}>
          {children}
        </div>
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className={styles.headerCloseButton}
            aria-label="Close drawer"
          >
            <span className={styles.headerCloseLabel} aria-hidden="true">
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

export interface DrawerBodyProps extends DrawerBodyPropsBase {
  className?: string;
}

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.body, className)}
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

export interface DrawerFooterProps extends DrawerFooterPropsBase {
  className?: string;
}

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.footer, className)}
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

export interface DrawerProps extends DrawerPropsBase {
  className?: string;
}

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
          const initial = initialFocusRef?.current as HTMLElement | null;
          if (initial) {
            initial.focus();
          } else if (drawerRef.current) {
            drawerRef.current.focus();
          }
        });
      } else {
        // Return focus on close
        const final = finalFocusRef?.current as HTMLElement | null;
        if (final) {
          final.focus();
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
      (e: MouseEvent) => {
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

    const drawerClasses = clsx(
      styles.drawer,
      placementClassMap[placement],
      isHorizontal
        ? horizontalSizeClassMap[size]
        : verticalSizeClassMap[size],
      isFullHeight && isHorizontal && styles.fullHeightHorizontal,
      isFullHeight && !isHorizontal && styles.fullWidthVertical,
      isOpen ? styles.open : transformClosedClassMap[placement],
      className
    );

    const overlayClasses = clsx(
      styles.backdrop,
      isOpen ? styles.backdropVisible : styles.backdropHidden
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
          {Children.map(children, (child) => {
            if (isValidElement(child) && child.type === DrawerHeader) {
              return cloneElement(
                child as ReactElement<DrawerHeaderProps>,
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
