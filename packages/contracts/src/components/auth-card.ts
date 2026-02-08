/**
 * AuthCard Component Contract
 *
 * Platform-agnostic interface for AuthCard component.
 * Full authentication form with email/password inputs,
 * social login buttons, and mode toggling (sign in / sign up).
 */

export type AuthMode = 'signin' | 'signup';

export interface AuthCardPropsBase {
  /** Authentication mode @default 'signin' */
  mode?: AuthMode;
  /** Callback when form is submitted with email and password */
  onSubmit?: (email: string, password: string) => void;
  /** Callback when Google auth button is pressed */
  onGoogleAuth?: () => void;
  /** Callback when Apple auth button is pressed */
  onAppleAuth?: () => void;
  /** Callback to toggle between signin and signup modes */
  onToggleMode?: () => void;
  /** Callback when forgot password link is pressed */
  onForgotPassword?: () => void;
  /** Whether the form is in a loading state */
  isLoading?: boolean;
  /** Error message to display */
  error?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
