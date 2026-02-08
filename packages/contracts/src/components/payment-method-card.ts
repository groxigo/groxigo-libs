/**
 * PaymentMethodCard Component Contract
 *
 * Platform-agnostic interface for PaymentMethodCard component.
 * Displays a saved payment card with radio selection, brand icon,
 * masked card number, expiry, and optional default badge.
 */

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';

export interface PaymentMethodCardPropsBase {
  /** Unique payment method ID */
  id: string;
  /** Card brand */
  brand: CardBrand;
  /** Last four digits of card number */
  lastFour: string;
  /** Card expiry (e.g. "12/28") */
  expiry: string;
  /** Whether this payment method is currently selected @default false */
  selected?: boolean;
  /** Whether this is the default payment method @default false */
  isDefault?: boolean;
  /** Callback when the payment method is selected via radio */
  onSelect?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
