/**
 * DietaryPreferenceChip Component Contract
 *
 * A toggleable chip for selecting dietary preferences such as
 * vegetarian, vegan, halal, gluten-free, etc.
 */

export interface DietaryPreferenceChipPropsBase {
  /** Preference label */
  label: string;
  /** Optional icon name */
  icon?: string;
  /** Optional emoji to display before label */
  emoji?: string;
  /** Whether this chip is selected @default false */
  selected?: boolean;
  /** Toggle handler */
  onToggle?: () => void;
  /** Test ID for testing */
  testID?: string;
}
