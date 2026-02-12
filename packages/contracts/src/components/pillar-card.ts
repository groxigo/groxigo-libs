/**
 * PillarCard Component Contract
 *
 * A vertical card with 16:9 image, title, description, and CTA link.
 * Used in the "Why Groxigo" pillars section on the landing page.
 */

export interface PillarCardPropsBase {
  /** Card title (e.g., "2,000+ Authentic Products") */
  title: string;
  /** Card body text */
  description: string;
  /** Link text (e.g., "Browse Products ->") */
  ctaLabel: string;
  /** Link destination */
  ctaHref: string;
  /** 16:9 image URL */
  imageUrl?: string;
  /** Optional press handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
