import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('renders with testID', () => {
    render(<Header testID="header" />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders with role="banner"', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders title text', () => {
    render(<Header title="Groxigo" />);
    expect(screen.getByText('Groxigo')).toBeInTheDocument();
  });

  it('renders leftAction slot', () => {
    render(<Header leftAction={<button>Menu</button>} />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('renders rightActions slot', () => {
    render(
      <Header
        rightActions={[
          <button key="cart">Cart</button>,
          <button key="profile">Profile</button>,
        ]}
      />
    );
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders children (center content)', () => {
    render(
      <Header>
        <input placeholder="Search..." />
      </Header>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('does not render rightActions when array is empty', () => {
    const { container } = render(<Header rightActions={[]} testID="header" />);
    const header = screen.getByTestId('header');
    // rightActions wrapper should not exist
    expect(header.querySelectorAll('[class*="rightActions"]').length).toBe(0);
  });

  it('does not render title when not provided', () => {
    const { container } = render(<Header testID="header" />);
    const header = screen.getByTestId('header');
    expect(header.querySelector('span')).toBeNull();
  });
});
