/**
 * Breadcrumb Component Types
 */

import type { ViewProps, ViewStyle, StyleProp } from 'react-native';

export type BreadcrumbSize = 'sm' | 'md' | 'lg';
export type BreadcrumbColorScheme = 'primary' | 'secondary' | 'accent' | 'neutral';

export interface BreadcrumbItem {
  /**
   * Display label for the breadcrumb item
   */
  label: string;

  /**
   * URL for the link (optional)
   */
  href?: string;

  /**
   * Press handler (optional)
   */
  onPress?: () => void;

  /**
   * Icon to display before the label (optional)
   */
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends Omit<ViewProps, 'style'> {
  /**
   * Breadcrumb items to display
   */
  items: BreadcrumbItem[];

  /**
   * Separator between items
   * @default '/'
   */
  separator?: string | React.ReactNode;

  /**
   * Size of the breadcrumb
   * @default 'md'
   */
  size?: BreadcrumbSize;

  /**
   * Color scheme for links
   * @default 'primary'
   */
  colorScheme?: BreadcrumbColorScheme;

  /**
   * Whether to show home icon at the start
   * @default false
   */
  showHomeIcon?: boolean;

  /**
   * Maximum items to display (will collapse middle items)
   */
  maxItems?: number;

  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
}
