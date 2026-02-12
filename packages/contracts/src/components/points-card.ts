/**
 * PointsCard Component Contract
 *
 * Platform-agnostic interface for PointsCard component.
 * Displays loyalty points balance, tier info, progress toward next tier, and redeem CTA.
 */

export interface PointsCardPropsBase {
  /** Current loyalty points balance */
  points: number;
  /** Current tier name (e.g. "Gold", "Silver") */
  tier?: string;
  /** Next tier name to unlock */
  nextTier?: string;
  /** Points remaining to reach next tier */
  pointsToNextTier?: number;
  /** Progress percentage toward next tier (0-100) */
  progressPercent?: number;
  /** Callback when redeem button is pressed */
  onRedeem?: () => void;
  /** Callback when view history link is pressed */
  onViewHistory?: () => void;
  /** Test ID for testing */
  testID?: string;
}
