import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StoryAvatar } from '../StoryAvatar';

describe('StoryAvatar', () => {
  it('renders the name', () => {
    render(<StoryAvatar name="Fresh Deals" />);
    expect(screen.getByText('Fresh Deals')).toBeInTheDocument();
  });

  it('has aria-label indicating story with (new) for unseen state', () => {
    render(<StoryAvatar name="Recipes" state="unseen" />);
    expect(
      screen.getByRole('button', { name: 'Recipes story (new)' })
    ).toBeInTheDocument();
  });

  it('has aria-label without (new) for seen state', () => {
    render(<StoryAvatar name="Recipes" state="seen" />);
    expect(
      screen.getByRole('button', { name: 'Recipes story' })
    ).toBeInTheDocument();
  });

  it('defaults to unseen state', () => {
    render(<StoryAvatar name="Default" />);
    expect(
      screen.getByRole('button', { name: 'Default story (new)' })
    ).toBeInTheDocument();
  });

  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<StoryAvatar name="Click Me" onPress={onPress} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Click Me story (new)' })
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies testID as data-testid', () => {
    render(<StoryAvatar name="Test" testID="story-avatar" />);
    expect(screen.getByTestId('story-avatar')).toBeInTheDocument();
  });
});
