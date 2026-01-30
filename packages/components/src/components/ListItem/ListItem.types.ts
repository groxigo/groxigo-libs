import { ViewProps, ViewStyle, ImageSourcePropType } from 'react-native';

export interface ListItemProps extends Omit<ViewProps, 'style'> {
  /**
   * Title text
   */
  title: string;
  
  /**
   * Subtitle/description text
   */
  subtitle?: string;
  
  /**
   * Left icon name
   */
  leftIcon?: string;
  
  /**
   * Right icon name
   */
  rightIcon?: string;
  
  /**
   * Left image source
   */
  leftImage?: ImageSourcePropType;
  
  /**
   * Right content (custom component)
   */
  rightContent?: React.ReactNode;
  
  /**
   * Badge text
   */
  badge?: string | number;
  
  /**
   * Whether the item is selected
   * @default false
   */
  selected?: boolean;
  
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Callback when item is pressed
   */
  onPress?: () => void;
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Section for theming
   */
  section?: 'groceries' | 'recipes' | 'default';
}

