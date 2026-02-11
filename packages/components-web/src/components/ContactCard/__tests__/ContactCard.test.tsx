import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactCard } from '../ContactCard';

describe('ContactCard', () => {
  const defaultProps = {
    email: 'support@groxigo.com',
    phone: '+1 800-555-0199',
  };

  it('renders the default title "Contact Us"', () => {
    render(<ContactCard {...defaultProps} />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<ContactCard {...defaultProps} title="Customer Support" />);
    expect(screen.getByText('Customer Support')).toBeInTheDocument();
  });

  it('renders the email as a mailto link', () => {
    render(<ContactCard {...defaultProps} />);
    const emailLink = screen.getByText('support@groxigo.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:support@groxigo.com');
  });

  it('renders the phone as a tel link', () => {
    render(<ContactCard {...defaultProps} />);
    const phoneLink = screen.getByText('+1 800-555-0199');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+1 800-555-0199');
  });

  it('renders description when provided', () => {
    render(<ContactCard {...defaultProps} description="We are here to help!" />);
    expect(screen.getByText('We are here to help!')).toBeInTheDocument();
  });

  it('renders Get in Touch button when onContact is provided', () => {
    const onContact = vi.fn();
    render(<ContactCard {...defaultProps} onContact={onContact} />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('does not render Get in Touch button when onContact is not provided', () => {
    render(<ContactCard {...defaultProps} />);
    expect(screen.queryByText('Get in Touch')).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<ContactCard {...defaultProps} testID="contact-card" />);
    expect(screen.getByTestId('contact-card')).toBeInTheDocument();
  });
});
