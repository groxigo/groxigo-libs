/**
 * Avatar Component Contract
 *
 * Platform-agnostic interface for Avatar component.
 */

import type { ReactNode } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarVariant = 'circle' | 'square';

/**
 * Base Avatar props that all platforms must support
 */
export interface AvatarPropsBase {
  /** Image source URL */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** User name (used for initials fallback) */
  name?: string;
  /** Avatar size @default 'md' */
  size?: AvatarSize;
  /** Avatar shape @default 'circle' */
  variant?: AvatarVariant;
  /** Show online/offline badge */
  showBadge?: boolean;
  /** Badge color */
  badgeColor?: 'green' | 'red' | 'yellow' | 'gray';
  /** Fallback icon or content */
  fallback?: ReactNode;
  /** Border color */
  borderColor?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Avatar Group props
 */
export interface AvatarGroupPropsBase {
  /** Maximum avatars to show before +N */
  max?: number;
  /** Avatar size for all children */
  size?: AvatarSize;
  /** Spacing between avatars (negative for overlap) */
  spacing?: number;
  /** Children (Avatar components) */
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}
