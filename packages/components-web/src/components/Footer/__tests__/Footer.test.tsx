import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

const mockSections = [
  {
    title: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', onPress: vi.fn() },
    ],
  },
];

const mockSocialLinks = [
  { platform: 'Instagram', href: 'https://instagram.com/groxigo' },
  { platform: 'Twitter', href: 'https://twitter.com/groxigo' },
];

describe('Footer', () => {
  it('renders with testID', () => {
    render(<Footer testID="footer" />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders with role="contentinfo"', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders section titles and links', () => {
    render(<Footer sections={mockSections} />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders links as anchor elements with href', () => {
    render(<Footer sections={mockSections} />);
    const aboutLink = screen.getByText('About Us');
    expect(aboutLink.tagName).toBe('A');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders copyright text', () => {
    render(<Footer copyrightText="2026 Groxigo Inc." />);
    expect(screen.getByText('2026 Groxigo Inc.')).toBeInTheDocument();
  });

  it('renders social links with platform initials', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    // Social links render the first letter as fallback
    expect(screen.getByText('I')).toBeInTheDocument(); // Instagram
    expect(screen.getByText('T')).toBeInTheDocument(); // Twitter
  });

  it('renders social links with correct aria-label', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  });

  it('renders divider when copyright or social links present', () => {
    const { container } = render(
      <Footer copyrightText="2026 Groxigo" />
    );
    expect(container.querySelector('hr')).toBeInTheDocument();
  });
});
