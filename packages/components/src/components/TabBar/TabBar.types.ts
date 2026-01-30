import { ViewProps, ViewStyle } from 'react-native';
import { TabItem } from '@groxigo/ui-elements';

export interface TabBarProps extends Omit<ViewProps, 'style'> {
  /**
   * Tab items
   */
  items: TabItem[];
  
  /**
   * Currently selected tab ID
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
  variant?: 'default' | 'pills' | 'underline';
  
  /**
   * Size of the tabs
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Section for theming
   */
  section?: 'groceries' | 'recipes' | 'default';
}

