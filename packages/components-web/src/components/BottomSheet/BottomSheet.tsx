/**
 * BottomSheet Component (Web)
 *
 * Bottom-positioned modal/drawer with slide-up animation.
 * Optimized for mobile-like interactions on web.
 */

'use client';

import React, { forwardRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn, Button } from '@groxigo/ui-elements-web';

export interface BottomSheetProps {
  /** Whether the bottom sheet is visible */
  isOpen: boolean;
  /** Callback when bottom sheet is closed */
  onClose: () => void;
  /** Title of the bottom sheet */
  title?: string;
  /** Subtitle displayed below title */
  subtitle?: string;
  /** Content of the bottom sheet */
  children: React.ReactNode;
  /** Whether the bottom sheet is dismissible by tapping backdrop */
  dismissible?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to show the drag handle indicator */
  showHandle?: boolean;
  /** Maximum height of the sheet (e.g., '80vh', '500px') */
  maxHeight?: string;
  /** Additional CSS class */
  className?: string;
  /** Content container className */
  contentClassName?: string;
  /** Test ID for testing */
  testID?: string;
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      children,
      dismissible = true,
      showCloseButton = true,
      showHandle = true,
      maxHeight = '90vh',
      className,
      contentClassName,
      testID,
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Handle client-side only rendering for portal
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Handle open/close animations
    useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
        // Trigger animation after mount
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        });
      } else {
        setIsAnimating(false);
        // Wait for animation to complete before unmounting
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen || !dismissible) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, dismissible, onClose]);

    // Handle body scroll lock
    useEffect(() => {
      if (isOpen) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [isOpen]);

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (event: React.MouseEvent) => {
        if (dismissible && event.target === event.currentTarget) {
          onClose();
        }
      },
      [dismissible, onClose]
    );

    if (!isVisible || !isMounted) return null;

    const sheetContent = (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-end justify-center',
          className
        )}
        role="presentation"
      >
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 bg-black/50 transition-opacity duration-300',
            isAnimating ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
          onClick={handleBackdropClick}
        />

        {/* Sheet */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'bottom-sheet-title' : undefined}
          className={cn(
            'relative z-10 w-full bg-surface-primary',
            'rounded-t-2xl shadow-xl',
            'transform transition-transform duration-300 ease-out',
            isAnimating ? 'translate-y-0' : 'translate-y-full',
            contentClassName
          )}
          style={{ maxHeight }}
          data-testid={testID}
        >
          {/* Handle indicator */}
          {showHandle && (
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>
          )}

          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex-1">
                {title && (
                  <h2
                    id="bottom-sheet-title"
                    className="text-lg font-semibold text-text-primary"
                  >
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-sm text-text-secondary mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center',
                    'rounded-full bg-surface-secondary text-text-secondary',
                    'hover:bg-surface-tertiary hover:text-text-primary',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500',
                    'transition-colors duration-150'
                  )}
                  aria-label="Close bottom sheet"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            </div>
          )}

          {/* Content */}
          <div className="px-4 py-4 overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - 120px)` }}>
            {children}
          </div>
        </div>
      </div>
    );

    return createPortal(sheetContent, document.body);
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
