/**
 * NutritionTable Component Contract
 *
 * Platform-agnostic interface for an FDA-style nutrition facts table.
 * Displays serving info, calories, nutrient rows, and optional vitamins.
 */

/**
 * A single nutrient row in the nutrition table
 */
export interface NutritionRow {
  /** Nutrient label (e.g. "Total Fat", "Sodium") */
  label: string;
  /** Nutrient value with unit (e.g. "8g", "160mg") */
  value: string;
  /** Percent daily value (e.g. "10%") */
  dailyValue?: string;
  /** Whether this row is indented (sub-nutrient) @default false */
  indent?: boolean;
  /** Whether the label is bold @default false */
  bold?: boolean;
}

/**
 * NutritionTable component props contract
 */
export interface NutritionTablePropsBase {
  /** Serving size description (e.g. "1 cup (228g)") */
  servingSize?: string;
  /** Number of servings per container (e.g. "2") */
  servingsPerContainer?: string;
  /** Calorie count (e.g. "250") */
  calories?: string;
  /** Array of nutrient rows */
  rows: NutritionRow[];
  /** Vitamins and minerals section */
  vitamins?: { label: string; value: string }[];
  /** Test ID for testing */
  testID?: string;
}
