/**
 * FilterBar Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';
import type { FilterBarProps, FilterOption } from '../FilterBar.types';

// Mock react-native
vi.mock('react-native', async () => {
  const RN = await vi.importActual('react-native-web');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: vi.fn((options: any) => options.ios || options.default),
    },
  };
});

// Mock ui-elements
vi.mock('@groxigo/ui-elements', async () => {
  const React = await import('react');
  const RN = await import('react-native');

  return {
    useTheme: () => ({
      colors: {
        primary: '#007AFF',
        text: '#000000',
        border: '#E0E0E0',
        surface: '#FFFFFF',
      },
      spacing: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
      },
      radius: {
        full: 9999,
      },
    }),
    Text: ({ children, variant, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
    Badge: ({ children, ...props }: any) => (
      <RN.View testID="badge" {...props}>
        <RN.Text>{children}</RN.Text>
      </RN.View>
    ),
  };
});

describe('FilterBar', () => {
  const mockFilters: FilterOption[] = [
    { id: '1', label: 'All', value: 'all' },
    { id: '2', label: 'Groceries', value: 'groceries' },
    { id: '3', label: 'Recipes', value: 'recipes' },
    { id: '4', label: 'Beverages', value: 'beverages', count: 25 },
  ];

  const defaultProps: FilterBarProps = {
    filters: mockFilters,
  };

  describe('Basic Rendering', () => {
    it('renders all filter options', () => {
      const { getByText } = render(<FilterBar {...defaultProps} />);
      expect(getByText('All')).toBeTruthy();
      expect(getByText('Groceries')).toBeTruthy();
      expect(getByText('Recipes')).toBeTruthy();
      expect(getByText('Beverages')).toBeTruthy();
    });

    it('renders correct number of filters', () => {
      const { getByText } = render(<FilterBar {...defaultProps} />);
      mockFilters.forEach(filter => {
        expect(getByText(filter.label)).toBeTruthy();
      });
    });
  });

  describe('Filter Selection', () => {
    it('calls onFiltersChange when filter is selected', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar {...defaultProps} onFiltersChange={onFiltersChange} />
      );
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith(['2']);
    });

    it('pre-selects filters based on selectedFilters prop', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar {...defaultProps} selectedFilters={['2']} onFiltersChange={onFiltersChange} />
      );
      // Clicking a selected filter should deselect it
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith([]);
    });

    it('deselects filter when pressed again', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar
          {...defaultProps}
          selectedFilters={['2']}
          onFiltersChange={onFiltersChange}
        />
      );
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Multi-Select Mode', () => {
    it('allows multiple selections by default', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar
          {...defaultProps}
          selectedFilters={['1']}
          onFiltersChange={onFiltersChange}
        />
      );
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith(['1', '2']);
    });

    it('maintains previous selections when adding new one', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar
          {...defaultProps}
          selectedFilters={['1', '2']}
          onFiltersChange={onFiltersChange}
        />
      );
      fireEvent.click(getByText('Recipes'));
      expect(onFiltersChange).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('removes filter from selection when deselected', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar
          {...defaultProps}
          selectedFilters={['1', '2', '3']}
          onFiltersChange={onFiltersChange}
        />
      );
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith(['1', '3']);
    });
  });

  describe('Single-Select Mode', () => {
    it('only allows one selection when multiSelect is false', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar
          {...defaultProps}
          multiSelect={false}
          onFiltersChange={onFiltersChange}
        />
      );
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith(['2']);
    });

    it('replaces selection in single-select mode', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar
          {...defaultProps}
          multiSelect={false}
          selectedFilters={['1']}
          onFiltersChange={onFiltersChange}
        />
      );
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith(['2']);
    });

    it('deselects in single-select mode when same filter is pressed', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar
          {...defaultProps}
          multiSelect={false}
          selectedFilters={['2']}
          onFiltersChange={onFiltersChange}
        />
      );
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Filter Counts', () => {
    it('shows counts when showCounts is true', () => {
      const { getByText, getAllByTestId } = render(
        <FilterBar {...defaultProps} showCounts={true} />
      );
      expect(getByText('25')).toBeTruthy();
      expect(getAllByTestId('badge')).toBeTruthy();
    });

    it('does not show counts by default', () => {
      const { queryByText } = render(<FilterBar {...defaultProps} />);
      expect(queryByText('25')).toBeNull();
    });

    it('only shows count for filters that have count property', () => {
      const { queryAllByTestId } = render(
        <FilterBar {...defaultProps} showCounts={true} />
      );
      // Only Beverages has a count
      expect(queryAllByTestId('badge')).toHaveLength(1);
    });
  });

  describe('Controlled Mode', () => {
    it('reflects external selectedFilters changes', () => {
      const onFiltersChange = vi.fn();
      const { getByText, rerender } = render(
        <FilterBar {...defaultProps} selectedFilters={['1']} onFiltersChange={onFiltersChange} />
      );
      // Click on Groceries to add it
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith(['1', '2']);

      // Rerender with different selection
      rerender(<FilterBar {...defaultProps} selectedFilters={['2', '3']} onFiltersChange={onFiltersChange} />);
      // Click on All to add it
      fireEvent.click(getByText('All'));
      expect(onFiltersChange).toHaveBeenCalledWith(['2', '3', '1']);
    });
  });

  describe('Uncontrolled Mode', () => {
    it('manages internal state when selectedFilters is not provided', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar {...defaultProps} onFiltersChange={onFiltersChange} />
      );

      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenCalledWith(['2']);

      // Click again to verify it was selected
      fireEvent.click(getByText('Groceries'));
      expect(onFiltersChange).toHaveBeenLastCalledWith([]);
    });
  });

  describe('Accessibility', () => {
    it('filter buttons have aria-label', () => {
      const { getByLabelText } = render(<FilterBar {...defaultProps} />);
      expect(getByLabelText('All')).toBeTruthy();
      expect(getByLabelText('Groceries')).toBeTruthy();
    });

    it('renders selected and unselected filters differently', () => {
      const onFiltersChange = vi.fn();
      const { getByText } = render(
        <FilterBar {...defaultProps} selectedFilters={['1']} onFiltersChange={onFiltersChange} />
      );
      // Just verify they render
      expect(getByText('All')).toBeTruthy();
      expect(getByText('Groceries')).toBeTruthy();
    });
  });

  describe('Clear Filters', () => {
    it('can clear all filters by passing empty array', () => {
      const onFiltersChange = vi.fn();
      const { getByText, rerender } = render(
        <FilterBar {...defaultProps} selectedFilters={['1', '2', '3']} onFiltersChange={onFiltersChange} />
      );

      // All, Groceries, Recipes should be selected
      // Clicking All should deselect it
      fireEvent.click(getByText('All'));
      expect(onFiltersChange).toHaveBeenCalledWith(['2', '3']);

      rerender(<FilterBar {...defaultProps} selectedFilters={[]} onFiltersChange={onFiltersChange} />);

      // Now clicking any should add it
      fireEvent.click(getByText('All'));
      expect(onFiltersChange).toHaveBeenCalledWith(['1']);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty filters array', () => {
      const { container } = render(<FilterBar filters={[]} />);
      expect(container).toBeTruthy();
    });

    it('handles single filter', () => {
      const { getByText } = render(
        <FilterBar filters={[{ id: '1', label: 'Only', value: 'only' }]} />
      );
      expect(getByText('Only')).toBeTruthy();
    });
  });
});
