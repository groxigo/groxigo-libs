import { ViewProps, ViewStyle } from 'react-native';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  onPress?: () => void;
}

export interface SidebarProps extends Omit<ViewProps, 'style'> {
  /**
   * Sidebar items
   */
  items: SidebarItem[];
  
  /**
   * Currently selected item ID
   */
  selectedId?: string;
  
  /**
   * Whether sidebar is open
   */
  open: boolean;
  
  /**
   * Callback when sidebar should close
   */
  onClose: () => void;
  
  /**
   * Sidebar width
   * @default 280
   */
  width?: number;
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Section for theming
   */
  section?: 'groceries' | 'recipes' | 'default';
}

