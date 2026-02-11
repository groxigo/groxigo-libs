import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DietaryPreferenceChip } from '../DietaryPreferenceChip';

describe('DietaryPreferenceChip', () => {
  it('renders the label', () => {
    render(<DietaryPreferenceChip label="Vegetarian" />);
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
  });

  it('renders the emoji when provided', () => {
    const { container } = render(
      <DietaryPreferenceChip label="Vegan" emoji="🌱" />
    );
    const iconSpan = container.querySelector('.icon');
    expect(iconSpan).toHaveTextContent('🌱');
  });

  it('renders unselected by default', () => {
    render(<DietaryPreferenceChip label="Halal" testID="chip" />);
    expect(screen.getByTestId('chip')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders selected state with check mark', () => {
    const { container } = render(
      <DietaryPreferenceChip label="Halal" selected testID="chip" />
    );
    expect(screen.getByTestId('chip')).toHaveAttribute('aria-pressed', 'true');
    const checkIcon = container.querySelector('.checkIcon');
    expect(checkIcon).toBeInTheDocument();
  });

  it('does not render check mark when unselected', () => {
    const { container } = render(
      <DietaryPreferenceChip label="Halal" selected={false} />
    );
    const checkIcon = container.querySelector('.checkIcon');
    expect(checkIcon).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<DietaryPreferenceChip label="Kosher" testID="diet-chip" />);
    expect(screen.getByTestId('diet-chip')).toBeInTheDocument();
  });
});
