import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotificationsCard } from '../NotificationsCard';

describe('NotificationsCard', () => {
  const defaultSettings = [
    { key: 'orders', label: 'Order Updates', enabled: true },
    { key: 'promos', label: 'Promotions', enabled: false },
    { key: 'delivery', label: 'Delivery Alerts', enabled: true },
  ];

  it('renders the default title "Notifications"', () => {
    render(<NotificationsCard settings={defaultSettings} />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<NotificationsCard settings={defaultSettings} title="Alert Preferences" />);
    expect(screen.getByText('Alert Preferences')).toBeInTheDocument();
  });

  it('renders all notification setting labels', () => {
    render(<NotificationsCard settings={defaultSettings} />);
    expect(screen.getByText('Order Updates')).toBeInTheDocument();
    expect(screen.getByText('Promotions')).toBeInTheDocument();
    expect(screen.getByText('Delivery Alerts')).toBeInTheDocument();
  });

  it('renders the correct number of settings', () => {
    const { container } = render(<NotificationsCard settings={defaultSettings} />);
    const items = container.querySelectorAll('.item');
    expect(items.length).toBe(3);
  });

  it('applies testID as data-testid', () => {
    render(<NotificationsCard settings={defaultSettings} testID="notif-card" />);
    expect(screen.getByTestId('notif-card')).toBeInTheDocument();
  });

  it('passes derived testIDs to individual switches', () => {
    render(<NotificationsCard settings={defaultSettings} testID="notif-card" />);
    expect(screen.getByTestId('notif-card-orders')).toBeInTheDocument();
    expect(screen.getByTestId('notif-card-promos')).toBeInTheDocument();
    expect(screen.getByTestId('notif-card-delivery')).toBeInTheDocument();
  });
});
