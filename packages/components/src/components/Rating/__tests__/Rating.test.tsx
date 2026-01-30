/**
 * Rating Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Rating } from '../Rating';
import type { RatingProps } from '../Rating.types';

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
        warning: '#FF9500',
        border: '#E0E0E0',
        textSecondary: '#666666',
      },
      spacing: {
        1: 4,
        2: 8,
      },
    }),
    Text: ({ children, variant, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
    Icon: ({ name, size, style, ...props }: any) => (
      <RN.View testID={`icon-${name}`} accessibilityLabel={name} {...props} style={style} />
    ),
  };
});

describe('Rating', () => {
  const defaultProps: RatingProps = {
    value: 3,
  };

  describe('Basic Rendering', () => {
    it('renders correct number of stars by default (5)', () => {
      const { getAllByTestId } = render(<Rating {...defaultProps} />);
      const filledStars = getAllByTestId('icon-star-fill');
      const emptyStars = getAllByTestId('icon-star');
      expect(filledStars.length + emptyStars.length).toBe(5);
    });

    it('renders correct number of filled stars based on value', () => {
      const { getAllByTestId } = render(<Rating value={3} />);
      expect(getAllByTestId('icon-star-fill')).toHaveLength(3);
    });

    it('renders correct number of empty stars', () => {
      const { getAllByTestId } = render(<Rating value={2} />);
      expect(getAllByTestId('icon-star')).toHaveLength(3);
    });

    it('renders all filled stars when value equals max', () => {
      const { getAllByTestId, queryAllByTestId } = render(<Rating value={5} />);
      expect(getAllByTestId('icon-star-fill')).toHaveLength(5);
      expect(queryAllByTestId('icon-star')).toHaveLength(0);
    });

    it('renders all empty stars when value is 0', () => {
      const { getAllByTestId, queryAllByTestId } = render(<Rating value={0} />);
      expect(getAllByTestId('icon-star')).toHaveLength(5);
      expect(queryAllByTestId('icon-star-fill')).toHaveLength(0);
    });
  });

  describe('Custom Max Value', () => {
    it('renders custom number of stars based on max prop', () => {
      const { getAllByTestId } = render(<Rating value={3} max={10} />);
      const filledStars = getAllByTestId('icon-star-fill');
      const emptyStars = getAllByTestId('icon-star');
      expect(filledStars.length + emptyStars.length).toBe(10);
    });

    it('respects max prop for filled stars', () => {
      const { getAllByTestId } = render(<Rating value={7} max={10} />);
      expect(getAllByTestId('icon-star-fill')).toHaveLength(7);
    });
  });

  describe('Show Value', () => {
    it('shows value text when showValue is true', () => {
      const { getByText } = render(<Rating value={4.5} showValue={true} />);
      expect(getByText('4.5')).toBeTruthy();
    });

    it('formats value with one decimal place', () => {
      const { getByText } = render(<Rating value={3} showValue={true} />);
      expect(getByText('3.0')).toBeTruthy();
    });

    it('does not show value by default', () => {
      const { queryByText } = render(<Rating value={4} />);
      expect(queryByText('4.0')).toBeNull();
    });
  });

  describe('Read-only Mode (default)', () => {
    it('does not call onChange when star is pressed in read-only mode', () => {
      const onChange = vi.fn();
      const { getAllByLabelText } = render(
        <Rating value={3} onChange={onChange} />
      );
      const stars = getAllByLabelText(/star/);
      fireEvent.click(stars[0]);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('is not editable by default', () => {
      const onChange = vi.fn();
      const { getAllByLabelText } = render(
        <Rating value={2} onChange={onChange} />
      );
      const stars = getAllByLabelText(/star/);
      fireEvent.click(stars[4]); // Try to press 5th star
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Editable Mode', () => {
    it('calls onChange when star is pressed in editable mode', () => {
      const onChange = vi.fn();
      const { getAllByLabelText } = render(
        <Rating value={3} editable={true} onChange={onChange} />
      );
      const stars = getAllByLabelText(/star/);
      fireEvent.click(stars[4]); // Press 5th star
      expect(onChange).toHaveBeenCalledWith(5);
    });

    it('calls onChange with correct value for first star', () => {
      const onChange = vi.fn();
      const { getAllByLabelText } = render(
        <Rating value={3} editable={true} onChange={onChange} />
      );
      const stars = getAllByLabelText(/star/);
      fireEvent.click(stars[0]); // Press 1st star
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it('calls onChange with correct value for middle star', () => {
      const onChange = vi.fn();
      const { getAllByLabelText } = render(
        <Rating value={1} editable={true} onChange={onChange} />
      );
      const stars = getAllByLabelText(/star/);
      fireEvent.click(stars[2]); // Press 3rd star
      expect(onChange).toHaveBeenCalledWith(3);
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      const { container } = render(<Rating value={3} size="sm" />);
      expect(container).toBeTruthy();
    });

    it('renders with medium size (default)', () => {
      const { container } = render(<Rating value={3} size="md" />);
      expect(container).toBeTruthy();
    });

    it('renders with large size', () => {
      const { container } = render(<Rating value={3} size="lg" />);
      expect(container).toBeTruthy();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('updates display when value prop changes', () => {
      const { getAllByTestId, rerender } = render(<Rating value={2} />);
      expect(getAllByTestId('icon-star-fill')).toHaveLength(2);

      rerender(<Rating value={4} />);
      expect(getAllByTestId('icon-star-fill')).toHaveLength(4);
    });
  });

  describe('Edge Cases', () => {
    it('handles value of 0', () => {
      const { getAllByTestId, queryAllByTestId } = render(<Rating value={0} />);
      expect(queryAllByTestId('icon-star-fill')).toHaveLength(0);
      expect(getAllByTestId('icon-star')).toHaveLength(5);
    });

    it('handles fractional values', () => {
      const { getAllByTestId } = render(<Rating value={3.7} />);
      // Component uses index < displayValue, so 3.7 fills indices 0,1,2,3 (4 stars)
      expect(getAllByTestId('icon-star-fill')).toHaveLength(4);
    });

    it('handles max value of 1', () => {
      const { getAllByTestId } = render(<Rating value={1} max={1} />);
      expect(getAllByTestId('icon-star-fill')).toHaveLength(1);
    });
  });
});
