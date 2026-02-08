import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card, CardHeader, CardBody, CardFooter } from '../Card';

describe('Card', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders children content', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders as a <div> element', () => {
      render(<Card testID="card">Content</Card>);
      expect(screen.getByTestId('card').tagName).toBe('DIV');
    });

    it('applies testID as data-testid', () => {
      render(<Card testID="my-card">Content</Card>);
      expect(screen.getByTestId('my-card')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(<Card className="extra" testID="card">Content</Card>);
      expect(screen.getByTestId('card').classList.contains('extra')).toBe(true);
    });

    it('applies inline style', () => {
      render(<Card style={{ backgroundColor: 'red' }} testID="styled-card">Content</Card>);
      expect(screen.getByTestId('styled-card').style.backgroundColor).toBe('red');
    });
  });

  // ===== Pressable Behavior =====
  describe('Pressable Behavior', () => {
    it('sets role="button" when pressable', () => {
      render(<Card pressable onPress={() => {}}>Pressable</Card>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('does not set role when not pressable', () => {
      render(<Card testID="static-card">Static</Card>);
      expect(screen.getByTestId('static-card')).not.toHaveAttribute('role');
    });

    it('sets tabIndex=0 when pressable', () => {
      render(<Card pressable onPress={() => {}} testID="tab-card">Pressable</Card>);
      expect(screen.getByTestId('tab-card')).toHaveAttribute('tabindex', '0');
    });

    it('does not set tabIndex when not pressable', () => {
      render(<Card testID="no-tab">Static</Card>);
      expect(screen.getByTestId('no-tab')).not.toHaveAttribute('tabindex');
    });

    it('calls onPress when clicked and pressable', () => {
      const handlePress = vi.fn();
      render(<Card pressable onPress={handlePress}>Click me</Card>);
      fireEvent.click(screen.getByRole('button'));
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when clicked and not pressable', () => {
      const handlePress = vi.fn();
      render(<Card onPress={handlePress} testID="no-press">No press</Card>);
      fireEvent.click(screen.getByTestId('no-press'));
      expect(handlePress).not.toHaveBeenCalled();
    });

    it('calls onPress on Enter key when pressable', () => {
      const handlePress = vi.fn();
      render(<Card pressable onPress={handlePress}>Keyboard</Card>);
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('calls onPress on Space key when pressable', () => {
      const handlePress = vi.fn();
      render(<Card pressable onPress={handlePress}>Keyboard</Card>);
      fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('sets aria-label when pressable', () => {
      render(
        <Card pressable onPress={() => {}} aria-label="Open details">
          Details
        </Card>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Open details');
    });
  });

  // ===== Sub-components =====
  describe('Sub-components', () => {
    it('renders CardHeader', () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      );
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('renders CardBody', () => {
      render(
        <Card>
          <CardBody>Body content</CardBody>
        </Card>
      );
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('renders CardFooter', () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('renders all sub-components together', () => {
      render(
        <Card testID="full-card">
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      const card = screen.getByTestId('full-card');
      expect(card).toContainElement(screen.getByText('Header'));
      expect(card).toContainElement(screen.getByText('Body'));
      expect(card).toContainElement(screen.getByText('Footer'));
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the Card div element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Ref card</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to CardHeader', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardHeader ref={ref}>Header</CardHeader>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to CardBody', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardBody ref={ref}>Body</CardBody>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to CardFooter', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardFooter ref={ref}>Footer</CardFooter>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
