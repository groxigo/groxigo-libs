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
import { clsx } from 'clsx';
import type { TooltipPropsBase, TooltipPlacement } from '@groxigo/contracts';
import styles from './Tooltip.module.css';

// Arrow size constant
const ARROW_SIZE = 6;

// Placement class mapping
const placementClassMap: Record<TooltipPlacement, string> = {
  top: styles.placementTop,
  'top-start': styles.placementTopStart,
  'top-end': styles.placementTopEnd,
  bottom: styles.placementBottom,
  'bottom-start': styles.placementBottomStart,
  'bottom-end': styles.placementBottomEnd,
  left: styles.placementLeft,
  'left-start': styles.placementLeftStart,
  'left-end': styles.placementLeftEnd,
  right: styles.placementRight,
  'right-start': styles.placementRightStart,
  'right-end': styles.placementRightEnd,
};

// Arrow class mapping
const arrowClassMap: Record<TooltipPlacement, string> = {
  top: styles.arrowTop,
  'top-start': styles.arrowTopStart,
  'top-end': styles.arrowTopEnd,
  bottom: styles.arrowBottom,
  'bottom-start': styles.arrowBottomStart,
  'bottom-end': styles.arrowBottomEnd,
  left: styles.arrowLeft,
  'left-start': styles.arrowLeftStart,
  'left-end': styles.arrowLeftEnd,
  right: styles.arrowRight,
  'right-start': styles.arrowRightStart,
  'right-end': styles.arrowRightEnd,
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

    // Check if children is likely interactive
    const isChildInteractive = React.isValidElement(children) &&
      typeof children.type === 'string' &&
      ['button', 'a', 'input', 'select', 'textarea'].includes(children.type);

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
      <div ref={ref} className={clsx(styles.wrapper, className)} data-testid={testID}>
        <div
          ref={triggerRef}
          aria-describedby={isOpen ? tooltipId : undefined}
          // Provide aria-label when tooltip is closed so screen readers still get the info
          aria-label={!isOpen && labelText ? labelText : undefined}
          // Make focusable for keyboard accessibility
          tabIndex={isChildInteractive ? undefined : 0}
          {...triggerProps}
        >
          {children}
        </div>

        {isOpen && (
          <div
            id={tooltipId}
            role="tooltip"
            className={clsx(
              styles.tooltip,
              placementClassMap[placement]
            )}
          >
            {label}
            {hasArrow && (
              <span
                className={clsx(
                  styles.arrow,
                  arrowClassMap[placement]
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
