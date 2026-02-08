/**
 * StoryAvatar Component Contract
 *
 * A circular avatar with a gradient ring indicator for story-style
 * content. Shows unseen (gradient ring) or seen (gray ring) state.
 */

export type StoryAvatarState = 'unseen' | 'seen';

export interface StoryAvatarPropsBase {
  /** Display name below avatar */
  name: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Ring state indicating story view status @default 'unseen' */
  state?: StoryAvatarState;
  /** Press handler to view the story */
  onPress?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
