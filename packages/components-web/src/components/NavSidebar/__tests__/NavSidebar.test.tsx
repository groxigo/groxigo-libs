import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavSidebar } from '../NavSidebar';

describe('NavSidebar', () => {
  const defaultItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'products', label: 'Products', icon: '📦' },
    {
      key: 'settings',
      label: 'Settings',
      icon: '⚙️',
      children: [
        { key: 'general', label: 'General' },
        { key: 'security', label: 'Security' },
      ],
    },
  ];

  it('renders all top-level nav item labels', () => {
    render(<NavSidebar items={defaultItems} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    render(<NavSidebar items={defaultItems} activeKey="products" />);
    const productsButton = screen.getByText('Products').closest('button');
    expect(productsButton).toHaveAttribute('aria-current', 'page');
  });

  it('does not show children by default (collapsed submenu)', () => {
    render(<NavSidebar items={defaultItems} />);
    expect(screen.queryByText('General')).not.toBeInTheDocument();
    expect(screen.queryByText('Security')).not.toBeInTheDocument();
  });

  it('expands children when parent item with children is clicked', () => {
    const onSelect = vi.fn();
    render(<NavSidebar items={defaultItems} onSelect={onSelect} />);
    const settingsButton = screen.getByText('Settings').closest('button');
    fireEvent.click(settingsButton!);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('collapses children when parent is clicked again', () => {
    render(<NavSidebar items={defaultItems} />);
    const settingsButton = screen.getByText('Settings').closest('button');
    fireEvent.click(settingsButton!);
    expect(screen.getByText('General')).toBeInTheDocument();
    fireEvent.click(settingsButton!);
    expect(screen.queryByText('General')).not.toBeInTheDocument();
  });

  it('calls onSelect when a nav item is clicked', () => {
    const onSelect = vi.fn();
    render(<NavSidebar items={defaultItems} onSelect={onSelect} />);
    const productsButton = screen.getByText('Products').closest('button');
    fireEvent.click(productsButton!);
    expect(onSelect).toHaveBeenCalledWith('products');
  });

  it('has sidebar navigation landmark with aria-label', () => {
    render(<NavSidebar items={defaultItems} />);
    expect(screen.getByRole('complementary', { name: 'Sidebar navigation' })).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<NavSidebar items={defaultItems} testID="nav-sidebar" />);
    expect(screen.getByTestId('nav-sidebar')).toBeInTheDocument();
  });
});
