import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(
      <RadioGroup value="a" name="group">
        <Radio value="a" testID="radio-a" />
      </RadioGroup>
    );
    const wrapper = screen.getByTestId('radio-a');
    const input = wrapper.querySelector('input[type="radio"]');
    expect(input).toBeInTheDocument();
  });

  it('renders as checked when group value matches', () => {
    render(
      <RadioGroup value="b" name="group">
        <Radio value="a" testID="radio-a" />
        <Radio value="b" testID="radio-b" />
      </RadioGroup>
    );
    const inputA = screen.getByTestId('radio-a').querySelector('input[type="radio"]') as HTMLInputElement;
    const inputB = screen.getByTestId('radio-b').querySelector('input[type="radio"]') as HTMLInputElement;
    expect(inputA.checked).toBe(false);
    expect(inputB.checked).toBe(true);
  });

  it('calls onChange on the group when radio is selected', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup value="a" name="group" onChange={onChange}>
        <Radio value="a" testID="radio-a" />
        <Radio value="b" testID="radio-b" />
      </RadioGroup>
    );
    const inputB = screen.getByTestId('radio-b').querySelector('input[type="radio"]') as HTMLInputElement;
    fireEvent.click(inputB);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('renders disabled radio', () => {
    render(
      <RadioGroup value="a" name="group">
        <Radio value="a" disabled testID="radio-a" />
      </RadioGroup>
    );
    const input = screen.getByTestId('radio-a').querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders label text', () => {
    render(
      <RadioGroup value="a" name="group">
        <Radio value="a" label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(
      <RadioGroup value="a" name="group">
        <Radio value="a" label="A" helperText="Choose this option" />
      </RadioGroup>
    );
    expect(screen.getByText('Choose this option')).toBeInTheDocument();
  });

  it('applies name attribute from group context', () => {
    render(
      <RadioGroup value="a" name="my-group">
        <Radio value="a" testID="radio-a" />
      </RadioGroup>
    );
    const input = screen.getByTestId('radio-a').querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input).toHaveAttribute('name', 'my-group');
  });

  it('applies testID as data-testid', () => {
    render(
      <RadioGroup value="a" name="group">
        <Radio value="a" testID="my-radio" />
      </RadioGroup>
    );
    expect(screen.getByTestId('my-radio')).toBeInTheDocument();
  });

  it('inherits disabled state from group', () => {
    render(
      <RadioGroup value="a" name="group" disabled>
        <Radio value="a" testID="radio-a" />
      </RadioGroup>
    );
    const input = screen.getByTestId('radio-a').querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders RadioGroup with role="radiogroup"', () => {
    render(
      <RadioGroup value="a" name="group">
        <Radio value="a" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('forwards ref to the input element', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>;
    render(
      <RadioGroup value="a" name="group">
        <Radio ref={ref} value="a" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
