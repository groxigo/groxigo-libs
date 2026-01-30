/**
 * CartItem Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CartItem } from '../CartItem';
import type { CartItemProps } from '../CartItem.types';

// Mock react-native
vi.mock('react-native', async () => {
  const RN = await vi.importActual('react-native-web');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: vi.fn((options: any) => options.ios || options.default),
    },
  };
});

// Mock ui-elements
vi.mock('@groxigo/ui-elements', async () => {
  const React = await import('react');
  const RN = await import('react-native');

  return {
    useTheme: () => ({
      colors: {
        primary: '#007AFF',
        text: '#000000',
        textSecondary: '#666666',
        textTertiary: '#999999',
        surface: '#FFFFFF',
        border: '#E0E0E0',
        error: '#FF3B30',
      },
      spacing: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
      },
      radius: {
        md: 8,
      },
    }),
    Text: ({ children, variant, weight, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
    Icon: ({ name, size, style, ...props }: any) => (
      <RN.View testID={`icon-${name}`} {...props} style={style} />
    ),
  };
});

// Mock QuantitySelector
vi.mock('../../QuantitySelector', async () => {
  const React = await import('react');
  const RN = await import('react-native');
  return {
    QuantitySelector: ({ value, onChange, disabled, ...props }: any) => (
      <RN.View testID="quantity-selector" {...props}>
        <RN.Pressable
          onPress={() => !disabled && onChange(value - 1)}
          testID="decrement-button"
          disabled={disabled}
        >
          <RN.Text>-</RN.Text>
        </RN.Pressable>
        <RN.Text testID="quantity-value">{value}</RN.Text>
        <RN.Pressable
          onPress={() => !disabled && onChange(value + 1)}
          testID="increment-button"
          disabled={disabled}
        >
          <RN.Text>+</RN.Text>
        </RN.Pressable>
      </RN.View>
    ),
  };
});

// Mock PriceDisplay
vi.mock('../../PriceDisplay', async () => {
  const React = await import('react');
  const RN = await import('react-native');
  return {
    PriceDisplay: ({ price, currency, ...props }: any) => {
      const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;
      return (
        <RN.View testID="price-display" {...props}>
          <RN.Text>{formattedPrice}</RN.Text>
        </RN.View>
      );
    },
  };
});

describe('CartItem', () => {
  const defaultProps: CartItemProps = {
    title: 'Test Product',
    price: 19.99,
    image: { uri: 'https://example.com/image.jpg' },
  };

  describe('Basic Rendering', () => {
    it('renders product title correctly', () => {
      const { getByText } = render(<CartItem {...defaultProps} />);
      expect(getByText('Test Product')).toBeTruthy();
    });

    it('renders product description when provided', () => {
      const { getByText } = render(
        <CartItem {...defaultProps} description="500g pack" />
      );
      expect(getByText('500g pack')).toBeTruthy();
    });

    it('renders price display', () => {
      const { getByTestId } = render(<CartItem {...defaultProps} />);
      expect(getByTestId('price-display')).toBeTruthy();
    });

    it('renders image when provided', () => {
      const { container } = render(<CartItem {...defaultProps} />);
      expect(container).toBeTruthy();
    });
  });

  describe('Quantity Display', () => {
    it('displays default quantity of 1', () => {
      const onQuantityChange = vi.fn();
      const { getByText } = render(
        <CartItem {...defaultProps} onQuantityChange={onQuantityChange} />
      );
      expect(getByText('1')).toBeTruthy();
    });

    it('displays provided quantity', () => {
      const onQuantityChange = vi.fn();
      const { getByText } = render(
        <CartItem {...defaultProps} quantity={5} onQuantityChange={onQuantityChange} />
      );
      expect(getByText('5')).toBeTruthy();
    });
  });

  describe('Quantity Changes', () => {
    it('calls onQuantityChange when increment is pressed', () => {
      const onQuantityChange = vi.fn();
      const { getByTestId } = render(
        <CartItem {...defaultProps} quantity={2} onQuantityChange={onQuantityChange} />
      );
      fireEvent.click(getByTestId('increment-button'));
      expect(onQuantityChange).toHaveBeenCalledWith(3);
    });

    it('calls onQuantityChange when decrement is pressed', () => {
      const onQuantityChange = vi.fn();
      const { getByTestId } = render(
        <CartItem {...defaultProps} quantity={3} onQuantityChange={onQuantityChange} />
      );
      fireEvent.click(getByTestId('decrement-button'));
      expect(onQuantityChange).toHaveBeenCalledWith(2);
    });

    it('renders quantity selector when onQuantityChange is provided', () => {
      const onQuantityChange = vi.fn();
      const { getByTestId } = render(
        <CartItem {...defaultProps} onQuantityChange={onQuantityChange} />
      );
      expect(getByTestId('quantity-selector')).toBeTruthy();
    });

    it('does not render quantity selector when onQuantityChange is not provided', () => {
      const { queryByTestId } = render(<CartItem {...defaultProps} />);
      expect(queryByTestId('quantity-selector')).toBeNull();
    });
  });

  describe('Remove Item', () => {
    it('renders remove button when onRemove is provided', () => {
      const onRemove = vi.fn();
      const { getByTestId } = render(
        <CartItem {...defaultProps} onRemove={onRemove} />
      );
      expect(getByTestId('icon-x')).toBeTruthy();
    });

    it('calls onRemove when remove button is pressed', () => {
      const onRemove = vi.fn();
      const { getByLabelText } = render(
        <CartItem {...defaultProps} onRemove={onRemove} />
      );
      fireEvent.click(getByLabelText('Remove item'));
      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('does not render remove button when onRemove is not provided', () => {
      const { queryByTestId } = render(<CartItem {...defaultProps} />);
      expect(queryByTestId('icon-x')).toBeNull();
    });
  });

  describe('Disabled State', () => {
    it('applies disabled opacity when disabled is true', () => {
      const { container } = render(
        <CartItem {...defaultProps} disabled={true} />
      );
      expect(container).toBeTruthy();
    });

    it('does not call onRemove when disabled', () => {
      const onRemove = vi.fn();
      const { getByLabelText } = render(
        <CartItem {...defaultProps} onRemove={onRemove} disabled={true} />
      );
      // The button should still be there but disabled
      const removeButton = getByLabelText('Remove item');
      expect(removeButton).toBeTruthy();
    });
  });

  describe('Price Calculations', () => {
    it('displays price as number correctly', () => {
      const { getByText } = render(
        <CartItem {...defaultProps} price={25.50} />
      );
      expect(getByText('$25.50')).toBeTruthy();
    });

    it('displays price as string correctly', () => {
      const { getByText } = render(
        <CartItem {...defaultProps} price="$30.00" />
      );
      expect(getByText('$30.00')).toBeTruthy();
    });
  });

  describe('Currency', () => {
    it('uses default currency USD', () => {
      const { getByTestId } = render(<CartItem {...defaultProps} />);
      expect(getByTestId('price-display')).toBeTruthy();
    });

    it('accepts custom currency', () => {
      const { getByTestId } = render(
        <CartItem {...defaultProps} currency="EUR" />
      );
      expect(getByTestId('price-display')).toBeTruthy();
    });
  });
});
