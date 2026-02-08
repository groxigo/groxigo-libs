/**
 * TabPanel Component (Web)
 *
 * Content panel for a tab within the Tabs compound component.
 * Implements @groxigo/contracts TabPanelPropsBase for web platform.
 */

'use client';

import React, { forwardRef, useRef, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { useTabsContext } from './Tabs';
import type { TabPanelPropsBase } from '@groxigo/contracts';
import styles from './Tabs.module.css';

// ============================================
// TAB PANEL COMPONENT
// ============================================

export interface TabPanelProps extends TabPanelPropsBase {
  /** Panel value/key (matches Tab value) */
  value: string;
  /** Panel content */
  children?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, children, className }, ref) => {
    const { value: selectedValue, isLazy, keepMounted } = useTabsContext();
    const isSelected = selectedValue === value;

    // Track if this panel has ever been selected (for lazy loading with keepMounted)
    const hasBeenSelected = useRef(false);
    if (isSelected) {
      hasBeenSelected.current = true;
    }

    // Determine if content should be rendered
    const shouldRender =
      !isLazy || // Not lazy: always render
      isSelected || // Currently selected: always render
      (keepMounted && hasBeenSelected.current); // Keep mounted: render if was selected before

    // If we shouldn't render, return hidden empty panel for accessibility
    if (!shouldRender) {
      return (
        <div
          ref={ref}
          role="tabpanel"
          id={`tabpanel-${value}`}
          aria-labelledby={`tab-${value}`}
          hidden
        />
      );
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        hidden={!isSelected}
        tabIndex={0}
        className={clsx(
          styles.tabPanel,
          !isSelected && styles.tabPanelHidden,
          className
        )}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

export default TabPanel;
