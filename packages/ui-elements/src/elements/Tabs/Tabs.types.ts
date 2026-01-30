/**
 * Tabs Component Types
 *
 * Extends TabsPropsBase from @groxigo/contracts
 */

import type { ViewProps, ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';
import type {
  TabsPropsBase,
  TabItem as ContractTabItem,
  TabsSize,
  TabsVariant as ContractTabsVariant,
  TabsColorScheme,
  TabPanelPropsBase,
} from '@groxigo/contracts';

// Re-export contract types
export type { TabsSize, TabsColorScheme } from '@groxigo/contracts';

/**
 * Tabs variant - includes contract variants plus RN-specific ones
 * Contract variants: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' | 'unstyled'
 * Additional RN variants: 'default' | 'pills' | 'underline'
 */
export type TabsVariant = ContractTabsVariant | 'default' | 'pills' | 'underline';

/**
 * Tab item interface matching contract with RN-specific additions
 */
export interface TabItem {
  /**
   * Tab key/value - matches contract's 'key' property
   */
  key: string;

  /**
   * @deprecated Use `key` instead. Will be removed in next major version.
   * Unique identifier for the tab (alias for key)
   */
  id?: string;

  /**
   * Display label for the tab
   */
  label: ReactNode;

  /**
   * Icon to display (optional)
   */
  icon?: ReactNode;

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;

  /**
   * Badge content (optional)
   */
  badge?: ReactNode;

  /**
   * Tab content (from contract)
   */
  content?: ReactNode;
}

export interface TabsProps extends Omit<TabsPropsBase, 'className' | 'items' | 'variant'>, Omit<ViewProps, 'style'> {
  /**
   * Tab items to display
   */
  items: TabItem[];

  /**
   * Active tab key (matches contract's 'value' property)
   */
  value?: string;

  /**
   * @deprecated Use `value` instead. Will be removed in next major version.
   */
  selectedId?: string;

  /**
   * Callback when tab is selected (matches contract's 'onChange' property)
   */
  onChange?: (key: string) => void;

  /**
   * @deprecated Use `onChange` instead. Will be removed in next major version.
   */
  onSelect?: (id: string) => void;

  /**
   * Size of the tabs
   * @default 'md'
   */
  size?: TabsSize;

  /**
   * Variant of the tabs
   * @default 'line'
   */
  variant?: TabsVariant;

  /**
   * Color scheme
   * @default 'primary'
   */
  colorScheme?: TabsColorScheme;

  /**
   * Whether tabs take full width (alias for isFitted)
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Container style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test ID
   */
  testID?: string;
}

export interface TabPanelProps extends Omit<TabPanelPropsBase, 'className' | 'value'> {
  /**
   * Panel content
   */
  children: React.ReactNode;

  /**
   * Whether this panel is active
   */
  isActive?: boolean;

  /**
   * Container style (React Native specific)
   */
  style?: StyleProp<ViewStyle>;
}
