/**
 * TabPanels Component (Web)
 *
 * Container for TabPanel components within the Tabs compound component.
 * Implements @groxigo/contracts TabPanelsPropsBase for web platform.
 */

'use client';

import React, { forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';
import type { TabPanelsPropsBase } from '@groxigo/contracts';
import styles from './Tabs.module.css';

// ============================================
// TAB PANELS COMPONENT
// ============================================

export interface TabPanelsProps extends TabPanelsPropsBase {
  /** Tab panel content */
  children?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.tabPanels, className)}>
        {children}
      </div>
    );
  }
);

TabPanels.displayName = 'TabPanels';

export default TabPanels;
