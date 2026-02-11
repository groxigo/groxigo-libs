import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeHero } from '../RecipeHero';

describe('RecipeHero', () => {
  const defaultProps = {
    title: 'Biryani',
    imageUrl: 'https://img.test/biryani.jpg',
    cookTime: '1h 30m',
    difficulty: 'Hard',
    servings: 6,
    rating: 4.8,
  };

  it('renders the recipe title as a heading', () => {
    render(<RecipeHero {...defaultProps} />);
    expect(screen.getByRole('heading', { name: 'Biryani' })).toBeInTheDocument();
  });

  it('renders the hero image', () => {
    const { container } = render(<RecipeHero {...defaultProps} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://img.test/biryani.jpg');
  });

  it('renders a placeholder when imageUrl is not provided', () => {
    const { container } = render(<RecipeHero {...defaultProps} imageUrl={undefined} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders cook time', () => {
    render(<RecipeHero {...defaultProps} />);
    expect(screen.getByText('1h 30m')).toBeInTheDocument();
  });

  it('renders difficulty', () => {
    render(<RecipeHero {...defaultProps} />);
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('renders servings count', () => {
    render(<RecipeHero {...defaultProps} />);
    expect(screen.getByText('6 servings')).toBeInTheDocument();
  });

  it('uses singular "serving" for 1 serving', () => {
    render(<RecipeHero {...defaultProps} servings={1} />);
    expect(screen.getByText('1 serving')).toBeInTheDocument();
  });

  it('renders the rating value', () => {
    render(<RecipeHero {...defaultProps} />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('does not render meta row when no meta props are given', () => {
    const { container } = render(
      <RecipeHero title="Simple Recipe" />
    );
    // No meta items rendered -- verify the meta container is absent
    expect(screen.queryByText(/serving/)).not.toBeInTheDocument();
    expect(screen.queryByText('4.8')).not.toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<RecipeHero {...defaultProps} testID="recipe-hero-biryani" />);
    expect(screen.getByTestId('recipe-hero-biryani')).toBeInTheDocument();
  });
});
