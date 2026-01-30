/**
 * TabList Component (Web)
 *
 * Container for Tab buttons within the Tabs compound component.
 * Implements @groxigo/contracts TabListPropsBase for web platform.
 */

'use client';

import React, { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { useTabsContext } from './Tabs';
import type { TabListPropsBase, TabsSize, TabsVariant } from '@groxigo/contracts';

// ============================================
// SIZE CLASSES
// ============================================

const sizeClasses: Record<TabsSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

// ============================================
// VARIANT CLASSES
// ============================================

const variantClasses: Record<TabsVariant, string> = {
  line: 'border-b border-gray-200',
  enclosed: 'border border-gray-200 rounded-lg p-1 bg-gray-50',
  'soft-rounded': 'gap-1',
  'solid-rounded': 'bg-gray-100 p-1 rounded-lg gap-1',
  unstyled: '',
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

    const classes = cn(
      'flex',
      orientation === 'vertical' ? 'flex-col' : 'flex-row',
      variantClasses[variant],
      sizeClasses[size],
      isFitted && 'w-full',
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
