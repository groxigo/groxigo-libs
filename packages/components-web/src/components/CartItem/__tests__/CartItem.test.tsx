import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from '../CartItem';

describe('CartItem', () => {
  const defaultProps = {
    id: 'item-1',
    title: 'Basmati Rice',
    price: 12.99,
    quantity: 2,
    currency: 'USD' as const,
  };

  it('renders the product title', () => {
    render(<CartItem {...defaultProps} />);
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
  });

  it('renders formatted price with currency symbol', () => {
    render(<CartItem {...defaultProps} />);
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });

  it('renders price with INR currency', () => {
    render(<CartItem {...defaultProps} currency="INR" price={499} />);
    expect(screen.getByText('\u20B9499.00')).toBeInTheDocument();
  });

  it('renders the product image when imageUrl is provided', () => {
    render(<CartItem {...defaultProps} imageUrl="https://img.test/rice.jpg" />);
    const img = screen.getByRole('img', { name: 'Basmati Rice' });
    expect(img).toHaveAttribute('src', 'https://img.test/rice.jpg');
  });

  it('renders a placeholder when imageUrl is not provided', () => {
    const { container } = render(<CartItem {...defaultProps} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(<CartItem {...defaultProps} description="5 kg bag" />);
    expect(screen.getByText('5 kg bag')).toBeInTheDocument();
  });

  it('renders the remove button and fires onRemove', () => {
    const onRemove = vi.fn();
    render(<CartItem {...defaultProps} onRemove={onRemove} />);
    const removeBtn = screen.getByRole('button', { name: 'Remove item' });
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('does not render remove button when onRemove is not provided', () => {
    render(<CartItem {...defaultProps} />);
    expect(screen.queryByRole('button', { name: 'Remove item' })).not.toBeInTheDocument();
  });

  it('does not call onRemove when disabled', () => {
    const onRemove = vi.fn();
    render(<CartItem {...defaultProps} onRemove={onRemove} disabled />);
    const removeBtn = screen.getByRole('button', { name: 'Remove item' });
    fireEvent.click(removeBtn);
    expect(onRemove).not.toHaveBeenCalled();
  });

  it('renders with the correct testID', () => {
    render(<CartItem {...defaultProps} testID="cart-item-rice" />);
    expect(screen.getByTestId('cart-item-rice')).toBeInTheDocument();
  });
});
