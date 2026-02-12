/**
 * CuisineCard Component Contract
 *
 * A visually rich card for displaying cuisine types with image,
 * name, and recipe count. Features gradient overlay for text readability.
 */

export type CuisineCardSize = 'sm' | 'md' | 'lg';
export type CuisineCardVariant = 'default' | 'compact' | 'featured';

export interface CuisineCardPropsBase {
  /** Cuisine slug for navigation */
  slug: string;
  /** Cuisine display name */
  name: string;
  /** Background image URL */
  imageUrl?: string;
  /** Number of recipes in this cuisine */
  recipeCount?: number;
  /** Card size @default 'md' */
  size?: CuisineCardSize;
  /** Card variant @default 'default' */
  variant?: CuisineCardVariant;
  /** Fixed width (for grid layouts) */
  width?: number;
  /** Press handler */
  onPress?: () => void;
  /** Test ID */
  testID?: string;
}
