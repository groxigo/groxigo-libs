import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChallengeCard } from '../ChallengeCard';

describe('ChallengeCard', () => {
  const defaultProps = {
    title: 'Weekly Shopper',
    description: 'Place 3 orders this week',
    progress: 2,
    total: 3,
    reward: '$5 off',
    deadline: 'Ends Jan 20',
  };

  it('renders the challenge title', () => {
    render(<ChallengeCard {...defaultProps} />);
    expect(screen.getByText('Weekly Shopper')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ChallengeCard {...defaultProps} />);
    expect(screen.getByText('Place 3 orders this week')).toBeInTheDocument();
  });

  it('renders progress text', () => {
    render(<ChallengeCard {...defaultProps} />);
    expect(screen.getByText('2 of 3 completed')).toBeInTheDocument();
  });

  it('renders the reward', () => {
    render(<ChallengeCard {...defaultProps} />);
    expect(screen.getByText('$5 off')).toBeInTheDocument();
  });

  it('renders the deadline', () => {
    render(<ChallengeCard {...defaultProps} />);
    expect(screen.getByText('Ends Jan 20')).toBeInTheDocument();
  });

  it('does not render deadline when not provided', () => {
    render(<ChallengeCard {...defaultProps} deadline={undefined} />);
    expect(screen.queryByText('Ends Jan 20')).not.toBeInTheDocument();
  });

  it('does not render reward when not provided', () => {
    render(<ChallengeCard {...defaultProps} reward={undefined} />);
    expect(screen.queryByText('$5 off')).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<ChallengeCard {...defaultProps} testID="challenge-card" />);
    expect(screen.getByTestId('challenge-card')).toBeInTheDocument();
  });
});
