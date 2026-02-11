import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryCard } from '../CategoryCard';

describe('CategoryCard', () => {
  it('renders the category name', () => {
    render(<CategoryCard id="c1" name="Fruits" />);
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('renders the category image with alt text', () => {
    render(
      <CategoryCard
        id="c1"
        name="Vegetables"
        imageUrl="/images/veggies.jpg"
      />
    );
    const img = screen.getByAltText('Vegetables');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/veggies.jpg');
  });

  it('renders icon when imageUrl is not provided but icon is', () => {
    render(<CategoryCard id="c1" name="Dairy" icon="milk-icon" />);
    expect(screen.getByText('milk-icon')).toBeInTheDocument();
  });

  it('renders productCount badge when provided', () => {
    render(<CategoryCard id="c1" name="Grains" productCount={42} />);
    expect(screen.getByText('42 items')).toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<CategoryCard id="c1" name="Snacks" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not have button role when onPress is not provided', () => {
    render(<CategoryCard id="c1" name="Bakery" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<CategoryCard id="c1" name="Test" testID="category-card" />);
    expect(screen.getByTestId('category-card')).toBeInTheDocument();
  });
});
