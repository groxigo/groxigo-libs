import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeliveryInfoCard } from '../DeliveryInfoCard';

describe('DeliveryInfoCard', () => {
  const defaultProps = {
    estimatedTime: '30-45 min',
    itemCount: 8,
    deliveryFee: '$4.99',
    freeDeliveryThreshold: '$35',
  };

  it('renders the estimated delivery time', () => {
    render(<DeliveryInfoCard {...defaultProps} />);
    expect(screen.getByText('30-45 min')).toBeInTheDocument();
  });

  it('renders "Delivery in" label', () => {
    render(<DeliveryInfoCard {...defaultProps} />);
    expect(screen.getByText('Delivery in')).toBeInTheDocument();
  });

  it('renders the item count with correct text', () => {
    render(<DeliveryInfoCard {...defaultProps} />);
    expect(screen.getByText('8 items in your cart')).toBeInTheDocument();
  });

  it('renders singular item text for count of 1', () => {
    render(<DeliveryInfoCard {...defaultProps} itemCount={1} />);
    expect(screen.getByText('1 item in your cart')).toBeInTheDocument();
  });

  it('renders the delivery fee', () => {
    render(<DeliveryInfoCard {...defaultProps} />);
    expect(screen.getByText('Delivery: $4.99')).toBeInTheDocument();
  });

  it('renders free delivery threshold message', () => {
    render(<DeliveryInfoCard {...defaultProps} />);
    expect(screen.getByText('Free delivery on orders over $35')).toBeInTheDocument();
  });

  it('renders Change button when onChange is provided', () => {
    const onChange = vi.fn();
    render(<DeliveryInfoCard {...defaultProps} onChange={onChange} />);
    const changeButton = screen.getByText('Change');
    expect(changeButton).toBeInTheDocument();
    fireEvent.click(changeButton);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('applies testID as data-testid', () => {
    render(<DeliveryInfoCard {...defaultProps} testID="delivery-info" />);
    expect(screen.getByTestId('delivery-info')).toBeInTheDocument();
  });
});
