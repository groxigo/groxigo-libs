/**
 * ChallengeCard Component Contract
 *
 * Platform-agnostic interface for ChallengeCard component.
 * Displays a gamification challenge with progress bar, reward info, and deadline.
 */

export interface ChallengeCardPropsBase {
  /** Challenge title */
  title: string;
  /** Challenge description */
  description?: string;
  /** Current progress count */
  progress: number;
  /** Total required to complete the challenge */
  total: number;
  /** Reward text (e.g. "+50 pts") */
  reward?: string;
  /** Deadline text (e.g. "3 days left") */
  deadline?: string;
  /** Test ID for testing */
  testID?: string;
}
