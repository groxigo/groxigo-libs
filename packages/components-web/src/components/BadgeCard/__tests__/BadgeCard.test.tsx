import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BadgeCard } from '../BadgeCard';

describe('BadgeCard', () => {
  it('renders the badge name', () => {
    render(<BadgeCard name="First Purchase" />);
    expect(screen.getByText('First Purchase')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    const { container } = render(<BadgeCard name="Loyal Shopper" icon="🛒" />);
    const iconSpan = container.querySelector('.icon');
    expect(iconSpan).toHaveTextContent('🛒');
  });

  it('renders the description when provided', () => {
    render(<BadgeCard name="First Purchase" description="Complete your first order" />);
    expect(screen.getByText('Complete your first order')).toBeInTheDocument();
  });

  it('defaults to earned state', () => {
    render(<BadgeCard name="First Purchase" testID="badge" />);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-state', 'earned');
  });

  it('renders in locked state with lock overlay', () => {
    const { container } = render(<BadgeCard name="VIP" state="locked" testID="badge" />);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-state', 'locked');
    const lockOverlay = container.querySelector('.lockOverlay');
    expect(lockOverlay).toBeInTheDocument();
  });

  it('does not render lock overlay in earned state', () => {
    const { container } = render(<BadgeCard name="Starter" state="earned" />);
    const lockOverlay = container.querySelector('.lockOverlay');
    expect(lockOverlay).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<BadgeCard name="First Purchase" testID="badge-card" />);
    expect(screen.getByTestId('badge-card')).toBeInTheDocument();
  });
});
