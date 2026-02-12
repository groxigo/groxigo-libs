/**
 * CartItem Component Contract
 *
 * Platform-agnostic interface for CartItem component.
 */

import type { SDUIStyleProps } from '../sdui';

export type CartItemSection = 'groceries' | 'recipes' | 'default';

/**
 * Base CartItem props that all platforms must support
 */
export interface CartItemPropsBase extends SDUIStyleProps {
  /** Item ID */
  id?: string;
  /** Product image URL */
  imageUrl?: string;
  /** Product title */
  title: string;
  /** Product description/subtitle */
  description?: string;
  /** Product price */
  price: number | string;
  /** Currency code @default 'USD' */
  currency?: string;
  /** Quantity value @default 1 */
  quantity?: number;
  /** Callback when quantity changes */
  onQuantityChange?: (quantity: number) => void;
  /** Callback when item is removed */
  onRemove?: () => void;
  /** Whether item is disabled @default false */
  disabled?: boolean;
  /** Section for theming */
  section?: CartItemSection;
  /** Test ID for testing */
  testID?: string;
}
