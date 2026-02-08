import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from '../Menu';
import { MenuButton } from '../MenuButton';
import { MenuList } from '../MenuList';
import { MenuItem } from '../MenuItem';

function TestMenu({
  onItemClick,
  defaultIsOpen = false,
}: {
  onItemClick?: () => void;
  defaultIsOpen?: boolean;
}) {
  return (
    <Menu defaultIsOpen={defaultIsOpen} testID="menu">
      <MenuButton testID="menu-btn">Actions</MenuButton>
      <MenuList testID="menu-list">
        <MenuItem onClick={onItemClick} testID="item-edit">Edit</MenuItem>
        <MenuItem onClick={onItemClick} testID="item-delete">Delete</MenuItem>
        <MenuItem disabled testID="item-disabled">Disabled</MenuItem>
      </MenuList>
    </Menu>
  );
}

describe('Menu', () => {
  it('renders trigger button', () => {
    render(<TestMenu />);
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('does not show menu list by default', () => {
    render(<TestMenu />);
    expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
  });

  it('opens menu list on button click', () => {
    render(<TestMenu />);
    fireEvent.click(screen.getByTestId('menu-btn'));
    expect(screen.getByTestId('menu-list')).toBeInTheDocument();
  });

  it('renders menu items when open', () => {
    render(<TestMenu defaultIsOpen />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('closes menu on button click when already open', () => {
    render(<TestMenu defaultIsOpen />);
    expect(screen.getByTestId('menu-list')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('menu-btn'));
    expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
  });

  it('calls onClick handler on menu item click', () => {
    const onItemClick = vi.fn();
    render(<TestMenu onItemClick={onItemClick} defaultIsOpen />);
    fireEvent.click(screen.getByTestId('item-edit'));
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  it('closes menu after item click when closeOnSelect is true (default)', () => {
    render(<TestMenu defaultIsOpen />);
    fireEvent.click(screen.getByTestId('item-edit'));
    // Menu should close after selecting an item
    expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
  });

  it('renders disabled menu items with aria-disabled', () => {
    render(<TestMenu defaultIsOpen />);
    const disabledItem = screen.getByTestId('item-disabled');
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets aria-haspopup="menu" on trigger button', () => {
    render(<TestMenu />);
    expect(screen.getByTestId('menu-btn')).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('sets aria-expanded on trigger button', () => {
    render(<TestMenu />);
    const btn = screen.getByTestId('menu-btn');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders menu list with role="menu"', () => {
    render(<TestMenu defaultIsOpen />);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders menu items with role="menuitem"', () => {
    render(<TestMenu defaultIsOpen />);
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(3);
  });

  it('applies testID as data-testid', () => {
    render(<TestMenu />);
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });
});
