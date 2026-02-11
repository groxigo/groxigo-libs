import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HorizontalNav } from '../HorizontalNav';

describe('HorizontalNav', () => {
  const defaultItems = [
    { key: 'home', label: 'Home' },
    { key: 'orders', label: 'Orders' },
    { key: 'profile', label: 'Profile' },
  ];

  it('renders all nav item labels', () => {
    render(<HorizontalNav items={defaultItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    render(<HorizontalNav items={defaultItems} activeKey="orders" />);
    const ordersButton = screen.getByText('Orders').closest('button');
    expect(ordersButton).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark inactive items with aria-current', () => {
    render(<HorizontalNav items={defaultItems} activeKey="orders" />);
    const homeButton = screen.getByText('Home').closest('button');
    expect(homeButton).not.toHaveAttribute('aria-current');
  });

  it('renders icon when provided', () => {
    const itemsWithIcon = [
      { key: 'home', label: 'Home', icon: '🏠' },
    ];
    const { container } = render(<HorizontalNav items={itemsWithIcon} />);
    const iconWrapper = container.querySelector('.iconWrapper');
    expect(iconWrapper).toHaveTextContent('🏠');
  });

  it('renders badge count when provided', () => {
    const itemsWithBadge = [
      { key: 'orders', label: 'Orders', badge: 5 },
    ];
    render(<HorizontalNav items={itemsWithBadge} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders 99+ for badge counts over 99', () => {
    const itemsWithBigBadge = [
      { key: 'orders', label: 'Orders', badge: 150 },
    ];
    render(<HorizontalNav items={itemsWithBigBadge} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('has navigation landmark with aria-label', () => {
    render(<HorizontalNav items={defaultItems} />);
    expect(screen.getByRole('navigation', { name: 'Horizontal navigation' })).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<HorizontalNav items={defaultItems} testID="horiz-nav" />);
    expect(screen.getByTestId('horiz-nav')).toBeInTheDocument();
  });
});
