/**
 * Tabs Component Contract
 *
 * Platform-agnostic interface for Tabs component.
 */

import type { ReactNode } from 'react';

export type TabsVariant = 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsColorScheme = 'primary' | 'secondary' | 'accent' | 'gray';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsAlign = 'start' | 'center' | 'end';

/**
 * Tab item definition
 */
export interface TabItem {
  /** Tab key/value */
  key: string;
  /** Tab label */
  label: ReactNode;
  /** Tab icon */
  icon?: ReactNode;
  /** Tab badge/count */
  badge?: ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Tab content */
  content?: ReactNode;
}

/**
 * Base Tabs props that all platforms must support
 */
export interface TabsPropsBase {
  /** Active tab key */
  value?: string;
  /** Default active tab (uncontrolled) */
  defaultValue?: string;
  /** Tab items */
  items?: TabItem[];
  /** Tabs variant @default 'line' */
  variant?: TabsVariant;
  /** Tabs size @default 'md' */
  size?: TabsSize;
  /** Color scheme @default 'primary' */
  colorScheme?: TabsColorScheme;
  /** Tabs orientation @default 'horizontal' */
  orientation?: TabsOrientation;
  /** Tab alignment @default 'start' */
  align?: TabsAlign;
  /** Whether tabs should fit container width */
  isFitted?: boolean;
  /** Whether to lazy load tab content */
  isLazy?: boolean;
  /** Whether to keep inactive tab content mounted */
  keepMounted?: boolean;
  /** Whether tabs can be manually activated */
  isManual?: boolean;
  /** Change handler */
  onChange?: (key: string) => void;
  /** Tab list children (alternative to items) */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Tab List props
 */
export interface TabListPropsBase {
  /** Tab buttons */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
}

/**
 * Single Tab props
 */
export interface TabPropsBase {
  /** Tab value/key */
  value: string;
  /** Tab label */
  children?: ReactNode;
  /** Tab icon */
  icon?: ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Additional CSS class (web only) */
  className?: string;
}

/**
 * Tab Panels props
 */
export interface TabPanelsPropsBase {
  /** Tab panel content */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
}

/**
 * Single Tab Panel props
 */
export interface TabPanelPropsBase {
  /** Panel value/key (matches Tab value) */
  value: string;
  /** Panel content */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
}
