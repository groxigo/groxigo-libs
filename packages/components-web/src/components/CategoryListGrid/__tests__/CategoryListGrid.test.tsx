import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CategoryListGrid } from '../CategoryListGrid';

const mockItems = [
  { id: 'c1', name: 'Spices', imageUrl: '/spices.jpg' },
  { id: 'c2', name: 'Lentils', imageUrl: '/lentils.jpg' },
  { id: 'c3', name: 'Snacks', imageUrl: '/snacks.jpg' },
  { id: 'c4', name: 'Beverages', imageUrl: '/beverages.jpg' },
];

describe('CategoryListGrid', () => {
  it('renders with testID', () => {
    render(<CategoryListGrid items={mockItems} testID="cat-grid" />);
    expect(screen.getByTestId('cat-grid')).toBeInTheDocument();
  });

  it('renders category names from items', () => {
    render(<CategoryListGrid items={mockItems} />);
    expect(screen.getByText('Spices')).toBeInTheDocument();
    expect(screen.getByText('Lentils')).toBeInTheDocument();
    expect(screen.getByText('Snacks')).toBeInTheDocument();
    expect(screen.getByText('Beverages')).toBeInTheDocument();
  });

  it('renders correct number of category cards', () => {
    render(<CategoryListGrid items={mockItems} testID="cat-grid" />);
    const grid = screen.getByTestId('cat-grid');
    expect(grid.children.length).toBe(4);
  });

  it('renders empty grid when items is empty', () => {
    render(<CategoryListGrid items={[]} testID="cat-grid" />);
    const grid = screen.getByTestId('cat-grid');
    expect(grid.children.length).toBe(0);
  });

  it('applies gap style', () => {
    render(<CategoryListGrid items={mockItems} gap={16} testID="cat-grid" />);
    const grid = screen.getByTestId('cat-grid');
    expect(grid.style.gap).toBe('16px');
  });
});
