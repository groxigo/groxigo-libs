import type { FlatListProps, ViewStyle, ListRenderItem } from 'react-native';

/**
 * Props for the loading indicator at the bottom of the list
 */
export interface LoadingFooterProps {
  /**
   * Whether the footer should show loading state
   */
  isLoading: boolean;

  /**
   * Custom style for the footer container
   */
  style?: ViewStyle;
}

/**
 * Props for the PaginatedFlatList component
 *
 * Combines FlatList functionality with infinite scroll capabilities.
 * Designed to work seamlessly with useInfiniteQuery hook.
 */
export interface PaginatedFlatListProps<T>
  extends Omit<
    FlatListProps<T>,
    'data' | 'onEndReached' | 'onRefresh' | 'refreshing' | 'ListFooterComponent'
  > {
  /**
   * Array of items to render
   */
  data: T[];

  /**
   * Render function for each item
   */
  renderItem: ListRenderItem<T>;

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
   * Whether refreshing (pull-to-refresh)
   */
  isRefreshing?: boolean;

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
   * Function to refresh the list (pull-to-refresh)
   */
  onRefresh?: () => void;

  /**
   * Function to retry after an error
   */
  onRetry?: () => void;

  /**
   * Threshold for triggering onLoadMore (0-1)
   * @default 0.3
   */
  loadMoreThreshold?: number;

  /**
   * Component to show when list is empty (and not loading)
   */
  EmptyComponent?: React.ReactElement | null;

  /**
   * Component to show when there's an error
   */
  ErrorComponent?: React.ReactElement | null;

  /**
   * Component to show while initial loading
   */
  LoadingComponent?: React.ReactElement | null;

  /**
   * Custom footer component to show loading more indicator
   */
  LoadingFooterComponent?: React.ComponentType<LoadingFooterProps>;

  /**
   * Style for the footer loading indicator
   */
  loadingFooterStyle?: ViewStyle;

  /**
   * Enable pull-to-refresh functionality
   * @default true
   */
  enablePullToRefresh?: boolean;

  /**
   * Test ID for the component
   */
  testID?: string;
}
