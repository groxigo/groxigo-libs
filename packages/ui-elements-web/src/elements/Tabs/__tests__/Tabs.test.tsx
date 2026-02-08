import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../Tabs';

const defaultItems = [
  { key: 'tab1', label: 'Tab One', content: <div>Content One</div> },
  { key: 'tab2', label: 'Tab Two', content: <div>Content Two</div> },
  { key: 'tab3', label: 'Tab Three', content: <div>Content Three</div>, disabled: true },
];

describe('Tabs', () => {
  it('renders tab buttons', () => {
    render(<Tabs items={defaultItems} />);
    expect(screen.getByText('Tab One')).toBeInTheDocument();
    expect(screen.getByText('Tab Two')).toBeInTheDocument();
    expect(screen.getByText('Tab Three')).toBeInTheDocument();
  });

  it('renders with role="tablist"', () => {
    render(<Tabs items={defaultItems} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders tab buttons with role="tab"', () => {
    render(<Tabs items={defaultItems} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(3);
  });

  it('selects first tab by default', () => {
    render(<Tabs items={defaultItems} />);
    const firstTab = screen.getByText('Tab One').closest('button');
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content One')).toBeInTheDocument();
  });

  it('shows content of selected tab', () => {
    render(<Tabs items={defaultItems} value="tab2" />);
    expect(screen.getByText('Content Two')).toBeInTheDocument();
  });

  it('hides content of non-selected tabs', () => {
    render(<Tabs items={defaultItems} value="tab1" />);
    const panel2 = screen.getByText('Content Two').closest('[role="tabpanel"]');
    expect(panel2).toHaveAttribute('hidden');
  });

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs items={defaultItems} onChange={onChange} />);
    fireEvent.click(screen.getByText('Tab Two'));
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('sets aria-selected on the active tab', () => {
    render(<Tabs items={defaultItems} value="tab2" />);
    const tab2 = screen.getByText('Tab Two').closest('button');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    const tab1 = screen.getByText('Tab One').closest('button');
    expect(tab1).toHaveAttribute('aria-selected', 'false');
  });

  it('renders disabled tab', () => {
    render(<Tabs items={defaultItems} />);
    const disabledTab = screen.getByText('Tab Three').closest('button');
    expect(disabledTab).toBeDisabled();
  });

  it('does not call onChange for disabled tab', () => {
    const onChange = vi.fn();
    render(<Tabs items={defaultItems} onChange={onChange} />);
    const disabledTab = screen.getByText('Tab Three').closest('button')!;
    fireEvent.click(disabledTab);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('works in uncontrolled mode', () => {
    render(<Tabs items={defaultItems} />);
    expect(screen.getByText('Content One')).toBeVisible();
    fireEvent.click(screen.getByText('Tab Two'));
    expect(screen.getByText('Content Two')).toBeVisible();
  });

  it('renders tab panels with role="tabpanel"', () => {
    render(<Tabs items={defaultItems} />);
    const panels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(panels.length).toBe(3);
  });

  it('links tabs and panels with aria-controls/aria-labelledby', () => {
    render(<Tabs items={defaultItems} />);
    const tab1 = screen.getByText('Tab One').closest('button');
    expect(tab1).toHaveAttribute('aria-controls', 'tabpanel-tab1');
    expect(tab1).toHaveAttribute('id', 'tab-tab1');
    const panel1 = screen.getByText('Content One').closest('[role="tabpanel"]');
    expect(panel1).toHaveAttribute('aria-labelledby', 'tab-tab1');
  });

  it('applies testID as data-testid', () => {
    render(<Tabs items={defaultItems} testID="my-tabs" />);
    expect(screen.getByTestId('my-tabs')).toBeInTheDocument();
  });

  it('forwards ref to the container div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Tabs ref={ref} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
