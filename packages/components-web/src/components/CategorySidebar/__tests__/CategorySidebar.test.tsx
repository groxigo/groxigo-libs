import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategorySidebar } from '../CategorySidebar';
import type { CategoryItem } from '../CategorySidebar';

const categories: CategoryItem[] = [
  {
    id: 'fruits',
    label: 'Fruits',
    subcategories: [
      { id: 'tropical', label: 'Tropical' },
      { id: 'berries', label: 'Berries' },
    ],
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
  },
  {
    id: 'dairy',
    label: 'Dairy',
    subcategories: [
      { id: 'milk', label: 'Milk' },
    ],
  },
];

describe('CategorySidebar', () => {
  it('renders with testID', () => {
    render(<CategorySidebar categories={categories} testID="sidebar" />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders all category labels', () => {
    render(<CategorySidebar categories={categories} />);
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Dairy')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(<CategorySidebar categories={categories} />);
    expect(screen.getByPlaceholderText('Search categories...')).toBeInTheDocument();
  });

  it('calls onCategorySelect when a category is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <CategorySidebar categories={categories} onCategorySelect={handleSelect} />
    );
    fireEvent.click(screen.getByText('Vegetables'));
    expect(handleSelect).toHaveBeenCalledWith('vegetables');
  });

  it('expands subcategories when category with subcategories is clicked', () => {
    render(<CategorySidebar categories={categories} />);
    // Initially subcategories should not be visible
    expect(screen.queryByText('Tropical')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText('Fruits'));
    expect(screen.getByText('Tropical')).toBeInTheDocument();
    expect(screen.getByText('Berries')).toBeInTheDocument();
  });

  it('collapses subcategories when clicking expanded category again', () => {
    render(<CategorySidebar categories={categories} />);
    // Expand first
    fireEvent.click(screen.getByText('Fruits'));
    expect(screen.getByText('Tropical')).toBeInTheDocument();

    // Collapse
    fireEvent.click(screen.getByText('Fruits'));
    expect(screen.queryByText('Tropical')).not.toBeInTheDocument();
  });

  it('renders filter content when provided', () => {
    render(
      <CategorySidebar
        categories={categories}
        filterContent={<span>Price Filter</span>}
      />
    );
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Price Filter')).toBeInTheDocument();
  });

  it('shows selected category as expanded when selectedCategoryId is set', () => {
    render(
      <CategorySidebar
        categories={categories}
        selectedCategoryId="fruits"
      />
    );
    // Subcategories should be visible because fruits is pre-selected/expanded
    expect(screen.getByText('Tropical')).toBeInTheDocument();
  });
});
