import type { ViewProps, ViewStyle } from 'react-native';
import type { TabItem, TabsSize, TabsVariant } from '@groxigo/ui-elements';

export interface TabBarProps extends Omit<ViewProps, 'style'> {
  /**
   * Tab items
   */
  items: TabItem[];

  /**
   * Currently selected tab key
   */
  selectedId?: string;

  /**
   * Callback when tab is selected
   */
  onSelect?: (id: string) => void;

  /**
   * Variant of the tab bar
   * @default 'default'
   */
  variant?: TabsVariant;

  /**
   * Size of the tabs
   * @default 'md'
   */
  size?: TabsSize;

  /**
   * Container style
   */
  style?: ViewStyle;
}

