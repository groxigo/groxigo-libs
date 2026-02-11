/**
 * LandingHeader Component Contract
 *
 * A sticky transparent-to-solid header for the marketing landing page.
 * Transitions from transparent (overlaying hero) to solid on scroll.
 */

export interface LandingHeaderPropsBase {
  /** Optional logo image URL (defaults to text "Groxigo") */
  logoSrc?: string;
  /** Sign In button handler */
  onSignIn: () => void;
  /** Sign In button label @default "Sign In" */
  signInLabel?: string;
  /** Controls transparent vs solid background @default false */
  isScrolled?: boolean;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
