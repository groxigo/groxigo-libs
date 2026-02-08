/**
 * TabList Component (Web)
 *
 * Container for Tab buttons within the Tabs compound component.
 * Implements @groxigo/contracts TabListPropsBase for web platform.
 */

'use client';

import React, { forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { useTabsContext } from './Tabs';
import type { TabListPropsBase, TabsSize, TabsVariant } from '@groxigo/contracts';
import styles from './Tabs.module.css';

// ============================================
// VARIANT CLASS MAP
// ============================================

const variantClassMap: Record<TabsVariant, string> = {
  line: styles.tabListLine,
  enclosed: styles.tabListEnclosed,
  'soft-rounded': styles.tabListSoftRounded,
  'solid-rounded': styles.tabListSolidRounded,
  unstyled: styles.tabListUnstyled,
};

// ============================================
// SIZE CLASS MAP
// ============================================

const sizeClassMap: Record<TabsSize, string> = {
  sm: styles.tabListSm,
  md: styles.tabListMd,
  lg: styles.tabListLg,
};

// ============================================
// TAB LIST COMPONENT
// ============================================

export interface TabListProps extends TabListPropsBase {
  /** Children tab elements */
  children?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className }, ref) => {
    const { variant, size, orientation, isFitted } = useTabsContext();

    const classes = clsx(
      styles.tabList,
      orientation === 'vertical'
        ? styles.tabListVertical
        : styles.tabListHorizontal,
      variantClassMap[variant],
      sizeClassMap[size],
      isFitted && styles.tabListFitted,
      className
    );

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={classes}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

export default TabList;
