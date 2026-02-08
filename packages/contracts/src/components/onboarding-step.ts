/**
 * OnboardingStep Component Contract
 *
 * A full-page onboarding step with illustration, title, description,
 * step indicators, and a call-to-action button.
 */

export interface OnboardingStepPropsBase {
  /** Step title text */
  title: string;
  /** Step description text */
  description: string;
  /** Custom illustration node (replaces imageUrl) */
  illustration?: React.ReactNode;
  /** URL for step illustration image */
  imageUrl?: string;
  /** Current step number (1-based) */
  currentStep: number;
  /** Total number of onboarding steps */
  totalSteps: number;
  /** CTA button text @default 'Next' */
  ctaText?: string;
  /** Callback when CTA button is pressed */
  onNext?: () => void;
  /** Callback when skip is pressed */
  onSkip?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
