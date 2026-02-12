/**
 * IngredientRow Component Contract
 *
 * Platform-agnostic interface for IngredientRow component.
 * Displays a single ingredient with name, quantity, and optional checkbox.
 */

export interface IngredientRowPropsBase {
  /** Ingredient name */
  name: string;
  /** Quantity string (e.g., "2 cups", "1 tsp") */
  quantity: string;
  /** Whether the ingredient is checked off */
  checked?: boolean;
  /** Callback when the checkbox is toggled */
  onToggle?: () => void;
  /** Test ID for testing */
  testID?: string;
}
