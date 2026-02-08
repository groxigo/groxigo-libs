/**
 * ReferralCard Component Contract
 *
 * Platform-agnostic interface for ReferralCard component.
 * Displays referral invite section with code, stats, and share CTA.
 */

export interface ReferralCardPropsBase {
  /** Card title @default "Invite Friends & Earn" */
  title?: string;
  /** Subtitle / description text */
  subtitle?: string;
  /** Unique referral code */
  referralCode: string;
  /** Number of friends invited */
  invitedCount?: number;
  /** Total amount earned from referrals (formatted string, e.g. "$25.00") */
  earnedAmount?: string;
  /** Callback when share button is pressed */
  onShare?: () => void;
  /** Callback when copy code button is pressed */
  onCopyCode?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
