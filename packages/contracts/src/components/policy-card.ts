/**
 * PolicyCard Component Contract
 *
 * Platform-agnostic interface for a policy notice card.
 * Displays an informational or warning message with an icon.
 */

/** Visual variant of the policy card */
export type PolicyCardVariant = 'info' | 'warning';

export interface PolicyCardPropsBase {
  /** Visual variant @default 'info' */
  variant?: PolicyCardVariant;
  /** Policy message body */
  message: string;
  /** Optional title above the message */
  title?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
