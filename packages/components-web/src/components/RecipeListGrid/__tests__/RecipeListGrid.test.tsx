import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeListGrid } from '../RecipeListGrid';

const mockItems = [
  { id: 'r1', title: 'Butter Chicken', imageUrl: '/butter-chicken.jpg' },
  { id: 'r2', title: 'Biryani', imageUrl: '/biryani.jpg' },
  { id: 'r3', title: 'Dal Makhani', imageUrl: '/dal.jpg' },
];

describe('RecipeListGrid', () => {
  it('renders with testID', () => {
    render(<RecipeListGrid items={mockItems} testID="recipe-grid" />);
    expect(screen.getByTestId('recipe-grid')).toBeInTheDocument();
  });

  it('renders recipe titles from items', () => {
    render(<RecipeListGrid items={mockItems} />);
    expect(screen.getByText('Butter Chicken')).toBeInTheDocument();
    expect(screen.getByText('Biryani')).toBeInTheDocument();
    expect(screen.getByText('Dal Makhani')).toBeInTheDocument();
  });

  it('renders correct number of recipe cards', () => {
    render(<RecipeListGrid items={mockItems} testID="recipe-grid" />);
    const grid = screen.getByTestId('recipe-grid');
    expect(grid.children.length).toBe(3);
  });

  it('renders empty grid when items is empty', () => {
    render(<RecipeListGrid items={[]} testID="recipe-grid" />);
    const grid = screen.getByTestId('recipe-grid');
    expect(grid.children.length).toBe(0);
  });

  it('applies gap style', () => {
    render(<RecipeListGrid items={mockItems} gap={20} testID="recipe-grid" />);
    const grid = screen.getByTestId('recipe-grid');
    expect(grid.style.gap).toBe('20px');
  });

  it('applies custom column count', () => {
    render(<RecipeListGrid items={mockItems} columns={3} testID="recipe-grid" />);
    const grid = screen.getByTestId('recipe-grid');
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });
});
