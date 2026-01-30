/**
 * SortSelector Component (Web)
 *
 * Dropdown for selecting sort options with current selection display.
 * Uses Select from @groxigo/ui-elements-web.
 */

import React, { forwardRef } from 'react';
import { Select, cn } from '@groxigo/ui-elements-web';

export type SortSelectorSection = 'groceries' | 'recipes' | 'default';

export interface SortOption {
  /** Unique sort option ID */
  id: string;
  /** Display label */
  label: string;
  /** Sort value */
  value: string;
}

export interface SortSelectorProps {
  /** Sort options */
  options: SortOption[];
  /** Currently selected sort option ID */
  selectedId?: string;
  /** Callback when sort option changes */
  onChange?: (optionId: string) => void;
  /** Label text @default 'Sort by' */
  label?: string;
  /** Section for theming */
  section?: SortSelectorSection;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

export const SortSelector = forwardRef<HTMLDivElement, SortSelectorProps>(
  (
    {
      options,
      selectedId,
      onChange,
      label = 'Sort by',
      section = 'default',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const selectOptions = options.map(opt => ({
      label: opt.label,
      value: opt.id,
    }));

    const handleChange = (value: string | number) => {
      onChange?.(String(value));
    };

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        data-testid={testID}
        {...props}
      >
        <Select
          label={label}
          options={selectOptions}
          value={selectedId}
          onChange={handleChange}
          placeholder="Select sort option"
          size="md"
        />
      </div>
    );
  }
);

SortSelector.displayName = 'SortSelector';

export default SortSelector;
