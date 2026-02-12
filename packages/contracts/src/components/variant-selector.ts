/**
 * VariantSelector Component Contract
 *
 * Platform-agnostic interface for selecting a product variant (size, weight, etc.).
 */

export interface VariantOption {
  /** Display label */
  label: string;
  /** Formatted price string */
  price?: string;
  /** Unique value for this option */
  value: string;
  /** Whether this option is unavailable (out of stock) */
  disabled?: boolean;
}

export interface VariantSelectorPropsBase {
  /** Available variant options */
  options: VariantOption[];
  /** Currently selected value */
  selectedValue?: string;
  /** Optional section label displayed above the options (e.g. "Size", "Pack") */
  label?: string;
  /** Selection handler */
  onSelect?: (value: string) => void;
  /** Test ID for testing */
  testID?: string;
}
