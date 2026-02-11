import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeCard } from '../RecipeCard';

describe('RecipeCard', () => {
  const defaultProps = {
    id: 'recipe-1',
    title: 'Butter Chicken',
    imageUrl: 'https://img.test/butter-chicken.jpg',
    cookTime: 45,
    servings: 4,
    difficulty: 'medium' as const,
  };

  it('renders the recipe title', () => {
    render(<RecipeCard {...defaultProps} />);
    expect(screen.getByText('Butter Chicken')).toBeInTheDocument();
  });

  it('renders the recipe image', () => {
    render(<RecipeCard {...defaultProps} />);
    const img = screen.getByRole('img', { name: 'Butter Chicken' });
    expect(img).toHaveAttribute('src', 'https://img.test/butter-chicken.jpg');
  });

  it('renders a placeholder when imageUrl is not provided', () => {
    const { container } = render(<RecipeCard {...defaultProps} imageUrl={undefined} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders formatted cook time', () => {
    render(<RecipeCard {...defaultProps} />);
    // "45 min" appears in both the badge and meta row
    const timeElements = screen.getAllByText('45 min');
    expect(timeElements.length).toBeGreaterThanOrEqual(1);
  });

  it('formats time over 60 minutes as hours', () => {
    render(<RecipeCard {...defaultProps} cookTime={90} />);
    const timeElements = screen.getAllByText('1h 30m');
    expect(timeElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders servings in md size', () => {
    render(<RecipeCard {...defaultProps} size="md" />);
    expect(screen.getByText('4 servings')).toBeInTheDocument();
  });

  it('uses singular "serving" for 1 serving', () => {
    render(<RecipeCard {...defaultProps} servings={1} size="md" />);
    expect(screen.getByText('1 serving')).toBeInTheDocument();
  });

  it('does not render servings in sm size', () => {
    render(<RecipeCard {...defaultProps} size="sm" />);
    expect(screen.queryByText('4 servings')).not.toBeInTheDocument();
  });

  it('renders difficulty label', () => {
    render(<RecipeCard {...defaultProps} />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<RecipeCard {...defaultProps} onPress={onPress} />);
    fireEvent.click(screen.getByRole('button', { name: 'Butter Chicken' }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('renders tags in md size', () => {
    const tags = [
      { name: 'Indian', color: 'info' },
      { name: 'Spicy', color: 'warning' },
    ];
    render(<RecipeCard {...defaultProps} tags={tags} size="md" />);
    expect(screen.getByText('Indian')).toBeInTheDocument();
    expect(screen.getByText('Spicy')).toBeInTheDocument();
  });

  it('does not render tags in sm size', () => {
    const tags = [{ name: 'Indian', color: 'info' }];
    render(<RecipeCard {...defaultProps} tags={tags} size="sm" />);
    expect(screen.queryByText('Indian')).not.toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<RecipeCard {...defaultProps} testID="recipe-card-butter-chicken" />);
    expect(screen.getByTestId('recipe-card-butter-chicken')).toBeInTheDocument();
  });
});
