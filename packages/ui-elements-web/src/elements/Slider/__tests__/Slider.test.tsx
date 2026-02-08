import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from '../Slider';

describe('Slider', () => {
  it('renders a slider with role="slider"', () => {
    render(<Slider testID="sl" />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<Slider min={10} max={200} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '200');
  });

  it('sets aria-valuenow from controlled value', () => {
    render(<Slider value={50} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('uses defaultValue in uncontrolled mode', () => {
    render(<Slider defaultValue={30} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
  });

  it('responds to ArrowRight key to increase value', () => {
    const onChange = vi.fn();
    render(<Slider value={50} min={0} max={100} step={1} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('responds to ArrowLeft key to decrease value', () => {
    const onChange = vi.fn();
    render(<Slider value={50} min={0} max={100} step={1} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('clamps value at min with Home key', () => {
    const onChange = vi.fn();
    render(<Slider value={50} min={0} max={100} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('clamps value at max with End key', () => {
    const onChange = vi.fn();
    render(<Slider value={50} min={0} max={100} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('does not respond to keyboard when disabled', () => {
    const onChange = vi.fn();
    render(<Slider value={50} disabled onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Slider disabled />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders label text', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders value display when showValue is true', () => {
    render(<Slider value={75} showValue />);
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('formats value with formatValue function', () => {
    render(<Slider value={75} showValue formatValue={(v) => `${v}%`} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('sets aria-label from label or aria-label prop', () => {
    render(<Slider aria-label="Brightness" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-label', 'Brightness');
  });

  it('applies testID as data-testid', () => {
    render(<Slider testID="my-slider" />);
    expect(screen.getByTestId('my-slider')).toBeInTheDocument();
  });

  it('forwards ref to the container div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Slider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
