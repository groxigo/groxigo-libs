import { ViewProps, ViewStyle } from 'react-native';

export interface DatePickerProps extends Omit<ViewProps, 'style'> {
  /**
   * Selected date value
   */
  value?: Date;
  
  /**
   * Callback when date changes
   */
  onChange?: (date: Date) => void;
  
  /**
   * Label for the date picker
   */
  label?: string;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display
   */
  helperText?: string;
  
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;
  
  /**
   * Minimum selectable date
   */
  minimumDate?: Date;
  
  /**
   * Maximum selectable date
   */
  maximumDate?: Date;
  
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Section for theming
   */
  section?: 'groceries' | 'recipes' | 'default';
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Container style
   */
  containerStyle?: ViewStyle;
}

