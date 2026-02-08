import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from '../Progress';

describe('Progress', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders a progressbar role', () => {
      render(<Progress />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('applies testID as data-testid on wrapper', () => {
      render(<Progress testID="progress" />);
      expect(screen.getByTestId('progress')).toBeInTheDocument();
    });

    it('renders the progressbar inside the wrapper', () => {
      render(<Progress testID="wrapper" />);
      const wrapper = screen.getByTestId('wrapper');
      const progressbar = screen.getByRole('progressbar');
      expect(wrapper).toContainElement(progressbar);
    });
  });

  // ===== Value and ARIA =====
  describe('Value and ARIA', () => {
    it('sets aria-valuenow to normalized percentage', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    });

    it('sets aria-valuemin to min prop', () => {
      render(<Progress min={10} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '10');
    });

    it('sets aria-valuemax to max prop', () => {
      render(<Progress max={200} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200');
    });

    it('normalizes value to percentage correctly', () => {
      // value=30, min=0, max=100 => 30%
      render(<Progress value={30} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '30');
    });

    it('normalizes value with custom min/max', () => {
      // value=50, min=0, max=200 => 25%
      render(<Progress value={50} min={0} max={200} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25');
    });

    it('clamps value to min when below', () => {
      // value=-10, min=0, max=100 => clamped to 0 => 0%
      render(<Progress value={-10} min={0} max={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('clamps value to max when above', () => {
      // value=150, min=0, max=100 => clamped to 100 => 100%
      render(<Progress value={150} min={0} max={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    it('has default aria-label with progress percentage', () => {
      render(<Progress value={75} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress: 75%');
    });

    it('uses custom aria-label when provided', () => {
      render(<Progress value={50} aria-label="Upload progress" />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload progress');
    });
  });

  // ===== Indeterminate =====
  describe('Indeterminate Variant', () => {
    it('does not set aria-valuenow when indeterminate', () => {
      render(<Progress variant="indeterminate" />);
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
    });

    it('has aria-label indicating loading when indeterminate', () => {
      render(<Progress variant="indeterminate" />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress: loading');
    });
  });

  // ===== Show Value =====
  describe('Show Value', () => {
    it('does not show value text by default', () => {
      render(<Progress value={50} testID="no-val" />);
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('shows value text when showValue is true', () => {
      render(<Progress value={50} showValue testID="show-val" />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('uses formatValue function when provided', () => {
      render(
        <Progress
          value={75}
          max={100}
          showValue
          formatValue={(val, max) => `${val} of ${max}`}
        />
      );
      expect(screen.getByText('75 of 100')).toBeInTheDocument();
    });
  });

  // ===== Size Variants =====
  describe('Size Variants', () => {
    it('renders with each size without error', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const;
      sizes.forEach((size) => {
        const { unmount } = render(<Progress size={size} testID={`progress-${size}`} />);
        expect(screen.getByTestId(`progress-${size}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the wrapper div', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Progress ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
