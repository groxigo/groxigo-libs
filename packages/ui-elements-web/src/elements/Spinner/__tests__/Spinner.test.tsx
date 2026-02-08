import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders with role="status"', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders an SVG spinner element', () => {
      render(<Spinner testID="spinner" />);
      const el = screen.getByTestId('spinner');
      const svg = el.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies testID as data-testid', () => {
      render(<Spinner testID="my-spinner" />);
      expect(screen.getByTestId('my-spinner')).toBeInTheDocument();
    });
  });

  // ===== Accessibility =====
  describe('Accessibility', () => {
    it('has default aria-label "Loading..."', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...');
    });

    it('uses custom label for aria-label', () => {
      render(<Spinner label="Please wait" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Please wait');
    });

    it('renders screen reader text with label', () => {
      render(<Spinner label="Processing" />);
      expect(screen.getByText('Processing')).toBeInTheDocument();
    });

    it('renders default screen reader text "Loading..."', () => {
      render(<Spinner />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  // ===== Size Variants =====
  describe('Size Variants', () => {
    it('renders with each size without error', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      sizes.forEach((size) => {
        const { unmount } = render(<Spinner size={size} testID={`spinner-${size}`} />);
        expect(screen.getByTestId(`spinner-${size}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ===== Custom Color =====
  describe('Custom Color', () => {
    it('applies custom color via inline style on SVG', () => {
      render(<Spinner color="red" testID="colored" />);
      const svg = screen.getByTestId('colored').querySelector('svg');
      expect(svg?.style.color).toBe('red');
    });

    it('does not apply inline color style when no color prop', () => {
      render(<Spinner testID="no-color" />);
      const svg = screen.getByTestId('no-color').querySelector('svg');
      expect(svg?.style.color).toBe('');
    });
  });

  // ===== Additional className =====
  describe('Additional className', () => {
    it('applies className to the wrapper', () => {
      render(<Spinner className="extra" testID="classed" />);
      expect(screen.getByTestId('classed').classList.contains('extra')).toBe(true);
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the wrapper div', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
