import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from '../ReviewCard';

describe('ReviewCard', () => {
  const defaultProps = {
    name: 'Jane Doe',
    date: 'Jan 15, 2026',
    rating: 4,
    reviewText: 'Great quality groceries, fast delivery!',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  it('renders the reviewer name', () => {
    render(<ReviewCard {...defaultProps} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders the review text', () => {
    render(<ReviewCard {...defaultProps} />);
    expect(screen.getByText('Great quality groceries, fast delivery!')).toBeInTheDocument();
  });

  it('renders the date', () => {
    render(<ReviewCard {...defaultProps} />);
    expect(screen.getByText('Jan 15, 2026')).toBeInTheDocument();
  });

  it('renders the star rating with aria-label', () => {
    render(<ReviewCard {...defaultProps} />);
    expect(screen.getByLabelText('Rating: 4 out of 5')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<ReviewCard {...defaultProps} testID="review-card" />);
    expect(screen.getByTestId('review-card')).toBeInTheDocument();
  });

  it('renders 5 star icons', () => {
    const { container } = render(<ReviewCard {...defaultProps} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });
});
