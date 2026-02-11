import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductImageCarousel } from '../ProductImageCarousel';

const images = [
  'https://example.com/img1.jpg',
  'https://example.com/img2.jpg',
  'https://example.com/img3.jpg',
];

describe('ProductImageCarousel', () => {
  it('renders with testID', () => {
    render(<ProductImageCarousel images={images} testID="carousel" />);
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
  });

  it('renders current image', () => {
    const { container } = render(<ProductImageCarousel images={images} currentIndex={0} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', images[0]);
  });

  it('renders image at specified index', () => {
    const { container } = render(<ProductImageCarousel images={images} currentIndex={1} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', images[1]);
  });

  it('renders navigation dots for multiple images', () => {
    render(<ProductImageCarousel images={images} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('does not render dots for a single image', () => {
    render(<ProductImageCarousel images={['https://example.com/single.jpg']} />);
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('marks active dot with aria-selected', () => {
    render(<ProductImageCarousel images={images} currentIndex={1} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onIndexChange when dot is clicked', () => {
    const handleChange = vi.fn();
    render(
      <ProductImageCarousel
        images={images}
        currentIndex={0}
        onIndexChange={handleChange}
      />
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[2]);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('renders placeholder when images array is empty', () => {
    const { container } = render(
      <ProductImageCarousel images={[]} testID="carousel" />
    );
    const carousel = screen.getByTestId('carousel');
    expect(carousel.querySelector('img')).toBeNull();
  });
});
