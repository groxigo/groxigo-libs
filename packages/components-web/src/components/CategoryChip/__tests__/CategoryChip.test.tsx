import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryChip } from '../CategoryChip';

describe('CategoryChip', () => {
  it('renders the label', () => {
    render(<CategoryChip label="All" />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('renders as a button', () => {
    render(<CategoryChip label="Fresh" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<CategoryChip label="Organic" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('has aria-pressed true when selected', () => {
    render(<CategoryChip label="Dairy" selected />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('has aria-pressed false when not selected', () => {
    render(<CategoryChip label="Dairy" selected={false} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('renders iconNode when provided', () => {
    render(
      <CategoryChip
        label="Meat"
        iconNode={<span data-testid="chip-icon">icon</span>}
      />
    );
    expect(screen.getByTestId('chip-icon')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<CategoryChip label="Test" testID="category-chip" />);
    expect(screen.getByTestId('category-chip')).toBeInTheDocument();
  });
});
