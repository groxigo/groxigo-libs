import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductListGrid } from '../ProductListGrid';

const mockItems = [
  { id: 'p1', name: 'Basmati Rice', price: 12.99, imageUrl: '/rice.jpg' },
  { id: 'p2', name: 'Turmeric Powder', price: 4.99, imageUrl: '/turmeric.jpg' },
  { id: 'p3', name: 'Coconut Oil', price: 8.49, imageUrl: '/coconut.jpg' },
];

describe('ProductListGrid', () => {
  it('renders with testID', () => {
    render(<ProductListGrid items={mockItems} testID="product-grid" />);
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });

  it('renders product names from items', () => {
    render(<ProductListGrid items={mockItems} />);
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
    expect(screen.getByText('Turmeric Powder')).toBeInTheDocument();
    expect(screen.getByText('Coconut Oil')).toBeInTheDocument();
  });

  it('renders correct number of product tiles', () => {
    render(<ProductListGrid items={mockItems} testID="product-grid" />);
    // Each ProductTile renders the product name
    const grid = screen.getByTestId('product-grid');
    // Expect 3 direct child containers (one per item)
    expect(grid.children.length).toBe(3);
  });

  it('renders empty grid when items is empty', () => {
    render(<ProductListGrid items={[]} testID="product-grid" />);
    const grid = screen.getByTestId('product-grid');
    expect(grid.children.length).toBe(0);
  });

  it('applies gap style', () => {
    render(<ProductListGrid items={mockItems} gap={24} testID="product-grid" />);
    const grid = screen.getByTestId('product-grid');
    expect(grid.style.gap).toBe('24px');
  });

  it('applies custom column count', () => {
    render(<ProductListGrid items={mockItems} columns={4} testID="product-grid" />);
    const grid = screen.getByTestId('product-grid');
    expect(grid.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });
});
