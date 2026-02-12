/**
 * OrderCard Component Contract
 *
 * Platform-agnostic interface for OrderCard component.
 * Displays an order summary with status badge, product thumbnails,
 * date, item count, total, and a reorder action.
 */

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderCardPropsBase {
  /** Unique order identifier */
  orderId: string;
  /** Human-readable order number (e.g. "#ORD-1234") */
  orderNumber: string;
  /** Current order status */
  status: OrderStatus;
  /** Order date string (e.g. "Jan 15, 2026") */
  date: string;
  /** Number of items in the order */
  itemCount: number;
  /** Formatted total price (e.g. "$42.99") */
  total: string;
  /** Array of product image URLs for thumbnails */
  productImages?: string[];
  /** Callback when reorder button is pressed */
  onReorder?: () => void;
  /** Callback when the card is pressed/clicked */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
