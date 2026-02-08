import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('renders children (trigger)', () => {
    render(
      <Tooltip label="Helpful tip">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show tooltip content by default', () => {
    render(
      <Tooltip label="Helpful tip">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', () => {
    render(
      <Tooltip label="Helpful tip">
        <button>Hover me</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Helpful tip')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip label="Helpful tip">
        <button>Hover me</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', () => {
    render(
      <Tooltip label="Focus tip">
        <button>Focus me</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Focus me').parentElement!;
    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on blur', () => {
    render(
      <Tooltip label="Focus tip">
        <button>Focus me</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Focus me').parentElement!;
    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.blur(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not show tooltip when isDisabled is true', () => {
    render(
      <Tooltip label="Disabled tip" isDisabled>
        <button>Hover me</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip when defaultIsOpen is true', () => {
    render(
      <Tooltip label="Default open" defaultIsOpen>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('renders controlled open state', () => {
    render(
      <Tooltip label="Controlled" isOpen>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('sets aria-describedby on trigger when open', () => {
    render(
      <Tooltip label="Tip" defaultIsOpen>
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByText('Trigger').parentElement!;
    const tooltipId = screen.getByRole('tooltip').getAttribute('id');
    expect(trigger).toHaveAttribute('aria-describedby', tooltipId);
  });

  it('applies testID as data-testid', () => {
    render(
      <Tooltip label="Tip" testID="my-tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByTestId('my-tooltip')).toBeInTheDocument();
  });

  it('forwards ref to the wrapper div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <Tooltip ref={ref} label="Tip">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
