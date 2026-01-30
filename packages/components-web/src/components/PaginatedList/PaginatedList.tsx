/**
 * PaginatedList Component (Web)
 *
 * A web equivalent of React Native's FlatList with infinite scroll capabilities.
 * Uses IntersectionObserver for efficient load-more detection.
 *
 * Features:
 * - Automatic pagination with IntersectionObserver
 * - Loading states (initial, more)
 * - Error handling with retry
 * - Empty state handling
 *
 * Designed to work seamlessly with useInfiniteQuery hook.
 *
 * @example
 * ```typescript
 * <PaginatedList
 *   data={products}
 *   renderItem={({ item }) => <ProductCard {...item} />}
 *   keyExtractor={(item) => item.id}
 *   isLoading={isLoading}
 *   isLoadingMore={isFetchingNextPage}
 *   hasMore={hasNextPage}
 *   onLoadMore={fetchNextPage}
 * />
 * ```
 */

'use client';

import React, { forwardRef, useRef, useEffect, useCallback, useMemo } from 'react';
import { Text, Button, cn } from '@groxigo/ui-elements-web';
import type { PaginatedListProps, LoadingFooterProps } from './PaginatedList.types';

/**
 * Default loading footer component
 */
const DefaultLoadingFooter = ({ isLoading, className }: LoadingFooterProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center py-4', className)}>
      <div className="w-6 h-6 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

/**
 * Default loading component for initial load
 */
const DefaultLoadingComponent = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
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
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Text className="text-error text-center text-sm mb-3">{message}</Text>
      {onRetry && (
        <Button variant="outline" size="sm" onPress={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

/**
 * Default empty component
 */
const DefaultEmptyComponent = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Text className="text-gray-500 text-center text-sm">No items found</Text>
    </div>
  );
};

// Use generic function component pattern for better type inference
function PaginatedListInner<T>(
  {
    data,
    renderItem,
    keyExtractor,
    isLoading = false,
    isLoadingMore = false,
    error = null,
    hasMore = true,
    onLoadMore,
    onRetry,
    EmptyComponent,
    ErrorComponent,
    LoadingComponent,
    LoadingFooterComponent,
    loadingFooterClassName,
    className,
    style,
    contentClassName,
    testID,
    loadMoreMargin = 100,
  }: PaginatedListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Set up IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading || isLoadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && onLoadMore) {
          onLoadMore();
        }
      },
      { rootMargin: `${loadMoreMargin}px` }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, isLoadingMore, onLoadMore, loadMoreMargin]);

  // Memoize the footer component
  const FooterComponent = useMemo(() => {
    const Footer = LoadingFooterComponent || DefaultLoadingFooter;
    return <Footer isLoading={isLoadingMore} className={loadingFooterClassName} />;
  }, [isLoadingMore, LoadingFooterComponent, loadingFooterClassName]);

  // Memoize the empty/loading/error component
  const ListEmptyComponent = useMemo(() => {
    // Show loading state for initial load
    if (isLoading) {
      return LoadingComponent || <DefaultLoadingComponent />;
    }

    // Show error state
    if (error) {
      return (
        ErrorComponent || <DefaultErrorComponent message={error} onRetry={onRetry} />
      );
    }

    // Show empty state
    return EmptyComponent || <DefaultEmptyComponent />;
  }, [isLoading, error, LoadingComponent, ErrorComponent, EmptyComponent, onRetry]);

  // If loading or empty with error, show the appropriate component
  if ((isLoading || error || data.length === 0) && !isLoadingMore) {
    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        style={style}
        data-testid={testID}
      >
        {ListEmptyComponent}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('flex-1 overflow-auto', className)}
      style={style}
      data-testid={testID}
    >
      <div className={contentClassName}>
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor(item, index)}>
            {renderItem({ item, index })}
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      {FooterComponent}

      {/* Sentinel element for IntersectionObserver */}
      {hasMore && <div ref={sentinelRef} className="h-1" />}
    </div>
  );
}

// Create the forwardRef version with proper typing
export const PaginatedList = forwardRef(PaginatedListInner) as <T>(
  props: PaginatedListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

// Add displayName for debugging
(PaginatedList as React.FC).displayName = 'PaginatedList';

export default PaginatedList;
