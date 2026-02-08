/**
 * Tab Component (Web)
 *
 * Individual tab button within the Tabs compound component.
 * Implements @groxigo/contracts TabPropsBase for web platform.
 */

'use client';

import React, { forwardRef, useCallback, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { useTabsContext, getTabVariantClasses } from './Tabs';
import type { TabPropsBase, TabsSize } from '@groxigo/contracts';
import styles from './Tabs.module.css';

// ============================================
// SIZE CLASS MAP
// ============================================

const sizeClassMap: Record<TabsSize, string> = {
  sm: styles.tabSm,
  md: styles.tabMd,
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

    const variantStyles = getTabVariantClasses(variant, isSelected);

    const classes = clsx(
      styles.tab,
      sizeClassMap[size],
      variantStyles,
      isFitted && styles.tabFitted,
      disabled && styles.tabDisabled,
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
