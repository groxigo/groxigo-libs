/**
 * Tooltip Component (Web)
 *
 * Shows contextual information on hover, focus, or click.
 * Implements @groxigo/contracts TooltipPropsBase for web platform.
 *
 * Accessibility features:
 * - aria-describedby links trigger to tooltip content
 * - Keyboard accessible: shows on focus, hides on blur
 * - Escape key dismisses tooltip
 * - aria-label fallback when tooltip is closed
 */

import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  useId,
} from 'react';
import { cn } from '../../utils/cn';
import type { TooltipPropsBase, TooltipPlacement } from '@groxigo/contracts';

// Arrow size constant
const ARROW_SIZE = 6;

// Placement position styles
const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
};

// Arrow position styles based on placement
const arrowClasses: Record<TooltipPlacement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
  'top-start': 'top-full left-3 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
  'top-end': 'top-full right-3 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
  'bottom-start': 'bottom-full left-3 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
  'bottom-end': 'bottom-full right-3 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
  'left-start': 'left-full top-2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
  'left-end': 'left-full bottom-2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
  right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
  'right-start': 'right-full top-2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
  'right-end': 'right-full bottom-2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
};

export type TooltipTrigger = 'hover' | 'click' | 'focus';

export interface TooltipProps extends TooltipPropsBase {
  /** Trigger type for showing tooltip @default 'hover' */
  trigger?: TooltipTrigger;
  /**
   * Aria-label for the trigger when tooltip is closed.
   * Falls back to label text if not provided.
   * Useful for icon-only triggers that need accessible names.
   */
  triggerAriaLabel?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      label,
      children,
      placement = 'top',
      openDelay = 0,
      closeDelay = 0,
      isDisabled = false,
      isOpen: controlledIsOpen,
      defaultIsOpen = false,
      closeOnClick = true,
      closeOnScroll = true,
      closeOnPointerDown = true,
      hasArrow = true,
      arrowSize = ARROW_SIZE,
      offset,
      onOpen,
      onClose,
      className,
      testID,
      trigger = 'hover',
      triggerAriaLabel,
    },
    ref
  ) => {
    const tooltipId = useId();
    const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen);
    const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    // Get label text for aria-label
    const labelText = typeof label === 'string' ? label : triggerAriaLabel;

    // Clear timeouts on unmount
    useEffect(() => {
      return () => {
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      };
    }, []);

    // Handle scroll to close
    useEffect(() => {
      if (!closeOnScroll || !isOpen) return;

      const handleScroll = () => {
        hide();
      };

      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }, [closeOnScroll, isOpen]);

    // Handle pointer down outside to close
    useEffect(() => {
      if (!closeOnPointerDown || !isOpen) return;

      const handlePointerDown = (event: PointerEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          hide();
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);
      return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [closeOnPointerDown, isOpen]);

    const show = useCallback(() => {
      if (isDisabled) return;
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

      if (openDelay > 0) {
        showTimeoutRef.current = setTimeout(() => {
          if (controlledIsOpen === undefined) {
            setInternalIsOpen(true);
          }
          onOpen?.();
        }, openDelay);
      } else {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(true);
        }
        onOpen?.();
      }
    }, [isDisabled, openDelay, controlledIsOpen, onOpen]);

    const hide = useCallback(() => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);

      if (closeDelay > 0) {
        hideTimeoutRef.current = setTimeout(() => {
          if (controlledIsOpen === undefined) {
            setInternalIsOpen(false);
          }
          onClose?.();
        }, closeDelay);
      } else {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(false);
        }
        onClose?.();
      }
    }, [closeDelay, controlledIsOpen, onClose]);

    const toggle = useCallback(() => {
      if (isOpen) {
        hide();
      } else {
        show();
      }
    }, [isOpen, show, hide]);

    const handleClick = useCallback(() => {
      if (trigger === 'click') {
        toggle();
      } else if (closeOnClick && isOpen) {
        hide();
      }
    }, [trigger, toggle, closeOnClick, isOpen, hide]);

    // Handle Escape key to dismiss tooltip
    useEffect(() => {
      if (!isOpen) return;

      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          hide();
        }
      };

      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [isOpen, hide]);

    // Event handlers based on trigger type
    const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};

    // Always enable focus/blur for keyboard accessibility
    // This ensures tooltip is accessible via keyboard regardless of trigger type
    triggerProps.onFocus = show;
    triggerProps.onBlur = hide;

    if (trigger === 'hover' || trigger === 'focus') {
      triggerProps.onMouseEnter = show;
      triggerProps.onMouseLeave = hide;
    }

    if (trigger === 'click') {
      triggerProps.onClick = handleClick;
    } else {
      triggerProps.onClick = handleClick;
    }

    // Calculate arrow border width style
    const arrowStyle: React.CSSProperties = {
      borderWidth: arrowSize,
    };

    return (
      <div ref={ref} className={cn('relative inline-block', className)} data-testid={testID}>
        <div
          ref={triggerRef}
          aria-describedby={isOpen ? tooltipId : undefined}
          // Provide aria-label when tooltip is closed so screen readers still get the info
          aria-label={!isOpen && labelText ? labelText : undefined}
          // Make focusable for keyboard accessibility
          tabIndex={0}
          {...triggerProps}
        >
          {children}
        </div>

        {isOpen && (
          <div
            id={tooltipId}
            role="tooltip"
            className={cn(
              'absolute z-50 px-2.5 py-1.5 text-sm text-white bg-gray-900 rounded shadow-lg',
              'whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-150',
              placementClasses[placement]
            )}
          >
            {label}
            {hasArrow && (
              <span
                className={cn(
                  'absolute w-0 h-0 border-solid',
                  arrowClasses[placement]
                )}
                style={arrowStyle}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
