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
  /** Review headline */
  title?: string;
  /** Review text content */
  reviewText: string;
  /** Whether the reviewer has a verified purchase */
  isVerifiedPurchase?: boolean;
  /** Number of "helpful" votes */
  helpfulCount?: number;
  /** Callback when "Helpful" button is pressed */
  onHelpful?: () => void;
  /** Review photo URLs (max 5) */
  imageUrls?: string[];
  /** Whether this is the current user's own review */
  isOwnReview?: boolean;
  /** Callback when "Edit" is pressed (shown only for own reviews) */
  onEdit?: () => void;
  /** Callback when "Delete" is pressed (shown only for own reviews) */
  onDelete?: () => void;
  /** Test ID for testing */
  testID?: string;
}
