import { ViewProps, ViewStyle } from 'react-native';

export interface SortOption {
  id: string;
  label: string;
  value: string;
}

export interface SortSelectorProps extends Omit<ViewProps, 'style'> {
  /**
   * Sort options
   */
  options: SortOption[];
  
  /**
   * Currently selected sort option ID
   */
  selectedId?: string;
  
  /**
   * Callback when sort option changes
   */
  onChange?: (optionId: string) => void;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Section for theming
   */
  section?: 'groceries' | 'recipes' | 'default';
}

