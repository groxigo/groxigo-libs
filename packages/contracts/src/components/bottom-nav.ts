/**
 * BottomNav Component Contract
 *
 * Platform-agnostic interface for BottomNav component.
 */

import type { SDUIStyleProps, BackgroundConfig } from '../sdui';

export type BottomNavSection = 'groceries' | 'recipes' | 'default';
export type BottomNavVariant = 'default' | 'floating';
export type BottomNavActiveIndicator = 'highlight' | 'none';

/**
 * Bottom navigation item definition
 */
export interface BottomNavItem {
  /** Unique item ID */
  id: string;
  /** Item label */
  label: string;
  /** Icon name */
  icon: string;
  /** Badge content (text or number) */
  badge?: string | number;
}

/**
 * Base BottomNav props that all platforms must support
 */
export interface BottomNavPropsBase extends SDUIStyleProps {
  /** Navigation items */
  items: BottomNavItem[];
  /** Background configuration (supports lottie animations) */
  backgroundConfig?: BackgroundConfig;
  /** Currently selected item ID */
  selectedId?: string;
  /** Callback when item is selected */
  onSelect?: (id: string) => void;
  /** Section for theming */
  section?: BottomNavSection;
  /**
   * Visual variant
   * - 'default': Standard bottom nav with border
   * - 'floating': Floating pill with glass effect
   * @default 'default'
   */
  variant?: BottomNavVariant;
  /**
   * Active indicator style (only for floating variant)
   * - 'highlight': Background highlight on active icon
   * - 'none': No background highlight
   * @default 'highlight'
   */
  activeIndicator?: BottomNavActiveIndicator;
  /** Active color override (defaults to theme primary) */
  activeColor?: string;
  /** Inactive color override (defaults to theme text tertiary) */
  inactiveColor?: string;
  /** Highlight background color for active indicator (floating variant only) */
  highlightColor?: string;
  /** Background color tint for the nav bar (floating variant only) */
  backgroundColor?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
