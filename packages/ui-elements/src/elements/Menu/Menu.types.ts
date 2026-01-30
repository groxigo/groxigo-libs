/**
 * Menu Component Types
 *
 * Dropdown menu component for displaying contextual actions.
 */

import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export interface MenuItemData {
  /**
   * Unique identifier for the menu item
   */
  id: string;

  /**
   * Display label for the item
   */
  label: string;

  /**
   * Optional icon name
   */
  icon?: string;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Whether this is a destructive action (will use error color)
   */
  destructive?: boolean;

  /**
   * Callback when item is selected
   */
  onPress?: () => void;
}

export interface MenuDividerData {
  /**
   * Type discriminator for divider
   */
  type: 'divider';
}

export type MenuItemType = MenuItemData | MenuDividerData;

export interface MenuProps {
  /**
   * Whether the menu is visible
   */
  visible: boolean;

  /**
   * Callback when menu should close
   */
  onClose: () => void;

  /**
   * Menu items to display
   */
  items: MenuItemType[];

  /**
   * The trigger element that opens the menu
   */
  trigger?: ReactNode;

  /**
   * Anchor position for the menu
   * @default 'bottom-start'
   */
  anchor?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

  /**
   * Custom style for menu container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Whether clicking backdrop closes menu
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Whether pressing escape closes menu (web only)
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Accessibility label for the menu
   */
  accessibilityLabel?: string;
}

export interface MenuItemProps {
  /**
   * Menu item data
   */
  item: MenuItemData;

  /**
   * Callback when item is pressed
   */
  onPress: () => void;

  /**
   * Custom style
   */
  style?: StyleProp<ViewStyle>;
}

export interface MenuTriggerProps {
  /**
   * Trigger content
   */
  children: ReactNode;

  /**
   * Callback when trigger is pressed
   */
  onPress: () => void;

  /**
   * Custom style
   */
  style?: StyleProp<ViewStyle>;
}
