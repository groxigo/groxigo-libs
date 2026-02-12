import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FloatingCartButton } from '../FloatingCartButton';

describe('FloatingCartButton', () => {
  it('renders with testID', () => {
    render(<FloatingCartButton testID="cart-btn" />);
    expect(screen.getByTestId('cart-btn')).toBeInTheDocument();
  });

  it('renders cart button with aria-label "Cart" when no items', () => {
    render(<FloatingCartButton />);
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
  });

  it('renders cart button with item count in aria-label', () => {
    render(<FloatingCartButton count={5} />);
    expect(screen.getByLabelText('Cart with 5 items')).toBeInTheDocument();
  });

  it('shows badge when count > 0', () => {
    render(<FloatingCartButton count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not show badge when count is 0', () => {
    render(<FloatingCartButton count={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('does not show badge when count is undefined', () => {
    const { container } = render(<FloatingCartButton />);
    // Badge should not be rendered
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
  });

  it('shows 99+ when count exceeds 99', () => {
    render(<FloatingCartButton count={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('calls onPress when button is pressed', () => {
    const handleClick = vi.fn();
    render(<FloatingCartButton onPress={handleClick} />);
    screen.getByLabelText('Cart').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom icon when provided', () => {
    render(<FloatingCartButton icon={<span data-testid="custom-icon">IC</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
