import { ViewProps, ViewStyle, TextStyle } from 'react-native';

export interface PriceDisplayProps extends Omit<ViewProps, 'style'> {
  /**
   * Price value (number or string)
   */
  price: number | string;
  
  /**
   * Currency code
   * @default 'USD'
   */
  currency?: string;
  
  /**
   * Original price (for showing discount)
   */
  originalPrice?: number | string;
  
  /**
   * Size of the price text
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether to show currency symbol
   * @default true
   */
  showCurrency?: boolean;
  
  /**
   * Text style
   */
  style?: TextStyle;
  
  /**
   * Container style
   */
  containerStyle?: ViewStyle;
}

