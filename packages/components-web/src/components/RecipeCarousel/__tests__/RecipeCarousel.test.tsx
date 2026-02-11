import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeCarousel } from '../RecipeCarousel';

const mockItems = [
  { id: 'r1', title: 'Butter Chicken', imageUrl: '/butter-chicken.jpg' },
  { id: 'r2', title: 'Biryani', imageUrl: '/biryani.jpg' },
  { id: 'r3', title: 'Dal Makhani', imageUrl: '/dal.jpg' },
];

// Mock scroll dimensions so Carousel detects overflow
const origScrollWidth = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollWidth');
const origClientWidth = Object.getOwnPropertyDescriptor(Element.prototype, 'clientWidth');

beforeAll(() => {
  Object.defineProperty(Element.prototype, 'scrollWidth', { configurable: true, get: () => 1000 });
  Object.defineProperty(Element.prototype, 'clientWidth', { configurable: true, get: () => 300 });
});

afterAll(() => {
  if (origScrollWidth) Object.defineProperty(Element.prototype, 'scrollWidth', origScrollWidth);
  if (origClientWidth) Object.defineProperty(Element.prototype, 'clientWidth', origClientWidth);
});

describe('RecipeCarousel', () => {
  it('renders with testID', () => {
    render(<RecipeCarousel items={mockItems} testID="recipe-carousel" />);
    expect(screen.getByTestId('recipe-carousel')).toBeInTheDocument();
  });

  it('renders recipe titles from items', () => {
    render(<RecipeCarousel items={mockItems} />);
    expect(screen.getByText('Butter Chicken')).toBeInTheDocument();
    expect(screen.getByText('Biryani')).toBeInTheDocument();
    expect(screen.getByText('Dal Makhani')).toBeInTheDocument();
  });

  it('renders section title via SectionHeader', () => {
    render(<RecipeCarousel items={mockItems} title="Featured Recipes" />);
    expect(screen.getByText('Featured Recipes')).toBeInTheDocument();
  });

  it('does not render section title when not provided', () => {
    const { container } = render(<RecipeCarousel items={mockItems} />);
    expect(container.querySelector('h3')).toBeNull();
  });

  it('renders scroll right arrow when content overflows', () => {
    render(<RecipeCarousel items={mockItems} />);
    // Right arrow appears when scrollWidth > clientWidth (content overflows)
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
    // Left arrow is hidden at initial scroll position (scrollLeft = 0)
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
  });

  it('hides scroll arrows when showArrows=false', () => {
    render(<RecipeCarousel items={mockItems} showArrows={false} />);
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Scroll right')).not.toBeInTheDocument();
  });

  it('renders "See all" button when onSeeAll is provided', () => {
    const handleSeeAll = vi.fn();
    render(
      <RecipeCarousel items={mockItems} title="Quick Meals" onSeeAll={handleSeeAll} />
    );
    expect(screen.getByText('See all')).toBeInTheDocument();
  });
});
