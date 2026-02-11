import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCarousel } from '../ProductCarousel';

const mockItems = [
  { id: 'p1', name: 'Basmati Rice', price: 12.99, imageUrl: '/rice.jpg' },
  { id: 'p2', name: 'Turmeric Powder', price: 4.99, imageUrl: '/turmeric.jpg' },
  { id: 'p3', name: 'Coconut Oil', price: 8.49, imageUrl: '/coconut.jpg' },
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

describe('ProductCarousel', () => {
  it('renders with testID', () => {
    render(<ProductCarousel items={mockItems} testID="product-carousel" />);
    expect(screen.getByTestId('product-carousel')).toBeInTheDocument();
  });

  it('renders product names from items', () => {
    render(<ProductCarousel items={mockItems} />);
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
    expect(screen.getByText('Turmeric Powder')).toBeInTheDocument();
    expect(screen.getByText('Coconut Oil')).toBeInTheDocument();
  });

  it('renders title via SectionHeader', () => {
    render(<ProductCarousel items={mockItems} title="Popular Items" />);
    expect(screen.getByText('Popular Items')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    const { container } = render(<ProductCarousel items={mockItems} />);
    expect(container.querySelector('h3')).toBeNull();
  });

  it('renders scroll right arrow when content overflows', () => {
    render(<ProductCarousel items={mockItems} />);
    // Right arrow appears when scrollWidth > clientWidth (content overflows)
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
    // Left arrow is hidden at initial scroll position (scrollLeft = 0)
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
  });

  it('hides scroll arrows when showArrows=false', () => {
    render(<ProductCarousel items={mockItems} showArrows={false} />);
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Scroll right')).not.toBeInTheDocument();
  });

  it('renders "See all" button when onSeeAll is provided', () => {
    const handleSeeAll = vi.fn();
    render(
      <ProductCarousel items={mockItems} title="Trending" onSeeAll={handleSeeAll} />
    );
    expect(screen.getByText('See all')).toBeInTheDocument();
  });
});
