import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductTile } from '../ProductTile';

describe('ProductTile', () => {
  const defaultProps = {
    id: 'prod-1',
    name: 'Basmati Rice',
    imageUrl: '/images/rice.jpg',
    price: 4.99,
  };

  it('renders the product name', () => {
    render(<ProductTile {...defaultProps} />);
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
  });

  it('renders the product image with alt text', () => {
    render(<ProductTile {...defaultProps} />);
    const img = screen.getByAltText('Basmati Rice');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/rice.jpg');
  });

  it('renders the price via PriceDisplay', () => {
    render(<ProductTile {...defaultProps} />);
    expect(screen.getByText('$4.99')).toBeInTheDocument();
  });

  it('renders in category mode when price is omitted (no price shown)', () => {
    render(
      <ProductTile id="cat-1" name="Spices" imageUrl="/images/spices.jpg" />
    );
    expect(screen.getByText('Spices')).toBeInTheDocument();
    expect(screen.queryByText('$')).not.toBeInTheDocument();
  });

  it('renders badge when badge prop is provided', () => {
    render(<ProductTile {...defaultProps} badge="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders favorite button when showFavorite is true', () => {
    render(<ProductTile {...defaultProps} showFavorite />);
    expect(
      screen.getByRole('button', { name: 'Add to favorites' })
    ).toBeInTheDocument();
  });

  it('calls onFavoritePress when favorite button is clicked', () => {
    const onFav = vi.fn();
    render(
      <ProductTile {...defaultProps} showFavorite onFavoritePress={onFav} />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Add to favorites' })
    );
    expect(onFav).toHaveBeenCalledTimes(1);
  });

  it('shows "Remove from favorites" label when isFavorite is true', () => {
    render(<ProductTile {...defaultProps} showFavorite isFavorite />);
    expect(
      screen.getByRole('button', { name: 'Remove from favorites' })
    ).toBeInTheDocument();
  });

  it('renders add button when showAddButton is true', () => {
    render(<ProductTile {...defaultProps} showAddButton />);
    expect(
      screen.getByRole('button', { name: 'Add' })
    ).toBeInTheDocument();
  });

  it('calls onAddPress when add button is clicked', () => {
    const onAdd = vi.fn();
    render(
      <ProductTile {...defaultProps} showAddButton onAddPress={onAdd} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('does not render add button when out of stock', () => {
    render(
      <ProductTile {...defaultProps} showAddButton outOfStock />
    );
    expect(screen.queryByRole('button', { name: 'Add' })).not.toBeInTheDocument();
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('renders out of stock overlay', () => {
    render(<ProductTile {...defaultProps} outOfStock />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('calls onPress when tile is clicked', () => {
    const onPress = vi.fn();
    render(<ProductTile {...defaultProps} onPress={onPress} />);
    fireEvent.click(screen.getByRole('button', { name: 'Basmati Rice' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders weight badge in product mode', () => {
    render(<ProductTile {...defaultProps} weight="500g" />);
    expect(screen.getByText('500g')).toBeInTheDocument();
  });

  it('renders rating and review count', () => {
    render(
      <ProductTile {...defaultProps} rating={4.5} reviewCount={120} />
    );
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(120)')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<ProductTile {...defaultProps} testID="product-tile" />);
    expect(screen.getByTestId('product-tile')).toBeInTheDocument();
  });
});
