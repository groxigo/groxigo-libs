/**
 * HeroSection Component Contract
 *
 * Full-bleed hero banner with headline, subheadline,
 * email capture form, "or" divider, and SSO icon buttons.
 * Used on marketing landing page.
 */

export interface HeroSectionPropsBase {
  /** Main headline text */
  headline: string;
  /** Supporting text */
  subheadline: string;
  /** Hero background image URL */
  backgroundImage?: string;
  /** Form submit handler (receives email) */
  onGetStarted: (email: string) => void;
  /** CTA button text @default "Continue" */
  ctaLabel?: string;
  /** Email input placeholder @default "Sign in or sign up using email" */
  emailPlaceholder?: string;
  /** Text for the "or" divider between email form and SSO @default "or" */
  dividerText?: string;
  /** SSO callbacks — shown as icon circles below "or" divider */
  onGoogleAuth?: () => void;
  onFacebookAuth?: () => void;
  onAppleAuth?: () => void;
  /** Callback when user clicks "Continue as guest" */
  onContinueAsGuest?: () => void;
  /** Guest CTA label @default "Just browsing? Continue as guest" */
  guestLabel?: string;
  /** Test ID for testing */
  testID?: string;
}
