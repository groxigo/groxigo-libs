/**
 * BadgeCard Component Contract
 *
 * Platform-agnostic interface for BadgeCard component.
 * Displays an achievement badge with icon, name, and earned/locked state.
 */

export type BadgeCardState = 'earned' | 'locked';

export interface BadgeCardPropsBase {
  /** Badge name */
  name: string;
  /** Badge icon name or emoji */
  icon?: string;
  /** Badge state @default 'earned' */
  state?: BadgeCardState;
  /** Badge description */
  description?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
