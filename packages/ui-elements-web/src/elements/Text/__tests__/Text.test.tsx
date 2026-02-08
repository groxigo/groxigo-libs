import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from '../Text';

describe('Text', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders children text content', () => {
      render(<Text>Hello world</Text>);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('renders as <p> by default (body variant)', () => {
      render(<Text testID="text">Body text</Text>);
      const el = screen.getByTestId('text');
      expect(el.tagName).toBe('P');
    });

    it('renders as <h1> for h1 variant', () => {
      render(<Text variant="h1" testID="heading">Heading</Text>);
      const el = screen.getByTestId('heading');
      expect(el.tagName).toBe('H1');
    });

    it('renders as <h2> for h2 variant', () => {
      render(<Text variant="h2" testID="heading2">Heading 2</Text>);
      expect(screen.getByTestId('heading2').tagName).toBe('H2');
    });

    it('renders as <h3> for h3 variant', () => {
      render(<Text variant="h3" testID="heading3">Heading 3</Text>);
      expect(screen.getByTestId('heading3').tagName).toBe('H3');
    });

    it('renders as <span> for caption variant', () => {
      render(<Text variant="caption" testID="caption">Caption text</Text>);
      expect(screen.getByTestId('caption').tagName).toBe('SPAN');
    });

    it('renders as <label> for label variant', () => {
      render(<Text variant="label" testID="label">Label text</Text>);
      expect(screen.getByTestId('label').tagName).toBe('LABEL');
    });

    it('renders as <span> for overline variant', () => {
      render(<Text variant="overline" testID="overline">Overline</Text>);
      expect(screen.getByTestId('overline').tagName).toBe('SPAN');
    });
  });

  // ===== Props / Variants =====
  describe('Props and Variants', () => {
    it('applies custom color via inline style', () => {
      render(<Text color="#ff0000" testID="colored">Red text</Text>);
      const el = screen.getByTestId('colored');
      expect(el.style.color).toBe('rgb(255, 0, 0)');
    });

    it('does not apply inline style when no custom color', () => {
      render(<Text testID="no-color">Normal</Text>);
      const el = screen.getByTestId('no-color');
      expect(el.style.color).toBe('');
    });

    it('applies testID as data-testid', () => {
      render(<Text testID="my-text">Test</Text>);
      expect(screen.getByTestId('my-text')).toBeInTheDocument();
    });

    it('overrides element with as prop', () => {
      render(<Text as="div" testID="as-div">Div text</Text>);
      expect(screen.getByTestId('as-div').tagName).toBe('DIV');
    });

    it('as prop takes precedence over variant element mapping', () => {
      render(<Text variant="h1" as="span" testID="override">Override</Text>);
      expect(screen.getByTestId('override').tagName).toBe('SPAN');
    });

    it('applies additional className', () => {
      render(<Text className="extra-class" testID="classed">Classed</Text>);
      const el = screen.getByTestId('classed');
      expect(el.classList.contains('extra-class')).toBe(true);
    });

    it('passes through additional HTML attributes', () => {
      render(<Text testID="extra" id="custom-id">Extra</Text>);
      const el = screen.getByTestId('extra');
      expect(el.getAttribute('id')).toBe('custom-id');
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the rendered element', () => {
      const ref = createRef<HTMLElement>();
      render(<Text ref={ref} testID="ref-text">Ref text</Text>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('P');
    });

    it('forwards ref to overridden element via as prop', () => {
      const ref = createRef<HTMLElement>();
      render(<Text ref={ref} as="h1" testID="ref-h1">Heading ref</Text>);
      expect(ref.current?.tagName).toBe('H1');
    });
  });
});
