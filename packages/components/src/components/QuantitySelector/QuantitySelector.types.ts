import { ViewProps, ViewStyle } from 'react-native';

export interface QuantitySelectorProps extends Omit<ViewProps, 'style'> {
  /**
   * Current quantity value
   * @default 1
   */
  value?: number;
  
  /**
   * Callback when quantity changes
   */
  onChange?: (quantity: number) => void;
  
  /**
   * Minimum quantity
   * @default 1
   */
  min?: number;
  
  /**
   * Maximum quantity
   */
  max?: number;
  
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  
  /**
   * Size of the selector
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the selector is disabled
   * @default false
   */
  disabled?: boolean;
  
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

