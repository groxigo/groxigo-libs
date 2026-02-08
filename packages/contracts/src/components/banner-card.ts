/**
 * BannerCard Component Contract
 *
 * Platform-agnostic interface for BannerCard component.
 * Promotional banner with background image, headline, subtitle, and CTA button.
 */

export type BannerCardSize = 'sm' | 'md' | 'lg';

export interface BannerCardPropsBase {
  /** Banner headline text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Background image URL */
  imageUrl?: string;
  /** Gradient start color (CSS color) */
  gradientFrom?: string;
  /** Gradient end color (CSS color) */
  gradientTo?: string;
  /** Call-to-action button text */
  ctaText?: string;
  /** Callback when CTA button is pressed */
  onCtaPress?: () => void;
  /** Callback when the banner itself is pressed */
  onPress?: () => void;
  /** Banner size variant @default 'md' */
  size?: BannerCardSize;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
