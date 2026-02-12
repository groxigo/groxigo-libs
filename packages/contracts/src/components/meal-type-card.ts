/**
 * MealTypeCard Component Contract
 *
 * A selectable card for meal type categories (Breakfast, Lunch, Dinner, Snack).
 * Displays an icon or emoji with a label, and highlights when selected.
 */

export interface MealTypeCardPropsBase {
  /** Meal type label */
  label: string;
  /** Icon name for the meal type */
  icon?: string;
  /** Emoji for the meal type (alternative to icon) */
  emoji?: string;
  /** Whether this meal type is selected @default false */
  selected?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
