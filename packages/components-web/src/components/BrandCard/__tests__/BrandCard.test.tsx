import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrandCard } from '../BrandCard';

describe('BrandCard', () => {
  it('renders the brand name', () => {
    render(<BrandCard name="Haldiram" />);
    expect(screen.getByText('Haldiram')).toBeInTheDocument();
  });

  it('renders the brand logo with correct alt text', () => {
    render(
      <BrandCard name="Tata" logoUrl="/images/tata-logo.png" />
    );
    const logo = screen.getByAltText('Tata logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/tata-logo.png');
  });

  it('renders placeholder when logoUrl is not provided', () => {
    const { container } = render(<BrandCard name="NoLogo" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    // Placeholder div should exist
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<BrandCard name="MDH" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button', { name: 'MDH' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('has aria-label set to the brand name', () => {
    render(<BrandCard name="Britannia" />);
    expect(screen.getByRole('button', { name: 'Britannia' })).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<BrandCard name="Test" testID="brand-card" />);
    expect(screen.getByTestId('brand-card')).toBeInTheDocument();
  });
});
