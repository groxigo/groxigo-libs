import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Groceries', href: '/products/groceries' },
];

describe('Breadcrumb', () => {
  it('renders a nav element with aria-label', () => {
    render(<Breadcrumb items={defaultItems} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('renders all breadcrumb item labels', () => {
    render(<Breadcrumb items={defaultItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('renders separator between items', () => {
    render(<Breadcrumb items={defaultItems} separator="/" />);
    // There should be separators between items (count = items.length - 1)
    const separators = screen.getAllByText('/');
    expect(separators.length).toBe(2);
  });

  it('renders custom separator', () => {
    render(<Breadcrumb items={defaultItems} separator=">" />);
    const separators = screen.getAllByText('>');
    expect(separators.length).toBe(2);
  });

  it('marks the last item as current page', () => {
    render(<Breadcrumb items={defaultItems} />);
    const lastItem = screen.getByText('Groceries');
    expect(lastItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders non-current items as links', () => {
    render(<Breadcrumb items={defaultItems} />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders item with isCurrent as span (not a link)', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current', isCurrent: true },
    ];
    render(<Breadcrumb items={items} />);
    const currentItem = screen.getByText('Current');
    expect(currentItem.tagName).not.toBe('A');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('collapses items when maxItems is set', () => {
    const manyItems = [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/cat' },
      { label: 'Subcategory', href: '/cat/sub' },
      { label: 'Product', href: '/cat/sub/prod' },
      { label: 'Details' },
    ];
    render(<Breadcrumb items={manyItems} maxItems={3} />);
    // Should show first 1, ellipsis, last 1
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    // Middle items should not be visible
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
    expect(screen.queryByText('Subcategory')).not.toBeInTheDocument();
  });

  it('does not collapse when items count is within maxItems', () => {
    render(<Breadcrumb items={defaultItems} maxItems={5} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('renders separators as aria-hidden', () => {
    const { container } = render(<Breadcrumb items={defaultItems} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBeGreaterThanOrEqual(2);
  });

  it('applies testID as data-testid', () => {
    render(<Breadcrumb items={defaultItems} testID="my-breadcrumb" />);
    expect(screen.getByTestId('my-breadcrumb')).toBeInTheDocument();
  });

  it('forwards ref to the nav element', () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>;
    render(<Breadcrumb ref={ref} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('NAV');
  });

  it('renders items with onPress handlers', () => {
    const onPress = vi.fn();
    const items = [
      { label: 'Home', href: '/', onPress },
      { label: 'Current' },
    ];
    render(<Breadcrumb items={items} />);
    // The link should be rendered for the Home item
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeInTheDocument();
  });
});
