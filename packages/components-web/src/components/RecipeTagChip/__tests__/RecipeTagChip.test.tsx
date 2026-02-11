import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeTagChip } from '../RecipeTagChip';

describe('RecipeTagChip', () => {
  it('renders the tag label', () => {
    render(<RecipeTagChip label="Vegetarian" />);
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
  });

  it('renders with button role when onPress is provided', () => {
    render(<RecipeTagChip label="Spicy" onPress={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not have button role when onPress is not provided', () => {
    render(<RecipeTagChip label="Gluten Free" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<RecipeTagChip label="Vegan" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('calls onPress on Enter key', () => {
    const onPress = vi.fn();
    render(<RecipeTagChip label="Quick" onPress={onPress} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('calls onPress on Space key', () => {
    const onPress = vi.fn();
    render(<RecipeTagChip label="Halal" onPress={onPress} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('renders with the correct testID', () => {
    render(<RecipeTagChip label="Dairy Free" testID="tag-dairy-free" />);
    expect(screen.getByTestId('tag-dairy-free')).toBeInTheDocument();
  });
});
