/**
 * PaginatedList Types (Web)
 */

import type { ReactElement, ReactNode, CSSProperties } from 'react';

/**
 * Props for the loading indicator at the bottom of the list
 */
export interface LoadingFooterProps {
  /**
   * Whether the footer should show loading state
   */
  isLoading: boolean;

  /**
   * Custom className for the footer container
   */
  className?: string;
}

/**
 * Render item info passed to renderItem function
 */
export interface ListRenderItemInfo<T> {
  item: T;
  index: number;
}

/**
 * Props for the PaginatedList component
 *
 * A web equivalent of FlatList with infinite scroll capabilities.
 * Uses IntersectionObserver for efficient load-more detection.
 */
export interface PaginatedListProps<T> {
  /**
   * Array of items to render
   */
  data: T[];

  /**
   * Render function for each item
   */
  renderItem: (info: ListRenderItemInfo<T>) => ReactNode;

  /**
   * Key extractor function
   */
  keyExtractor: (item: T, index: number) => string;

  /**
   * Whether the initial load is in progress
   */
  isLoading?: boolean;

  /**
   * Whether loading more items (next page)
   */
  isLoadingMore?: boolean;

  /**
   * Error message if fetch failed
   */
  error?: string | null;

  /**
   * Whether there are more pages to load
   */
  hasMore?: boolean;

  /**
   * Function to load the next page
   */
  onLoadMore?: () => void;

  /**
   * Function to retry after an error
   */
  onRetry?: () => void;

  /**
   * Component to show when list is empty (and not loading)
   */
  EmptyComponent?: ReactElement | null;

  /**
   * Component to show when there's an error
   */
  ErrorComponent?: ReactElement | null;

  /**
   * Component to show while initial loading
   */
  LoadingComponent?: ReactElement | null;

  /**
   * Custom footer component to show loading more indicator
   */
  LoadingFooterComponent?: React.ComponentType<LoadingFooterProps>;

  /**
   * CSS classes for the footer loading indicator
   */
  loadingFooterClassName?: string;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Inline styles for the container
   */
  style?: CSSProperties;

  /**
   * CSS classes for the content container
   */
  contentClassName?: string;

  /**
   * Test ID for the component
   */
  testID?: string;

  /**
   * Margin from bottom to trigger load more (in pixels)
   * @default 100
   */
  loadMoreMargin?: number;
}
