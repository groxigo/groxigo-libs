import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderCard } from '../OrderCard';

describe('OrderCard', () => {
  const defaultProps = {
    orderId: 'ord-123',
    orderNumber: '#GRX-20260115-001',
    status: 'delivered' as const,
    date: 'Jan 15, 2026',
    itemCount: 5,
    total: '$47.99',
  };

  it('renders the order number', () => {
    render(<OrderCard {...defaultProps} />);
    expect(screen.getByText('#GRX-20260115-001')).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    render(<OrderCard {...defaultProps} />);
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  it('renders the order date', () => {
    render(<OrderCard {...defaultProps} />);
    expect(screen.getByText('Jan 15, 2026')).toBeInTheDocument();
  });

  it('renders the item count with correct pluralization', () => {
    render(<OrderCard {...defaultProps} />);
    expect(screen.getByText('5 items')).toBeInTheDocument();
  });

  it('renders singular item text for count of 1', () => {
    render(<OrderCard {...defaultProps} itemCount={1} />);
    expect(screen.getByText('1 item')).toBeInTheDocument();
  });

  it('renders the total', () => {
    render(<OrderCard {...defaultProps} />);
    expect(screen.getByText('$47.99')).toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<OrderCard {...defaultProps} onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders Reorder button when onReorder is provided', () => {
    const onReorder = vi.fn();
    render(<OrderCard {...defaultProps} onReorder={onReorder} />);
    expect(screen.getByText('Reorder')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<OrderCard {...defaultProps} testID="order-card" />);
    expect(screen.getByTestId('order-card')).toBeInTheDocument();
  });

  it('renders product images when provided', () => {
    render(
      <OrderCard
        {...defaultProps}
        productImages={['img1.jpg', 'img2.jpg']}
      />
    );
    expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    expect(screen.getByAltText('Product 2')).toBeInTheDocument();
  });
});
