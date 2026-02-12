/**
 * LandingCuisineCard Component Contract
 *
 * A square image card with a centered label below.
 * Used in the "Explore by Cuisine" section on the landing page.
 */

export interface LandingCuisineCardPropsBase {
  /** Cuisine name (e.g., "Indian") */
  name: string;
  /** Square image URL */
  imageUrl?: string;
  /** Link destination */
  href?: string;
  /** Press handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
