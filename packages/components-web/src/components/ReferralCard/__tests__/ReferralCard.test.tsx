import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReferralCard } from '../ReferralCard';

describe('ReferralCard', () => {
  const defaultProps = {
    referralCode: 'GROX2026',
  };

  it('renders the default title', () => {
    render(<ReferralCard {...defaultProps} />);
    expect(screen.getByText('Invite Friends & Earn')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<ReferralCard {...defaultProps} title="Refer & Save" />);
    expect(screen.getByText('Refer & Save')).toBeInTheDocument();
  });

  it('renders the referral code', () => {
    render(<ReferralCard {...defaultProps} />);
    expect(screen.getByText('GROX2026')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<ReferralCard {...defaultProps} subtitle="Share and earn $10" />);
    expect(screen.getByText('Share and earn $10')).toBeInTheDocument();
  });

  it('renders the Share Invite Link button when onShare is provided', () => {
    const onShare = vi.fn();
    render(<ReferralCard {...defaultProps} onShare={onShare} />);
    expect(screen.getByText('Share Invite Link')).toBeInTheDocument();
  });

  it('renders Copy button when onCopyCode is provided', () => {
    const onCopyCode = vi.fn();
    render(<ReferralCard {...defaultProps} onCopyCode={onCopyCode} />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('renders invited count and earned amount', () => {
    render(
      <ReferralCard
        {...defaultProps}
        invitedCount={12}
        earnedAmount="$60.00"
      />
    );
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Invited')).toBeInTheDocument();
    expect(screen.getByText('$60.00')).toBeInTheDocument();
    expect(screen.getByText('Earned')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<ReferralCard {...defaultProps} testID="referral-card" />);
    expect(screen.getByTestId('referral-card')).toBeInTheDocument();
  });
});
