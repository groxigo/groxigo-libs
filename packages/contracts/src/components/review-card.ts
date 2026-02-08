/**
 * ReviewCard Component Contract
 *
 * Platform-agnostic interface for ReviewCard component.
 * Displays a user review with avatar, name, rating, date, and review text.
 */

export interface ReviewCardPropsBase {
  /** Reviewer avatar URL */
  avatarUrl?: string;
  /** Reviewer name */
  name: string;
  /** Review date string */
  date: string;
  /** Star rating (0-5) */
  rating: number;
  /** Review text content */
  reviewText: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
