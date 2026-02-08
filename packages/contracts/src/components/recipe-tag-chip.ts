/**
 * RecipeTagChip Component Contract
 *
 * A small colored pill for displaying recipe tags like dietary info,
 * cuisine type, or difficulty level.
 */

export type RecipeTagColorScheme = 'success' | 'warning' | 'info' | 'neutral';

export interface RecipeTagChipPropsBase {
  /** Tag label text */
  label: string;
  /** Color scheme @default 'neutral' */
  colorScheme?: RecipeTagColorScheme;
  /** Press handler */
  onPress?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
