/**
 * ErrorState Component Contract
 *
 * Platform-agnostic interface for ErrorState component.
 */

export type ErrorStateSection = 'groceries' | 'recipes' | 'default';

/**
 * Base ErrorState props that all platforms must support
 */
export interface ErrorStatePropsBase {
  /** Error title */
  title?: string;
  /** Error message */
  message: string;
  /** Retry button label */
  retryLabel?: string;
  /** Callback when retry button is pressed */
  onRetry?: () => void;
  /** Section for theming */
  section?: ErrorStateSection;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
