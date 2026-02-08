import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders as a <button> element', () => {
      render(<Button testID="btn">Submit</Button>);
      const el = screen.getByTestId('btn');
      expect(el.tagName).toBe('BUTTON');
    });

    it('applies testID as data-testid', () => {
      render(<Button testID="test-btn">Test</Button>);
      expect(screen.getByTestId('test-btn')).toBeInTheDocument();
    });

    it('defaults to type="button"', () => {
      render(<Button testID="btn-type">Default type</Button>);
      expect(screen.getByTestId('btn-type')).toHaveAttribute('type', 'button');
    });

    it('supports type="submit"', () => {
      render(<Button type="submit" testID="submit-btn">Submit</Button>);
      expect(screen.getByTestId('submit-btn')).toHaveAttribute('type', 'submit');
    });

    it('supports type="reset"', () => {
      render(<Button type="reset" testID="reset-btn">Reset</Button>);
      expect(screen.getByTestId('reset-btn')).toHaveAttribute('type', 'reset');
    });
  });

  // ===== Event Handlers =====
  describe('Event Handlers', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when clicked', () => {
      const handlePress = vi.fn();
      render(<Button onPress={handlePress}>Press</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('calls both onClick and onPress when both provided', () => {
      const handleClick = vi.fn();
      const handlePress = vi.fn();
      render(<Button onClick={handleClick} onPress={handlePress}>Both</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} loading>Loading</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // ===== Disabled State =====
  describe('Disabled State', () => {
    it('sets disabled attribute when disabled', () => {
      render(<Button disabled testID="disabled-btn">Disabled</Button>);
      expect(screen.getByTestId('disabled-btn')).toBeDisabled();
    });

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled testID="aria-disabled">Disabled</Button>);
      expect(screen.getByTestId('aria-disabled')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // ===== Loading State =====
  describe('Loading State', () => {
    it('sets disabled attribute when loading', () => {
      render(<Button loading testID="loading-btn">Loading</Button>);
      expect(screen.getByTestId('loading-btn')).toBeDisabled();
    });

    it('sets aria-busy when loading', () => {
      render(<Button loading testID="aria-busy">Loading</Button>);
      expect(screen.getByTestId('aria-busy')).toHaveAttribute('aria-busy', 'true');
    });

    it('sets aria-disabled when loading', () => {
      render(<Button loading testID="load-disabled">Loading</Button>);
      expect(screen.getByTestId('load-disabled')).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders spinner SVG when loading', () => {
      render(<Button loading testID="spinner-btn">Loading</Button>);
      const button = screen.getByTestId('spinner-btn');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders "Loading" screen reader text when loading without loadingText', () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('renders loadingText when loading with loadingText', () => {
      render(<Button loading loadingText="Saving...">Submit</Button>);
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('does not render children text when loading', () => {
      render(<Button loading>Submit</Button>);
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });
  });

  // ===== Icons =====
  describe('Icons', () => {
    it('renders leftIcon before children', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">L</span>} testID="icon-btn">
          Text
        </Button>
      );
      const button = screen.getByTestId('icon-btn');
      const leftIcon = screen.getByTestId('left-icon');
      expect(button).toContainElement(leftIcon);
    });

    it('renders rightIcon after children', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">R</span>} testID="icon-btn">
          Text
        </Button>
      );
      const button = screen.getByTestId('icon-btn');
      const rightIcon = screen.getByTestId('right-icon');
      expect(button).toContainElement(rightIcon);
    });

    it('hides children when iconOnly is true', () => {
      render(
        <Button iconOnly leftIcon={<span data-testid="icon">I</span>}>
          Hidden text
        </Button>
      );
      expect(screen.queryByText('Hidden text')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });
});
