/**
 * Footer Component Contract
 *
 * A responsive site footer with link sections, social links,
 * and copyright text. Stacks vertically on mobile, uses a
 * multi-column grid on larger screens.
 */

export interface FooterLink {
  /** Link display text */
  label: string;
  /** Link URL */
  href?: string;
  /** Press handler (alternative to href) */
  onPress?: () => void;
}

export interface FooterSection {
  /** Section heading */
  title: string;
  /** Links within this section */
  links: FooterLink[];
}

export interface FooterPropsBase {
  /** Footer link sections (e.g. About, Quick Links, Customer Care) */
  sections?: FooterSection[];
  /** Social media links */
  socialLinks?: { platform: string; href: string }[];
  /** Copyright text displayed at the bottom */
  copyrightText?: string;
  /** Test ID for testing */
  testID?: string;
}
