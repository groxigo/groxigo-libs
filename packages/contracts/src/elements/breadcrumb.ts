/**
 * Breadcrumb Component Contract
 *
 * Platform-agnostic interface for Breadcrumb navigation component.
 */

import type { ReactNode } from 'react';

/**
 * Breadcrumb item definition
 */
export interface BreadcrumbItem {
  /** Item label */
  label: string;
  /** Item href/path */
  href?: string;
  /** Whether this is the current/active item */
  isCurrent?: boolean;
  /** Item icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Base Breadcrumb props that all platforms must support
 */
export interface BreadcrumbPropsBase {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator element @default '/' */
  separator?: ReactNode;
  /** Maximum items to show before collapsing */
  maxItems?: number;
  /** Number of items to show at start when collapsed @default 1 */
  itemsBeforeCollapse?: number;
  /** Number of items to show at end when collapsed @default 1 */
  itemsAfterCollapse?: number;
  /** Spacing between items */
  spacing?: number;
  /** Font size */
  fontSize?: 'sm' | 'md' | 'lg';
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Breadcrumb Item component props
 */
export interface BreadcrumbItemPropsBase {
  /** Item href/path */
  href?: string;
  /** Whether this is the current/active item */
  isCurrent?: boolean;
  /** Item content */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
}

/**
 * Breadcrumb Separator props
 */
export interface BreadcrumbSeparatorPropsBase {
  /** Separator content */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
}
