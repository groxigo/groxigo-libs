/**
 * Tab Component (Web)
 *
 * Individual tab button within the Tabs compound component.
 * Implements @groxigo/contracts TabPropsBase for web platform.
 */

'use client';

import React, { forwardRef, useCallback, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { useTabsContext, getTabVariantClasses } from './Tabs';
import type { TabPropsBase, TabsSize } from '@groxigo/contracts';

// ============================================
// SIZE CLASSES
// ============================================

const sizeClasses: Record<TabsSize, { padding: string; text: string }> = {
  sm: { padding: 'px-3 py-1.5', text: 'text-sm' },
  md: { padding: 'px-4 py-2', text: 'text-base' },
  lg: { padding: 'px-5 py-2.5', text: 'text-lg' },
};

// ============================================
// TAB COMPONENT
// ============================================

export interface TabProps extends TabPropsBase {
  /** Tab value/key */
  value: string;
  /** Tab label */
  children?: ReactNode;
  /** Tab icon */
  icon?: ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, children, icon, disabled = false, className }, ref) => {
    const {
      value: selectedValue,
      onChange,
      variant,
      size,
      colorScheme,
      isFitted,
      isManual,
    } = useTabsContext();

    const isSelected = selectedValue === value;

    const handleClick = useCallback(() => {
      if (!disabled) {
        onChange(value);
      }
    }, [disabled, onChange, value]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isManual) return;

        // Keyboard navigation for tabs
        const target = event.currentTarget;
        const tablist = target.closest('[role="tablist"]');
        if (!tablist) return;

        const tabs = Array.from(
          tablist.querySelectorAll('[role="tab"]:not([disabled])')
        ) as HTMLButtonElement[];
        const currentIndex = tabs.indexOf(target);

        let nextTab: HTMLButtonElement | undefined;

        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault();
            nextTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
            break;
          case 'ArrowRight':
          case 'ArrowDown':
            event.preventDefault();
            nextTab = tabs[currentIndex + 1] || tabs[0];
            break;
          case 'Home':
            event.preventDefault();
            nextTab = tabs[0];
            break;
          case 'End':
            event.preventDefault();
            nextTab = tabs[tabs.length - 1];
            break;
        }

        if (nextTab) {
          nextTab.focus();
          if (!isManual) {
            const nextValue = nextTab.getAttribute('data-value');
            if (nextValue) {
              onChange(nextValue);
            }
          }
        }
      },
      [isManual, onChange]
    );

    const sizeConfig = sizeClasses[size];
    const variantStyles = getTabVariantClasses(variant, colorScheme, isSelected);

    const classes = cn(
      // Base styles
      'flex items-center gap-2 font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      // Size
      sizeConfig.padding,
      sizeConfig.text,
      // Variant
      variantStyles,
      // Fitted
      isFitted && 'flex-1 justify-center',
      // Disabled
      disabled && 'opacity-50 cursor-not-allowed',
      // Custom
      className
    );

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`tab-${value}`}
        data-value={value}
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={classes}
      >
        {icon}
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

export default Tab;
