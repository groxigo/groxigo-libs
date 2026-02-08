/**
 * ProfileHeader Component Contract
 *
 * Platform-agnostic interface for ProfileHeader component.
 * Displays user profile info with avatar, name, email, phone,
 * and an edit action.
 */

export interface ProfileHeaderPropsBase {
  /** User display name */
  name: string;
  /** User email address */
  email?: string;
  /** User phone number */
  phone?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Callback when edit button is pressed */
  onEdit?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
