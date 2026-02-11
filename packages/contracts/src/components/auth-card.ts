/**
 * AuthCard Component Contract
 *
 * Platform-agnostic interface for AuthCard component.
 * Email-first (identifier-first) auth flow with 3 steps:
 * identify → sign-in or sign-up (auto-routed by email check).
 */

export type AuthMode = 'signin' | 'signup';
export type AuthStep = 'identify' | 'signin' | 'signup';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  termsAccepted: boolean;
}

export interface AuthCardPropsBase {
  /** If set, skip identify step and go directly to that form. */
  mode?: AuthMode;
  /** Pre-fill email. Combined with mode, can skip to step 2. */
  initialEmail?: string;
  /** Called on identify step to check if email exists. Drives step transition. */
  onCheckEmail?: (email: string) => Promise<{ exists: boolean }>;
  /** Sign-in callback */
  onSignIn?: (email: string, password: string) => void;
  /** Sign-up callback */
  onSignUp?: (data: SignUpData) => void;
  /** @deprecated Use onSignIn. Falls back if onSignIn not provided. */
  onSubmit?: (email: string, password: string) => void;
  /** SSO callbacks */
  onGoogleAuth?: () => void;
  onFacebookAuth?: () => void;
  onAppleAuth?: () => void;
  /** @deprecated No longer needed — component manages steps internally. */
  onToggleMode?: () => void;
  /** Forgot password (receives email so target page can pre-fill) */
  onForgotPassword?: (email: string) => void;
  /** Whether the form is in a loading state */
  isLoading?: boolean;
  /** Error message to display */
  error?: string;
  /** URL to terms of service page */
  termsUrl?: string;
  /** URL to privacy policy page */
  privacyUrl?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
