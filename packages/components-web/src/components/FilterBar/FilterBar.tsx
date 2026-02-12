'use client';

import { forwardRef, useCallback } from 'react';
import type {
  FilterBarPropsBase,
  FilterOption,
  FilterBarSection,
} from '@groxigo/contracts/components/filter-bar';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './FilterBar.module.css';

export type { FilterOption, FilterBarSection };

export interface FilterBarProps extends FilterBarPropsBase {
  className?: string;
}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters,
      selectedFilters = [],
      onFiltersChange,
      multiSelect = true,
      showCounts = false,
      section = 'default',
      className,
      testID,
    },
    ref
  ) => {
    const handleChipClick = useCallback(
      (filterId: string) => {
        if (!onFiltersChange) return;

        const isSelected = selectedFilters.includes(filterId);

        if (multiSelect) {
          // Toggle on/off
          const next = isSelected
            ? selectedFilters.filter((id) => id !== filterId)
            : [...selectedFilters, filterId];
          onFiltersChange(next);
        } else {
          // Single select: deselect if already selected, else select only this one
          onFiltersChange(isSelected ? [] : [filterId]);
        }
      },
      [onFiltersChange, selectedFilters, multiSelect]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        data-section={section}
        role="group"
        aria-label="Filters"
      >
        {filters.map((filter) => {
          const isSelected = selectedFilters.includes(filter.id);
          return (
            <Button
              key={filter.id}
              variant={isSelected ? 'solid' : 'outline'}
              colorScheme="primary"
              size="sm"
              onPress={() => handleChipClick(filter.id)}
              className={clsx(
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipDefault
              )}
              aria-checked={isSelected}
            >
              <span
                className={clsx(
                  styles.chipLabel,
                  isSelected ? styles.chipLabelSelected : styles.chipLabelDefault
                )}
              >
                {filter.label}
              </span>
              {showCounts && filter.count != null && isSelected && (
                <span className={styles.chipCount}>{filter.count}</span>
              )}
            </Button>
          );
        })}
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';
export default FilterBar;
