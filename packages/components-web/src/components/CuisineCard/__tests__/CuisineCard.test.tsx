import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CuisineCard } from '../CuisineCard';

describe('CuisineCard', () => {
  const defaultProps = {
    slug: 'indian',
    name: 'Indian',
    imageUrl: 'https://img.test/indian.jpg',
    recipeCount: 42,
  };

  it('renders the cuisine name', () => {
    render(<CuisineCard {...defaultProps} />);
    expect(screen.getByText('Indian')).toBeInTheDocument();
  });

  it('renders the cuisine image', () => {
    const { container } = render(<CuisineCard {...defaultProps} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://img.test/indian.jpg');
  });

  it('renders a placeholder when imageUrl is not provided', () => {
    const { container } = render(<CuisineCard {...defaultProps} imageUrl={undefined} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders recipe count in md size', () => {
    render(<CuisineCard {...defaultProps} size="md" />);
    expect(screen.getByText('42 recipes')).toBeInTheDocument();
  });

  it('uses singular "recipe" for count of 1', () => {
    render(<CuisineCard {...defaultProps} recipeCount={1} size="md" />);
    expect(screen.getByText('1 recipe')).toBeInTheDocument();
  });

  it('does not render recipe count in sm size', () => {
    render(<CuisineCard {...defaultProps} size="sm" />);
    expect(screen.queryByText('42 recipes')).not.toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<CuisineCard {...defaultProps} onPress={onPress} />);
    fireEvent.click(screen.getByRole('button', { name: 'Indian' }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('calls onPress on Enter key', () => {
    const onPress = vi.fn();
    render(<CuisineCard {...defaultProps} onPress={onPress} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Indian' }), { key: 'Enter' });
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('renders with the correct testID', () => {
    render(<CuisineCard {...defaultProps} testID="cuisine-indian" />);
    expect(screen.getByTestId('cuisine-indian')).toBeInTheDocument();
  });
});
