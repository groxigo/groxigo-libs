/**
 * RatingSummary Component Contract
 *
 * Platform-agnostic interface for RatingSummary component.
 * Displays average rating, star distribution bars, and a "Write a Review" CTA.
 */

export interface RatingSummaryPropsBase {
  /** Average rating (0-5) */
  averageRating: number;
  /** Total number of reviews */
  totalReviews: number;
  /** Count per star level */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  /** Callback when "Write a Review" is pressed */
  onWriteReview?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
