/**
 * LandingCuisineCard Component Contract
 *
 * A square image card with a centered label below.
 * Used in "Explore by Cuisine" sections on both landing and recipes pages.
 */

export interface LandingCuisineCardPropsBase {
  /** Cuisine name (e.g., "Indian") */
  name: string;
  /** Square image URL */
  imageUrl?: string;
  /** Number of recipes in this cuisine */
  recipeCount?: number;
  /** Link destination */
  href?: string;
  /** Press handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
