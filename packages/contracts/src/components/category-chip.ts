/**
 * CategoryChip Component Contract
 *
 * A horizontal pill-shaped chip for filtering by category.
 * Toggles between active and inactive states.
 */

export interface CategoryChipPropsBase {
  /** Category label */
  label: string;
  /** Optional icon name */
  icon?: string;
  /** Optional thumbnail image URL (circular, displayed before label) */
  imageUrl?: string;
  /** Whether this chip is selected @default false */
  selected?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
