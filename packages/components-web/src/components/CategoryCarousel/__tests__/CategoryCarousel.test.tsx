import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CategoryCarousel } from '../CategoryCarousel';

const mockItems = [
  { id: 'c1', name: 'Spices', imageUrl: '/spices.jpg' },
  { id: 'c2', name: 'Lentils', imageUrl: '/lentils.jpg' },
  { id: 'c3', name: 'Snacks', imageUrl: '/snacks.jpg' },
];

describe('CategoryCarousel', () => {
  it('renders with testID', () => {
    render(<CategoryCarousel items={mockItems} testID="cat-carousel" />);
    expect(screen.getByTestId('cat-carousel')).toBeInTheDocument();
  });

  it('renders category names from items', () => {
    render(<CategoryCarousel items={mockItems} />);
    expect(screen.getByText('Spices')).toBeInTheDocument();
    expect(screen.getByText('Lentils')).toBeInTheDocument();
    expect(screen.getByText('Snacks')).toBeInTheDocument();
  });

  it('renders section title via SectionHeader', () => {
    render(<CategoryCarousel items={mockItems} title="Shop by Category" />);
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
  });

  it('does not render section title when not provided', () => {
    const { container } = render(<CategoryCarousel items={mockItems} />);
    expect(container.querySelector('h3')).toBeNull();
  });

  it('renders scroll arrows by default', () => {
    render(<CategoryCarousel items={mockItems} />);
    expect(screen.getByLabelText('Scroll left')).toBeInTheDocument();
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
  });

  it('hides scroll arrows when showArrows=false', () => {
    render(<CategoryCarousel items={mockItems} showArrows={false} />);
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Scroll right')).not.toBeInTheDocument();
  });
});
