import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Link } from '../Link';

describe('Link', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders as an <a> element', () => {
      render(<Link href="/home" testID="link">Home</Link>);
      const el = screen.getByTestId('link');
      expect(el.tagName).toBe('A');
    });

    it('renders children text content', () => {
      render(<Link href="/about">About us</Link>);
      expect(screen.getByText('About us')).toBeInTheDocument();
    });

    it('applies href attribute', () => {
      render(<Link href="/products" testID="link">Products</Link>);
      expect(screen.getByTestId('link')).toHaveAttribute('href', '/products');
    });

    it('applies testID as data-testid', () => {
      render(<Link href="/" testID="my-link">Link</Link>);
      expect(screen.getByTestId('my-link')).toBeInTheDocument();
    });
  });

  // ===== Props / Variants =====
  describe('Props and Variants', () => {
    it('applies explicit target attribute', () => {
      render(<Link href="/page" target="_blank" testID="link">External</Link>);
      expect(screen.getByTestId('link')).toHaveAttribute('target', '_blank');
    });

    it('applies explicit rel attribute', () => {
      render(<Link href="/page" rel="nofollow" testID="link">NoFollow</Link>);
      expect(screen.getByTestId('link')).toHaveAttribute('rel', 'nofollow');
    });

    it('auto-sets target and rel for external links when isExternal is true', () => {
      render(<Link href="https://example.com" isExternal testID="ext-link">External</Link>);
      const el = screen.getByTestId('ext-link');
      expect(el).toHaveAttribute('target', '_blank');
      expect(el).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders external indicator icon when isExternal', () => {
      render(<Link href="https://example.com" isExternal testID="ext">External</Link>);
      const el = screen.getByTestId('ext');
      // The external icon arrow character should be present
      expect(el.textContent).toContain('\u2197');
    });

    it('does not render external icon for internal links', () => {
      render(<Link href="/internal" testID="int">Internal</Link>);
      const el = screen.getByTestId('int');
      expect(el.textContent).not.toContain('\u2197');
    });

    it('applies additional className', () => {
      render(<Link href="/" className="custom" testID="link">Styled</Link>);
      expect(screen.getByTestId('link').classList.contains('custom')).toBe(true);
    });
  });

  // ===== Disabled State =====
  describe('Disabled State', () => {
    it('removes href when disabled', () => {
      render(<Link href="/page" disabled testID="disabled-link">Disabled</Link>);
      expect(screen.getByTestId('disabled-link')).not.toHaveAttribute('href');
    });

    it('sets aria-disabled when disabled', () => {
      render(<Link href="/page" disabled testID="aria-link">Disabled</Link>);
      expect(screen.getByTestId('aria-link')).toHaveAttribute('aria-disabled', 'true');
    });

    it('prevents onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Link href="/page" disabled onClick={handleClick}>Disabled</Link>);
      fireEvent.click(screen.getByText('Disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('prevents onPress when disabled', () => {
      const handlePress = vi.fn();
      render(<Link href="/page" disabled onPress={handlePress}>Disabled</Link>);
      fireEvent.click(screen.getByText('Disabled'));
      expect(handlePress).not.toHaveBeenCalled();
    });
  });

  // ===== Event Handlers =====
  describe('Event Handlers', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Link href="/page" onClick={handleClick}>Click</Link>);
      fireEvent.click(screen.getByText('Click'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when clicked', () => {
      const handlePress = vi.fn();
      render(<Link href="/page" onPress={handlePress}>Press</Link>);
      fireEvent.click(screen.getByText('Press'));
      expect(handlePress).toHaveBeenCalledTimes(1);
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the anchor element', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(<Link ref={ref} href="/page">Ref link</Link>);
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.tagName).toBe('A');
    });
  });
});
