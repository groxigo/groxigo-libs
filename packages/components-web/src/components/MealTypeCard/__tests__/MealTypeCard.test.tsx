import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MealTypeCard } from '../MealTypeCard';

describe('MealTypeCard', () => {
  const defaultProps = {
    label: 'Breakfast',
    emoji: '\uD83C\uDF73',
  };

  it('renders the meal type label', () => {
    render(<MealTypeCard {...defaultProps} />);
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
  });

  it('renders the emoji', () => {
    render(<MealTypeCard {...defaultProps} />);
    expect(screen.getByText('\uD83C\uDF73')).toBeInTheDocument();
  });

  it('renders icon when provided instead of emoji', () => {
    const { container } = render(<MealTypeCard label="Lunch" icon="🍜" />);
    expect(container.textContent).toContain('🍜');
  });

  it('marks as pressed when selected', () => {
    render(<MealTypeCard {...defaultProps} selected />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('marks as not pressed when not selected', () => {
    render(<MealTypeCard {...defaultProps} selected={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<MealTypeCard {...defaultProps} onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('renders with the correct testID', () => {
    render(<MealTypeCard {...defaultProps} testID="meal-type-breakfast" />);
    expect(screen.getByTestId('meal-type-breakfast')).toBeInTheDocument();
  });
});
