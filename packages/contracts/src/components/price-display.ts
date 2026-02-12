/**
 * PriceDisplay Component Contract
 *
 * Platform-agnostic interface for PriceDisplay component.
 */

export type PriceDisplaySize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Base PriceDisplay props that all platforms must support
 */
export interface PriceDisplayPropsBase {
  /** Price value (number or string) */
  price: number | string;
  /** Currency code @default 'USD' */
  currency?: string;
  /** Original price (for showing discount) */
  originalPrice?: number | string;
  /** Size of the price text @default 'md' */
  size?: PriceDisplaySize;
  /** Whether to show currency symbol @default true */
  showCurrency?: boolean;
  /** Test ID for testing */
  testID?: string;
}
