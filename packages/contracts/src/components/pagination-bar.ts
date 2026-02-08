/**
 * PaginationBar Component Contract
 *
 * A horizontal pagination control with page numbers,
 * previous/next buttons, and ellipsis for large page counts.
 */

export interface PaginationBarPropsBase {
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when a page is selected */
  onPageChange?: (page: number) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
