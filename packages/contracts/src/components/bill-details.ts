/**
 * BillDetails Component Contract
 *
 * Platform-agnostic interface for the bill/order summary component.
 * Displays line items (subtotal, savings, fees, tip) with a total row.
 */

/**
 * A single line item in the bill breakdown
 */
export interface BillDetailsLineItem {
  /** Display label (e.g. "Subtotal", "Delivery Fee") */
  label: string;
  /** Formatted value string (e.g. "$12.99", "FREE") */
  value: string;
  /** Line item type for styling @default 'default' */
  type?: 'default' | 'savings' | 'free' | 'total';
}

/**
 * BillDetails component props contract
 */
export interface BillDetailsPropsBase {
  /** Array of line items to display */
  items: BillDetailsLineItem[];
  /** Total row displayed below the divider */
  total: { label: string; value: string };
  /** Test ID for testing */
  testID?: string;
}
