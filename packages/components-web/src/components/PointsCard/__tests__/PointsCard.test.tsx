import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PointsCard } from '../PointsCard';

describe('PointsCard', () => {
  const defaultProps = {
    points: 2500,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 500,
    progressPercent: 83,
  };

  it('renders the points balance formatted with commas', () => {
    render(<PointsCard {...defaultProps} />);
    expect(screen.getByText('2,500')).toBeInTheDocument();
  });

  it('renders the "points" unit label', () => {
    render(<PointsCard {...defaultProps} />);
    expect(screen.getByText('points')).toBeInTheDocument();
  });

  it('renders the current tier', () => {
    render(<PointsCard {...defaultProps} />);
    expect(screen.getByText('Gold')).toBeInTheDocument();
  });

  it('renders progress label toward next tier', () => {
    render(<PointsCard {...defaultProps} />);
    expect(screen.getByText('500 points to Platinum')).toBeInTheDocument();
  });

  it('renders "My Points" label', () => {
    render(<PointsCard {...defaultProps} />);
    expect(screen.getByText('My Points')).toBeInTheDocument();
  });

  it('renders Redeem button when onRedeem is provided', () => {
    const onRedeem = vi.fn();
    render(<PointsCard {...defaultProps} onRedeem={onRedeem} />);
    expect(screen.getByText('Redeem')).toBeInTheDocument();
  });

  it('renders View History link when onViewHistory is provided', () => {
    const onViewHistory = vi.fn();
    render(<PointsCard {...defaultProps} onViewHistory={onViewHistory} />);
    expect(screen.getByText('View History')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<PointsCard {...defaultProps} testID="points-card" />);
    expect(screen.getByTestId('points-card')).toBeInTheDocument();
  });
});
