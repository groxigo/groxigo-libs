/**
 * StarRating Element Contract
 *
 * Platform-agnostic interface for the StarRating UI element.
 * Displays a star-based rating with optional edit capability.
 */

export type StarRatingSize = 'xs' | 'sm' | 'md' | 'lg';

export interface StarRatingPropsBase {
  /** Rating value (0 to max) */
  value: number;
  /** Maximum rating value @default 5 */
  max?: number;
  /** Whether rating is editable @default false */
  editable?: boolean;
  /** Callback when rating changes (only when editable) */
  onChange?: (value: number) => void;
  /** Size of the stars @default 'md' */
  size?: StarRatingSize;
  /** Whether to show rating value as text @default false */
  showValue?: boolean;
  /** Number of reviews to display */
  reviewCount?: number;
  /** Test ID for testing */
  testID?: string;
}
