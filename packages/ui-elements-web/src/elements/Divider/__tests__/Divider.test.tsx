import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from '../Divider';

describe('Divider', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders as a <div> element', () => {
      render(<Divider testID="divider" />);
      expect(screen.getByTestId('divider').tagName).toBe('DIV');
    });

    it('applies testID as data-testid', () => {
      render(<Divider testID="my-divider" />);
      expect(screen.getByTestId('my-divider')).toBeInTheDocument();
    });

    it('renders with role="separator" when no label', () => {
      render(<Divider testID="sep" />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  // ===== Orientation =====
  describe('Orientation', () => {
    it('defaults to horizontal orientation', () => {
      render(<Divider testID="default" />);
      expect(screen.getByTestId('default')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('supports vertical orientation', () => {
      render(<Divider orientation="vertical" testID="vertical" />);
      expect(screen.getByTestId('vertical')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('applies horizontal spacing as margin top/bottom', () => {
      render(<Divider spacing={16} testID="h-space" />);
      const el = screen.getByTestId('h-space');
      expect(el.style.marginTop).toBe('16px');
      expect(el.style.marginBottom).toBe('16px');
    });

    it('applies vertical spacing as margin left/right', () => {
      render(<Divider orientation="vertical" spacing={8} testID="v-space" />);
      const el = screen.getByTestId('v-space');
      expect(el.style.marginLeft).toBe('8px');
      expect(el.style.marginRight).toBe('8px');
    });
  });

  // ===== Custom Color =====
  describe('Custom Color', () => {
    it('applies custom border color via inline style', () => {
      render(<Divider color="red" testID="colored" />);
      expect(screen.getByTestId('colored').style.borderColor).toBe('red');
    });

    it('does not apply borderColor when no color prop', () => {
      render(<Divider testID="no-color" />);
      expect(screen.getByTestId('no-color').style.borderColor).toBe('');
    });
  });

  // ===== Additional className =====
  describe('Additional className', () => {
    it('applies className to the element', () => {
      render(<Divider className="custom-class" testID="classed" />);
      expect(screen.getByTestId('classed').classList.contains('custom-class')).toBe(true);
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the divider element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Divider ref={ref} testID="ref-div" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
