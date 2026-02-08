'use client';

import { forwardRef, useMemo, useCallback } from 'react';
import { AngleLeft, AngleRight } from '@groxigo/icons/line';
import type { PaginationBarPropsBase } from '@groxigo/contracts/components/pagination-bar';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './PaginationBar.module.css';

export interface PaginationBarProps extends PaginationBarPropsBase {}


type PageItem = { type: 'page'; page: number } | { type: 'ellipsis'; key: string };

/**
 * Generate the list of page items to display.
 * Shows first page, last page, current page +/- 1, with ellipsis for gaps.
 */
function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => ({
      type: 'page' as const,
      page: i + 1,
    }));
  }

  const items: PageItem[] = [];
  const pages = new Set<number>();

  // Always include first and last
  pages.add(1);
  pages.add(totalPages);

  // Include current and neighbors
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i >= 1 && i <= totalPages) {
      pages.add(i);
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      items.push({ type: 'ellipsis', key: `ellipsis-${sorted[i - 1]}` });
    }
    items.push({ type: 'page', page: sorted[i] });
  }

  return items;
}

export const PaginationBar = forwardRef<HTMLElement, PaginationBarProps>(
  ({ currentPage, totalPages, onPageChange, className, testID }, ref) => {
    const pageItems = useMemo(
      () => getPageItems(currentPage, totalPages),
      [currentPage, totalPages]
    );

    const handlePageChange = useCallback(
      (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          onPageChange?.(page);
        }
      },
      [onPageChange, totalPages, currentPage]
    );

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    return (
      <nav
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        aria-label="Pagination"
        role="navigation"
      >
        {/* Previous button */}
        <Button
          variant="ghost"
          size="sm"
          className={styles.navButton}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          aria-label="Previous page"
        >
          <AngleLeft size={20} />
        </Button>

        {/* Page items */}
        {pageItems.map((item) =>
          item.type === 'ellipsis' ? (
            <span key={item.key} className={styles.ellipsis} aria-hidden="true">
              ...
            </span>
          ) : (
            <Button
              key={item.page}
              variant="ghost"
              size="sm"
              colorScheme={item.page === currentPage ? 'primary' : undefined}
              className={clsx(
                styles.pageBtn,
                item.page === currentPage && styles.pageBtnActive
              )}
              onPress={() => handlePageChange(item.page)}
              aria-label={`Page ${item.page}`}
              aria-current={item.page === currentPage ? 'page' : undefined}
            >
              {item.page}
            </Button>
          )
        )}

        {/* Next button */}
        <Button
          variant="ghost"
          size="sm"
          className={styles.navButton}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          aria-label="Next page"
        >
          <AngleRight size={20} />
        </Button>
      </nav>
    );
  }
);

PaginationBar.displayName = 'PaginationBar';
export default PaginationBar;
