import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';

const mockFilters = [
  { id: 'veg', label: 'Vegetarian', value: 'veg' },
  { id: 'vegan', label: 'Vegan', value: 'vegan' },
  { id: 'gluten-free', label: 'Gluten Free', value: 'gluten-free' },
  { id: 'organic', label: 'Organic', value: 'organic', count: 42 },
];

describe('FilterBar', () => {
  it('renders with testID', () => {
    render(<FilterBar filters={mockFilters} testID="filter-bar" />);
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });

  it('renders with role="group" and aria-label', () => {
    render(<FilterBar filters={mockFilters} />);
    expect(screen.getByRole('group', { name: 'Filters' })).toBeInTheDocument();
  });

  it('renders all filter labels', () => {
    render(<FilterBar filters={mockFilters} />);
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Vegan')).toBeInTheDocument();
    expect(screen.getByText('Gluten Free')).toBeInTheDocument();
    expect(screen.getByText('Organic')).toBeInTheDocument();
  });

  it('calls onFiltersChange with toggled filter in multiSelect mode', () => {
    const handleChange = vi.fn();
    render(
      <FilterBar
        filters={mockFilters}
        selectedFilters={[]}
        onFiltersChange={handleChange}
        multiSelect
      />
    );
    fireEvent.click(screen.getByText('Vegetarian'));
    expect(handleChange).toHaveBeenCalledWith(['veg']);
  });

  it('removes filter when clicking already selected filter in multiSelect', () => {
    const handleChange = vi.fn();
    render(
      <FilterBar
        filters={mockFilters}
        selectedFilters={['veg', 'vegan']}
        onFiltersChange={handleChange}
        multiSelect
      />
    );
    fireEvent.click(screen.getByText('Vegetarian'));
    expect(handleChange).toHaveBeenCalledWith(['vegan']);
  });

  it('single select mode selects one at a time', () => {
    const handleChange = vi.fn();
    render(
      <FilterBar
        filters={mockFilters}
        selectedFilters={[]}
        onFiltersChange={handleChange}
        multiSelect={false}
      />
    );
    fireEvent.click(screen.getByText('Vegan'));
    expect(handleChange).toHaveBeenCalledWith(['vegan']);
  });

  it('single select mode deselects when clicking active filter', () => {
    const handleChange = vi.fn();
    render(
      <FilterBar
        filters={mockFilters}
        selectedFilters={['vegan']}
        onFiltersChange={handleChange}
        multiSelect={false}
      />
    );
    fireEvent.click(screen.getByText('Vegan'));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('shows count when showCounts is true and filter is selected', () => {
    render(
      <FilterBar
        filters={mockFilters}
        selectedFilters={['organic']}
        showCounts
      />
    );
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
