import { useCallback, useMemo } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Text, Button, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import type { PaginatedFlatListProps, LoadingFooterProps } from './PaginatedFlatList.types';

/**
 * Default loading footer component
 */
const DefaultLoadingFooter = ({ isLoading, style }: LoadingFooterProps) => {
  const theme = useTheme();
  const { uiSize } = useDeviceType();

  if (!isLoading) {
    return null;
  }

  return (
    <View
      style={[
        styles.loadingFooter,
        { paddingVertical: uiSize(16) },
        style,
      ]}
    >
      <ActivityIndicator size="small" color={theme.colors.primary} />
    </View>
  );
};

/**
 * Default loading component for initial load
 */
const DefaultLoadingComponent = () => {
  const theme = useTheme();
  const { uiSize } = useDeviceType();

  return (
    <View style={[styles.centerContainer, { paddingVertical: uiSize(48) }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

/**
 * Default error component
 */
const DefaultErrorComponent = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => {
  const theme = useTheme();
  const { fontSize, uiSize, spacing } = useDeviceType();

  return (
    <View
      style={[
        styles.centerContainer,
        { paddingVertical: uiSize(48), paddingHorizontal: spacing(16) },
      ]}
    >
      <Text
        variant="body"
        style={{
          color: theme.colors.error,
          textAlign: 'center',
          fontSize: fontSize(14),
          marginBottom: uiSize(12),
        }}
      >
        {message}
      </Text>
      {onRetry && (
        <Button variant="outline" size="sm" onPress={onRetry}>
          Try Again
        </Button>
      )}
    </View>
  );
};

/**
 * Default empty component
 */
const DefaultEmptyComponent = () => {
  const theme = useTheme();
  const { fontSize, uiSize } = useDeviceType();

  return (
    <View style={[styles.centerContainer, { paddingVertical: uiSize(48) }]}>
      <Text
        variant="body"
        style={{
          color: theme.colors.textSecondary,
          textAlign: 'center',
          fontSize: fontSize(14),
        }}
      >
        No items found
      </Text>
    </View>
  );
};

/**
 * PaginatedFlatList - Enterprise Infinite Scroll Component
 *
 * A FlatList wrapper that provides:
 * - Automatic pagination with onEndReached
 * - Pull-to-refresh functionality
 * - Loading states (initial, more, refreshing)
 * - Error handling with retry
 * - Empty state handling
 * - Responsive sizing
 *
 * Designed to work seamlessly with useInfiniteQuery hook.
 *
 * @example
 * ```typescript
 * const {
 *   data,
 *   isLoading,
 *   isLoadingMore,
 *   isRefreshing,
 *   error,
 *   hasMore,
 *   loadMore,
 *   refresh,
 *   retry,
 * } = useInfiniteQuery({
 *   queryFn: async (page, limit) => {
 *     const response = await api.getOrders({ page, limit });
 *     return {
 *       items: response.orders,
 *       hasMore: response.pagination.hasMore,
 *     };
 *   },
 * });
 *
 * <PaginatedFlatList
 *   data={data}
 *   renderItem={({ item }) => <OrderCard order={item} />}
 *   keyExtractor={(item) => item.id}
 *   isLoading={isLoading}
 *   isLoadingMore={isLoadingMore}
 *   isRefreshing={isRefreshing}
 *   error={error}
 *   hasMore={hasMore}
 *   onLoadMore={loadMore}
 *   onRefresh={refresh}
 *   onRetry={retry}
 * />
 * ```
 */
export function PaginatedFlatList<T>({
  data,
  renderItem,
  keyExtractor,
  isLoading = false,
  isLoadingMore = false,
  isRefreshing = false,
  error = null,
  hasMore = true,
  onLoadMore,
  onRefresh,
  onRetry,
  loadMoreThreshold = 0.3,
  EmptyComponent,
  ErrorComponent,
  LoadingComponent,
  LoadingFooterComponent,
  loadingFooterStyle,
  enablePullToRefresh = true,
  testID,
  contentContainerStyle,
  ...flatListProps
}: PaginatedFlatListProps<T>) {
  const theme = useTheme();

  // Handle end reached for loading more
  const handleEndReached = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [isLoading, isLoadingMore, hasMore, onLoadMore]);

  // Memoize the footer component
  const ListFooterComponent = useMemo(() => {
    const FooterComponent = LoadingFooterComponent || DefaultLoadingFooter;
    return (
      <FooterComponent
        isLoading={isLoadingMore}
        style={loadingFooterStyle}
      />
    );
  }, [isLoadingMore, LoadingFooterComponent, loadingFooterStyle]);

  // Memoize the empty component
  const ListEmptyComponent = useMemo(() => {
    // Show loading state for initial load
    if (isLoading) {
      return LoadingComponent || <DefaultLoadingComponent />;
    }

    // Show error state
    if (error) {
      return (
        ErrorComponent || (
          <DefaultErrorComponent message={error} onRetry={onRetry} />
        )
      );
    }

    // Show empty state
    return EmptyComponent || <DefaultEmptyComponent />;
  }, [isLoading, error, LoadingComponent, ErrorComponent, EmptyComponent, onRetry]);

  // Memoize refresh control
  const refreshControl = useMemo(() => {
    if (!enablePullToRefresh || !onRefresh) {
      return undefined;
    }

    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        tintColor={theme.colors.primary}
        colors={[theme.colors.primary]}
      />
    );
  }, [enablePullToRefresh, isRefreshing, onRefresh, theme.colors.primary]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={loadMoreThreshold}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      refreshControl={refreshControl}
      contentContainerStyle={[
        data.length === 0 && styles.emptyContainer,
        contentContainerStyle,
      ]}
      testID={testID}
      showsVerticalScrollIndicator={false}
      {...flatListProps}
    />
  );
}

PaginatedFlatList.displayName = 'PaginatedFlatList';

const styles = StyleSheet.create({
  loadingFooter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
  },
});

export default PaginatedFlatList;
