import { ViewStyle, TextStyle } from 'react-native';
import { InputProps } from '@groxigo/ui-elements';

export interface FormFieldProps extends InputProps {
  /**
   * Field label (required for FormField)
   */
  label: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display below input
   */
  helperText?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Additional container style
   */
  containerStyle?: ViewStyle;
}







