/**
 * Menu Component Contract
 *
 * Platform-agnostic interface for Menu/Dropdown Menu component.
 */

import type { ReactNode } from 'react';

export type MenuPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

/**
 * Menu item definition
 */
export interface MenuItem {
  /** Item key */
  key: string;
  /** Item label */
  label: ReactNode;
  /** Item icon */
  icon?: ReactNode;
  /** Right element (badge, shortcut, etc.) */
  rightElement?: ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is destructive/danger */
  isDestructive?: boolean;
  /** Submenu items */
  children?: MenuItem[];
  /** Click handler */
  onClick?: () => void;
}

/**
 * Base Menu props that all platforms must support
 */
export interface MenuPropsBase {
  /** Whether menu is open */
  isOpen?: boolean;
  /** Default open state (uncontrolled) */
  defaultIsOpen?: boolean;
  /** Menu items */
  items?: MenuItem[];
  /** Menu placement @default 'bottom-start' */
  placement?: MenuPlacement;
  /** Whether clicking outside closes menu @default true */
  closeOnSelect?: boolean;
  /** Whether pressing Escape closes menu @default true */
  closeOnBlur?: boolean;
  /** Whether to auto focus first item @default true */
  autoSelect?: boolean;
  /** Open state change handler */
  onOpen?: () => void;
  /** Close state change handler */
  onClose?: () => void;
  /** Menu trigger element */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Menu Button/Trigger props
 */
export interface MenuButtonPropsBase {
  /** Button content */
  children?: ReactNode;
  /** Whether to show dropdown icon */
  showIcon?: boolean;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Menu List props
 */
export interface MenuListPropsBase {
  /** Menu items */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Menu Item props
 */
export interface MenuItemPropsBase {
  /** Item key */
  value?: string;
  /** Item label */
  children?: ReactNode;
  /** Item icon */
  icon?: ReactNode;
  /** Right element */
  rightElement?: ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is destructive/danger */
  isDestructive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
}

/**
 * Menu Group props
 */
export interface MenuGroupPropsBase {
  /** Group title */
  title?: string;
  /** Group items */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Menu Divider props
 */
export interface MenuDividerPropsBase {
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
