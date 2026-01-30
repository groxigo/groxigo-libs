/**
 * Rating Component Contract
 *
 * Platform-agnostic interface for Rating component.
 */

export type RatingSize = 'xs' | 'sm' | 'md' | 'lg';
export type RatingSection = 'groceries' | 'recipes' | 'default';

/**
 * Base Rating props that all platforms must support
 */
export interface RatingPropsBase {
  /** Rating value (0 to max) */
  value: number;
  /** Maximum rating value @default 5 */
  max?: number;
  /** Whether rating is editable @default false */
  editable?: boolean;
  /** Callback when rating changes (only when editable) */
  onChange?: (value: number) => void;
  /** Size of the stars @default 'md' */
  size?: RatingSize;
  /** Whether to show rating value as text @default false */
  showValue?: boolean;
  /** Section for theming */
  section?: RatingSection;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
