import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IngredientRow } from '../IngredientRow';

describe('IngredientRow', () => {
  const defaultProps = {
    name: 'Basmati Rice',
    quantity: '2 cups',
  };

  it('renders the ingredient name', () => {
    render(<IngredientRow {...defaultProps} />);
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
  });

  it('renders the quantity', () => {
    render(<IngredientRow {...defaultProps} />);
    expect(screen.getByText('2 cups')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    render(<IngredientRow {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checked when checked prop is true', () => {
    render(<IngredientRow {...defaultProps} checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = vi.fn();
    render(<IngredientRow {...defaultProps} onToggle={onToggle} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('renders children (product carousel slot)', () => {
    render(
      <IngredientRow {...defaultProps}>
        <div data-testid="product-carousel">Products here</div>
      </IngredientRow>
    );
    expect(screen.getByTestId('product-carousel')).toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<IngredientRow {...defaultProps} testID="ingredient-rice" />);
    expect(screen.getByTestId('ingredient-rice')).toBeInTheDocument();
  });
});
