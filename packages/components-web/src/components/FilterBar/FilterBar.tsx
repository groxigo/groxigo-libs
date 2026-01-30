/**
 * FilterBar Component (Web)
 *
 * Horizontal scrollable filter chips with multi-select and single-select modes.
 * Implements @groxigo/contracts FilterBarPropsBase.
 */

import React, { forwardRef, useState } from 'react';
import { Badge, cn } from '@groxigo/ui-elements-web';
import type { FilterBarPropsBase, FilterOption } from '@groxigo/contracts';

export interface FilterBarProps extends FilterBarPropsBase {}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters,
      selectedFilters: controlledSelectedFilters,
      onFiltersChange,
      multiSelect = true,
      showCounts = false,
      section = 'default',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const [internalSelected, setInternalSelected] = useState<string[]>([]);

    const selectedFilters = controlledSelectedFilters !== undefined
      ? controlledSelectedFilters
      : internalSelected;

    const handleFilterPress = (filterId: string) => {
      let newSelected: string[];

      if (multiSelect) {
        if (selectedFilters.includes(filterId)) {
          newSelected = selectedFilters.filter(id => id !== filterId);
        } else {
          newSelected = [...selectedFilters, filterId];
        }
      } else {
        newSelected = selectedFilters.includes(filterId) ? [] : [filterId];
      }

      if (controlledSelectedFilters === undefined) {
        setInternalSelected(newSelected);
      }
      onFiltersChange?.(newSelected);
    };

    return (
      <div
        ref={ref}
        className={cn('my-2', className)}
        data-testid={testID}
        {...props}
      >
        <div className="flex overflow-x-auto scrollbar-hide gap-2 px-3">
          {filters.map((filter) => {
            const isSelected = selectedFilters.includes(filter.id);

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => handleFilterPress(filter.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-full border transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-600 font-semibold'
                    : 'border-border bg-surface-primary text-text-primary hover:border-primary-300 hover:bg-surface-secondary'
                )}
                aria-pressed={isSelected}
                aria-label={filter.label}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-sm whitespace-nowrap">{filter.label}</span>
                  {showCounts && filter.count !== undefined && (
                    <Badge
                      variant="solid"
                      colorScheme={isSelected ? 'primary' : 'neutral'}
                      size="xs"
                      rounded
                    >
                      {filter.count}
                    </Badge>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';

export default FilterBar;
