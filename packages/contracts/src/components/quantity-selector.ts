/**
 * QuantitySelector Component Contract
 *
 * Platform-agnostic interface for QuantitySelector component.
 */

export type QuantitySelectorSize = 'sm' | 'md' | 'lg';
export type QuantitySelectorSection = 'groceries' | 'recipes' | 'default';

/**
 * Base QuantitySelector props that all platforms must support
 */
export interface QuantitySelectorPropsBase {
  /** Current quantity value @default 1 */
  value?: number;
  /** Callback when quantity changes */
  onChange?: (quantity: number) => void;
  /** Minimum quantity @default 1 */
  min?: number;
  /** Maximum quantity */
  max?: number;
  /** Step increment @default 1 */
  step?: number;
  /** Size of the selector @default 'md' */
  size?: QuantitySelectorSize;
  /** Whether the selector is disabled @default false */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Section for theming */
  section?: QuantitySelectorSection;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
