/**
 * TipSelector Component Contract
 *
 * A row of preset tip amount buttons with optional custom input.
 * Used in checkout flow for delivery driver tips.
 */

export interface TipSelectorPropsBase {
  /** Preset tip amounts @default [1, 2, 3, 5, 10] */
  amounts?: number[];
  /** Currently selected preset amount */
  selectedAmount?: number;
  /** Custom tip amount (when using custom input) */
  customAmount?: number;
  /** Callback when a preset amount is selected */
  onSelect?: (amount: number) => void;
  /** Callback when custom amount changes */
  onCustomChange?: (amount: number) => void;
  /** Whether to show the custom input @default false */
  showCustom?: boolean;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
