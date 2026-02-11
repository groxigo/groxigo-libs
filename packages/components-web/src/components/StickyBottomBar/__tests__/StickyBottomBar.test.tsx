import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StickyBottomBar } from '../StickyBottomBar';

describe('StickyBottomBar', () => {
  it('renders with testID', () => {
    render(<StickyBottomBar testID="sticky-bar" />);
    expect(screen.getByTestId('sticky-bar')).toBeInTheDocument();
  });

  it('renders default button text "Continue"', () => {
    render(<StickyBottomBar />);
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('renders custom button text', () => {
    render(<StickyBottomBar buttonText="Add to Cart" />);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders children instead of default layout', () => {
    render(
      <StickyBottomBar testID="sticky-bar">
        <span>Custom Content</span>
      </StickyBottomBar>
    );
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('renders withPrice variant showing label and price', () => {
    render(
      <StickyBottomBar
        variant="withPrice"
        label="Total"
        price="$4.99"
      />
    );
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$4.99')).toBeInTheDocument();
  });

  it('renders singleAction variant with full-width button', () => {
    render(
      <StickyBottomBar variant="singleAction" buttonText="Checkout" testID="sticky-bar" />
    );
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByTestId('sticky-bar')).toBeInTheDocument();
  });

  it('calls onButtonPress when button is clicked', () => {
    const handlePress = vi.fn();
    render(<StickyBottomBar onButtonPress={handlePress} buttonText="Go" />);
    screen.getByText('Go').click();
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
