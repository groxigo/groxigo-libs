/**
 * BrandCard Component Contract
 *
 * A vertical card displaying a brand logo in a circular frame
 * with the brand name below. Used in brand browse sections.
 */

export interface BrandCardPropsBase {
  /** Brand name */
  name: string;
  /** Brand logo URL */
  logoUrl?: string;
  /** Press handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
