/**
 * HeroSection Component Contract
 *
 * Full-bleed hero banner with headline, subheadline,
 * email capture form, and sign-in link. Used on marketing landing page.
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
  /** "Already have an account?" link handler */
  onSignIn: () => void;
  /** CTA button text @default "Get Started" */
  ctaLabel?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
