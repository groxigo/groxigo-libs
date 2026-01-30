/**
 * EmptyState Component Contract
 *
 * Platform-agnostic interface for EmptyState component.
 */

import type { SDUIStyleProps } from '../sdui';

export type EmptyStateSection = 'groceries' | 'recipes' | 'default';

/**
 * Base EmptyState props that all platforms must support
 */
export interface EmptyStatePropsBase extends SDUIStyleProps {
  /** Icon name to display */
  icon?: string;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action button label */
  actionLabel?: string;
  /** Callback when action button is pressed */
  onAction?: () => void;
  /** Section for theming */
  section?: EmptyStateSection;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
