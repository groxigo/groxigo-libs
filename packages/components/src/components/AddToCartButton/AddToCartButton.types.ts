import { ButtonProps } from '@groxigo/ui-elements';

export interface AddToCartButtonProps extends Omit<ButtonProps, 'children'> {
  /**
   * Button label
   * @default 'Add to Cart'
   */
  label?: string;
  
  /**
   * Whether item is in cart
   * @default false
   */
  inCart?: boolean;
  
  /**
   * Quantity in cart
   */
  quantity?: number;
  
  /**
   * Callback when button is pressed
   */
  onPress: () => void;
}

