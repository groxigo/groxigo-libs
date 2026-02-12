/**
 * AccountCard Component Contract
 *
 * Platform-agnostic interface for AccountCard component.
 * Displays a settings section card with a title, edit action, and child content.
 */

export interface AccountCardPropsBase {
  /** Section title */
  title: string;
  /** Callback when edit is pressed */
  onEdit?: () => void;
  /** Card content */
  children?: React.ReactNode;
  /** Test ID for testing */
  testID?: string;
}
