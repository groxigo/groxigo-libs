import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BannerCard } from '../BannerCard';

describe('BannerCard', () => {
  it('renders the title', () => {
    render(<BannerCard title="Summer Sale" />);
    expect(screen.getByText('Summer Sale')).toBeInTheDocument();
  });

  it('renders the title inside an h3 element', () => {
    const { container } = render(<BannerCard title="Flash Deal" />);
    const heading = container.querySelector('h3');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Flash Deal');
  });

  it('renders the subtitle when provided', () => {
    render(<BannerCard title="Sale" subtitle="Up to 50% off" />);
    expect(screen.getByText('Up to 50% off')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<BannerCard title="Sale" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('renders background image when imageUrl is provided', () => {
    const { container } = render(
      <BannerCard title="Banner" imageUrl="/images/banner.jpg" />
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/images/banner.jpg');
  });

  it('renders CTA button when ctaText is provided', () => {
    render(<BannerCard title="Deal" ctaText="Shop Now" />);
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  it('calls onPress when the card is clicked', () => {
    const onPress = vi.fn();
    render(<BannerCard title="Click Me" onPress={onPress} testID="banner" />);
    fireEvent.click(screen.getByTestId('banner'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies testID as data-testid', () => {
    render(<BannerCard title="Test" testID="banner-card" />);
    expect(screen.getByTestId('banner-card')).toBeInTheDocument();
  });
});
