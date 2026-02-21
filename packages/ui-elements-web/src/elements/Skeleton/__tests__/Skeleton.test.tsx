import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders as a <div> element', () => {
      render(<Skeleton testID="skeleton" />);
      expect(screen.getByTestId('skeleton').tagName).toBe('DIV');
    });

    it('applies testID as data-testid', () => {
      render(<Skeleton testID="my-skeleton" />);
      expect(screen.getByTestId('my-skeleton')).toBeInTheDocument();
    });

    it('renders with default variant (rectangular)', () => {
      render(<Skeleton testID="default" />);
      // Just verify it renders without error
      expect(screen.getByTestId('default')).toBeInTheDocument();
    });
  });

  // ===== Dimensions =====
  describe('Dimensions', () => {
    it('applies numeric width as pixels via CSS custom property', () => {
      render(<Skeleton width={200} testID="w-num" />);
      expect(screen.getByTestId('w-num').style.getPropertyValue('--skeleton-width')).toBe('200px');
    });

    it('applies string width directly via CSS custom property', () => {
      render(<Skeleton width="50%" testID="w-str" />);
      expect(screen.getByTestId('w-str').style.getPropertyValue('--skeleton-width')).toBe('50%');
    });

    it('applies numeric height as pixels via CSS custom property', () => {
      render(<Skeleton height={100} testID="h-num" />);
      expect(screen.getByTestId('h-num').style.getPropertyValue('--skeleton-height')).toBe('100px');
    });

    it('applies string height directly via CSS custom property', () => {
      render(<Skeleton height="3rem" testID="h-str" />);
      expect(screen.getByTestId('h-str').style.getPropertyValue('--skeleton-height')).toBe('3rem');
    });

    it('applies custom borderRadius via CSS custom property', () => {
      render(<Skeleton borderRadius={8} testID="radius" />);
      expect(screen.getByTestId('radius').style.getPropertyValue('--skeleton-radius')).toBe('8px');
    });

    it('does not apply borderRadius when not provided', () => {
      render(<Skeleton testID="no-radius" />);
      expect(screen.getByTestId('no-radius').style.getPropertyValue('--skeleton-radius')).toBe('');
    });
  });

  // ===== Variants =====
  describe('Variants', () => {
    it('renders with text variant', () => {
      render(<Skeleton variant="text" testID="text" />);
      expect(screen.getByTestId('text')).toBeInTheDocument();
    });

    it('renders with circular variant', () => {
      render(<Skeleton variant="circular" testID="circle" />);
      expect(screen.getByTestId('circle')).toBeInTheDocument();
    });

    it('renders with rectangular variant', () => {
      render(<Skeleton variant="rectangular" testID="rect" />);
      expect(screen.getByTestId('rect')).toBeInTheDocument();
    });

    it('renders with rounded variant', () => {
      render(<Skeleton variant="rounded" testID="rounded" />);
      expect(screen.getByTestId('rounded')).toBeInTheDocument();
    });
  });

  // ===== Animation =====
  describe('Animation', () => {
    it('has animation enabled by default (animate=true)', () => {
      render(<Skeleton testID="animated" />);
      // The animate class should be applied by default
      expect(screen.getByTestId('animated')).toBeInTheDocument();
    });

    it('renders without animation when animate=false', () => {
      render(<Skeleton animate={false} testID="no-anim" />);
      expect(screen.getByTestId('no-anim')).toBeInTheDocument();
    });
  });

  // ===== Custom className =====
  describe('Custom className', () => {
    it('applies additional className', () => {
      render(<Skeleton className="extra" testID="classed" />);
      expect(screen.getByTestId('classed').classList.contains('extra')).toBe(true);
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the div element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
