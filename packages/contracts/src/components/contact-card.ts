/**
 * ContactCard Component Contract
 *
 * Platform-agnostic interface for ContactCard component.
 * Displays contact information with email, phone, and a contact action.
 */

export interface ContactCardPropsBase {
  /** Card title @default 'Contact Us' */
  title?: string;
  /** Description text */
  description?: string;
  /** Contact email address */
  email?: string;
  /** Contact phone number */
  phone?: string;
  /** Callback when contact action is pressed */
  onContact?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
