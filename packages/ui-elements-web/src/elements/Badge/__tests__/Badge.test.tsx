import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../Badge';

describe('Badge', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders children text content', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders as a <span> element', () => {
      render(<Badge testID="badge">Badge</Badge>);
      expect(screen.getByTestId('badge').tagName).toBe('SPAN');
    });

    it('applies testID as data-testid', () => {
      render(<Badge testID="my-badge">Test</Badge>);
      expect(screen.getByTestId('my-badge')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(<Badge className="custom" testID="classed">Badge</Badge>);
      expect(screen.getByTestId('classed').classList.contains('custom')).toBe(true);
    });
  });

  // ===== Icons =====
  describe('Icons', () => {
    it('renders leftIcon before children', () => {
      render(
        <Badge leftIcon={<span data-testid="left">L</span>} testID="icon-badge">
          Label
        </Badge>
      );
      const badge = screen.getByTestId('icon-badge');
      const leftIcon = screen.getByTestId('left');
      expect(badge).toContainElement(leftIcon);
      // Verify order: leftIcon comes before text
      const children = Array.from(badge.childNodes);
      const iconIdx = children.indexOf(leftIcon);
      const textNode = children.find(n => n.textContent === 'Label');
      expect(iconIdx).toBeLessThan(children.indexOf(textNode as ChildNode));
    });

    it('renders rightIcon after children', () => {
      render(
        <Badge rightIcon={<span data-testid="right">R</span>} testID="right-badge">
          Label
        </Badge>
      );
      const badge = screen.getByTestId('right-badge');
      const rightIcon = screen.getByTestId('right');
      expect(badge).toContainElement(rightIcon);
    });

    it('renders both leftIcon and rightIcon', () => {
      render(
        <Badge
          leftIcon={<span data-testid="left">L</span>}
          rightIcon={<span data-testid="right">R</span>}
        >
          Label
        </Badge>
      );
      expect(screen.getByTestId('left')).toBeInTheDocument();
      expect(screen.getByTestId('right')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });
  });

  // ===== Variants =====
  describe('Variants', () => {
    it('renders with default variant (subtle) and colorScheme (neutral)', () => {
      render(<Badge testID="default-badge">Default</Badge>);
      // Just verify it renders without errors
      expect(screen.getByTestId('default-badge')).toBeInTheDocument();
    });

    it('renders with solid variant', () => {
      render(<Badge variant="solid" colorScheme="primary" testID="solid">Solid</Badge>);
      expect(screen.getByTestId('solid')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Badge variant="outline" colorScheme="error" testID="outline">Outline</Badge>);
      expect(screen.getByTestId('outline')).toBeInTheDocument();
    });

    it('renders with subtle variant', () => {
      render(<Badge variant="subtle" colorScheme="success" testID="subtle">Subtle</Badge>);
      expect(screen.getByTestId('subtle')).toBeInTheDocument();
    });

    it('renders with soft variant', () => {
      render(<Badge variant="soft" colorScheme="warning" testID="soft">Soft</Badge>);
      expect(screen.getByTestId('soft')).toBeInTheDocument();
    });

    it('renders with different colorSchemes without error', () => {
      const schemes = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const;
      schemes.forEach((scheme) => {
        const { unmount } = render(
          <Badge colorScheme={scheme} testID={`badge-${scheme}`}>{scheme}</Badge>
        );
        expect(screen.getByTestId(`badge-${scheme}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ===== Size =====
  describe('Size', () => {
    it('renders with each size without error', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const;
      sizes.forEach((size) => {
        const { unmount } = render(
          <Badge size={size} testID={`badge-${size}`}>{size}</Badge>
        );
        expect(screen.getByTestId(`badge-${size}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ===== Rounded =====
  describe('Rounded', () => {
    it('renders with rounded=false by default', () => {
      render(<Badge testID="not-rounded">Default</Badge>);
      expect(screen.getByTestId('not-rounded')).toBeInTheDocument();
    });

    it('renders with rounded=true', () => {
      render(<Badge rounded testID="rounded">Rounded</Badge>);
      expect(screen.getByTestId('rounded')).toBeInTheDocument();
    });
  });

  // ===== Pass-through Props =====
  describe('Pass-through Props', () => {
    it('passes through additional HTML attributes', () => {
      render(<Badge testID="extra" id="badge-id" title="My badge">Extra</Badge>);
      const el = screen.getByTestId('extra');
      expect(el).toHaveAttribute('id', 'badge-id');
      expect(el).toHaveAttribute('title', 'My badge');
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the span element', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Ref badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.tagName).toBe('SPAN');
    });
  });
});
