/**
 * DeliveryInfoCard Component Contract
 *
 * Platform-agnostic interface for the delivery information summary card.
 * Displays estimated delivery time, item count, fee, and change action.
 */

export interface DeliveryInfoCardPropsBase {
  /** Estimated delivery time (e.g. "30-45 min") */
  estimatedTime?: string;
  /** Number of items in the order */
  itemCount?: number;
  /** Formatted delivery fee (e.g. "$4.99") */
  deliveryFee?: string;
  /** Minimum order for free delivery (e.g. "$35.00") */
  freeDeliveryThreshold?: string;
  /** Callback when change is pressed */
  onChange?: () => void;
  /** Test ID for testing */
  testID?: string;
}
