/**
 * QuantitySelector Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { QuantitySelector } from '../QuantitySelector';
import type { QuantitySelectorProps } from '../QuantitySelector.types';

// Mock react-native
vi.mock('react-native', async () => {
  const RN = await vi.importActual('react-native-web');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: vi.fn((options: any) => options.ios || options.default),
    },
  };
});

// Mock ui-elements
vi.mock('@groxigo/ui-elements', async () => {
  const React = await import('react');
  const RN = await import('react-native');

  return {
    useTheme: () => ({
      colors: {
        primary: '#007AFF',
        textInverse: '#FFFFFF',
      },
      spacing: {
        1: 4,
        2: 8,
        3: 12,
      },
      radius: {
        md: 8,
      },
    }),
    Text: ({ children, variant, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
  };
});

describe('QuantitySelector', () => {
  const defaultProps: QuantitySelectorProps = {
    value: 1,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with default value', () => {
      const { getByText } = render(<QuantitySelector {...defaultProps} />);
      expect(getByText('1')).toBeTruthy();
    });

    it('renders increment and decrement buttons', () => {
      const { getByText } = render(<QuantitySelector {...defaultProps} />);
      expect(getByText('+')).toBeTruthy();
      expect(getByText('-')).toBeTruthy();
    });

    it('displays provided value', () => {
      const { getByText } = render(<QuantitySelector {...defaultProps} value={5} />);
      expect(getByText('5')).toBeTruthy();
    });
  });

  describe('Increment', () => {
    it('calls onChange with incremented value', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={3} onChange={onChange} />
      );
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('respects step value when incrementing', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={2} onChange={onChange} step={2} />
      );
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('does not exceed max value', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={5} onChange={onChange} max={5} />
      );
      fireEvent.click(getByText('+'));
      // Button is disabled at max, so onChange should not be called
      expect(onChange).not.toHaveBeenCalled();
    });

    it('increments to max when close to max', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={4} onChange={onChange} max={5} />
      );
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(5);
    });
  });

  describe('Decrement', () => {
    it('calls onChange with decremented value', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={3} onChange={onChange} />
      );
      fireEvent.click(getByText('-'));
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('respects step value when decrementing', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={4} onChange={onChange} step={2} />
      );
      fireEvent.click(getByText('-'));
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('does not go below 0', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={0} onChange={onChange} />
      );
      fireEvent.click(getByText('-'));
      // Button is disabled at 0, so onChange should not be called
      expect(onChange).not.toHaveBeenCalled();
    });

    it('decrements to 0 when value is 1', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={1} onChange={onChange} />
      );
      fireEvent.click(getByText('-'));
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Min/Max Bounds', () => {
    it('disables decrement at minimum value (0)', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={0} onChange={onChange} />
      );
      fireEvent.click(getByText('-'));
      // Button is disabled at 0, so onChange should not be called
      expect(onChange).not.toHaveBeenCalled();
    });

    it('disables increment at maximum value', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={10} onChange={onChange} max={10} />
      );
      fireEvent.click(getByText('+'));
      // Button is disabled at max, so onChange should not be called
      expect(onChange).not.toHaveBeenCalled();
    });

    it('allows unlimited increment when no max is set', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={100} onChange={onChange} />
      );
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(101);
    });
  });

  describe('Disabled State', () => {
    it('does not call onChange when disabled', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={3} onChange={onChange} disabled={true} />
      );
      fireEvent.click(getByText('+'));
      fireEvent.click(getByText('-'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('still displays value when disabled', () => {
      const { getByText } = render(
        <QuantitySelector value={5} onChange={vi.fn()} disabled={true} />
      );
      expect(getByText('5')).toBeTruthy();
    });
  });

  describe('Controlled Mode', () => {
    it('uses external value when provided', () => {
      const { getByText, rerender } = render(
        <QuantitySelector value={3} onChange={vi.fn()} />
      );
      expect(getByText('3')).toBeTruthy();

      rerender(<QuantitySelector value={7} onChange={vi.fn()} />);
      expect(getByText('7')).toBeTruthy();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('works without value prop', () => {
      const onChange = vi.fn();
      const { getByText } = render(<QuantitySelector onChange={onChange} />);
      // Default value should be 1
      expect(getByText('1')).toBeTruthy();
    });

    it('updates internal state on increment', () => {
      const onChange = vi.fn();
      const { getByText } = render(<QuantitySelector onChange={onChange} />);
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  describe('Step Behavior', () => {
    it('uses default step of 1', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={1} onChange={onChange} />
      );
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('supports custom step values', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={5} onChange={onChange} step={5} />
      );
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(10);
    });

    it('handles step with max constraint', () => {
      const onChange = vi.fn();
      const { getByText } = render(
        <QuantitySelector value={8} onChange={onChange} step={5} max={10} />
      );
      fireEvent.click(getByText('+'));
      expect(onChange).toHaveBeenCalledWith(10);
    });
  });
});
