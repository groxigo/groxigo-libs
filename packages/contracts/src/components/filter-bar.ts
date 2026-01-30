/**
 * FilterBar Component Contract
 *
 * Platform-agnostic interface for FilterBar component.
 */

export type FilterBarSection = 'groceries' | 'recipes' | 'default';

/**
 * Filter option definition
 */
export interface FilterOption {
  /** Unique filter ID */
  id: string;
  /** Display label */
  label: string;
  /** Filter value */
  value: unknown;
  /** Optional count to display */
  count?: number;
}

/**
 * Base FilterBar props that all platforms must support
 */
export interface FilterBarPropsBase {
  /** Filter options */
  filters: FilterOption[];
  /** Selected filter IDs */
  selectedFilters?: string[];
  /** Callback when filters change */
  onFiltersChange?: (selectedIds: string[]) => void;
  /** Whether filters are multi-select @default true */
  multiSelect?: boolean;
  /** Whether to show filter counts @default false */
  showCounts?: boolean;
  /** Section for theming */
  section?: FilterBarSection;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
