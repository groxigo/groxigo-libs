import { ViewProps, ViewStyle } from 'react-native';

export interface TimePickerProps extends Omit<ViewProps, 'style'> {
  /**
   * Selected time value (Date object with time)
   */
  value?: Date;
  
  /**
   * Callback when time changes
   */
  onChange?: (time: Date) => void;
  
  /**
   * Label for the time picker
   */
  label?: string;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Error message
   */
  error?: string;
  
  /**
   * Helper text
   */
  helperText?: string;
  
  /**
   * Whether the time picker is disabled
   */
  disabled?: boolean;
  
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

