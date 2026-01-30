/**
 * ProductCard Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import type { ProductCardProps } from '../ProductCard.types';

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
        textInverse: '#FFFFFF',
        text: '#000000',
        textSecondary: '#666666',
        textTertiary: '#999999',
        surface: '#FFFFFF',
        surfaceSecondary: '#F5F5F5',
        border: '#E0E0E0',
        error: '#FF3B30',
        warning: '#FF9500',
        overlay: 'rgba(0,0,0,0.5)',
      },
      spacing: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        8: 32,
      },
      radius: {
        sm: 4,
        md: 8,
        lg: 12,
        full: 9999,
      },
    }),
    Card: ({ children, ...props }: any) => <RN.View {...props}>{children}</RN.View>,
    Text: ({ children, variant, weight, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
    Button: ({ children, onPress, ...props }: any) => (
      <RN.Pressable onPress={onPress} testID="action-button" {...props}>
        <RN.Text>{children}</RN.Text>
      </RN.Pressable>
    ),
    Badge: ({ children, ...props }: any) => (
      <RN.View testID="badge" {...props}>
        <RN.Text>{children}</RN.Text>
      </RN.View>
    ),
    Icon: ({ name, size, color, style, ...props }: any) => (
      <RN.View testID={`icon-${name}`} {...props} />
    ),
  };
});

// Mock QuantitySelector
vi.mock('../../QuantitySelector', async () => {
  const React = await import('react');
  const RN = await import('react-native');
  return {
    QuantitySelector: ({ value, onChange, ...props }: any) => (
      <RN.View testID="quantity-selector" {...props}>
        <RN.Pressable onPress={() => onChange(value - 1)} testID="decrement-button">
          <RN.Text>-</RN.Text>
        </RN.Pressable>
        <RN.Text testID="quantity-value">{value}</RN.Text>
        <RN.Pressable onPress={() => onChange(value + 1)} testID="increment-button">
          <RN.Text>+</RN.Text>
        </RN.Pressable>
      </RN.View>
    ),
  };
});

describe('ProductCard', () => {
  const defaultProps: ProductCardProps = {
    title: 'Test Product',
    price: 9.99,
    image: { uri: 'https://example.com/image.jpg' },
  };

  describe('Basic Rendering', () => {
    it('renders product title correctly', () => {
      const { getByText } = render(<ProductCard {...defaultProps} />);
      expect(getByText('Test Product')).toBeTruthy();
    });

    it('displays formatted price for number', () => {
      const { getByText } = render(<ProductCard {...defaultProps} price={9.99} />);
      expect(getByText('$9.99')).toBeTruthy();
    });

    it('displays price string as-is', () => {
      const { getByText } = render(<ProductCard {...defaultProps} price="$12.50" />);
      expect(getByText('$12.50')).toBeTruthy();
    });

    it('renders description when provided', () => {
      const { getByText } = render(
        <ProductCard {...defaultProps} description="A great product" />
      );
      expect(getByText('A great product')).toBeTruthy();
    });

    it('does not render description when not provided', () => {
      const { queryByText } = render(<ProductCard {...defaultProps} />);
      expect(queryByText('A great product')).toBeNull();
    });
  });

  describe('Discount Badge', () => {
    it('shows discount badge when compareAtPrice is provided', () => {
      const { getByText } = render(
        <ProductCard {...defaultProps} price={10} compareAtPrice={20} />
      );
      expect(getByText('50% OFF')).toBeTruthy();
    });

    it('calculates discount correctly for various values', () => {
      const { getByText } = render(
        <ProductCard {...defaultProps} price={14.99} compareAtPrice={19.99} />
      );
      expect(getByText('25% OFF')).toBeTruthy();
    });

    it('does not show discount when compareAtPrice is less than price', () => {
      const { queryByText } = render(
        <ProductCard {...defaultProps} price={20} compareAtPrice={10} />
      );
      expect(queryByText(/OFF/)).toBeNull();
    });

    it('does not show discount when compareAtPrice equals price', () => {
      const { queryByText } = render(
        <ProductCard {...defaultProps} price={10} compareAtPrice={10} />
      );
      expect(queryByText(/OFF/)).toBeNull();
    });
  });

  describe('Badge', () => {
    it('renders badge when provided', () => {
      const { getByTestId, getByText } = render(
        <ProductCard {...defaultProps} badge="New" />
      );
      expect(getByTestId('badge')).toBeTruthy();
      expect(getByText('New')).toBeTruthy();
    });
  });

  describe('Action Button', () => {
    it('renders action button when actionLabel and onAction are provided', () => {
      const onAction = vi.fn();
      const { getByText } = render(
        <ProductCard {...defaultProps} actionLabel="Add to Cart" onAction={onAction} />
      );
      expect(getByText('Add to Cart')).toBeTruthy();
    });

    it('calls onAction when action button is pressed', () => {
      const onAction = vi.fn();
      const { getByTestId } = render(
        <ProductCard {...defaultProps} actionLabel="Add to Cart" onAction={onAction} />
      );
      fireEvent.click(getByTestId('action-button'));
      expect(onAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Favorite Button', () => {
    it('renders favorite button when onFavorite is provided', () => {
      const onFavorite = vi.fn();
      const { getByTestId } = render(
        <ProductCard {...defaultProps} onFavorite={onFavorite} isFavorite={false} />
      );
      expect(getByTestId('icon-heart')).toBeTruthy();
    });

    it('shows filled heart when isFavorite is true', () => {
      const onFavorite = vi.fn();
      const { getByTestId } = render(
        <ProductCard {...defaultProps} onFavorite={onFavorite} isFavorite={true} />
      );
      expect(getByTestId('icon-heart-fill')).toBeTruthy();
    });

    it('calls onFavorite with toggled value when pressed', () => {
      const onFavorite = vi.fn();
      const { getByLabelText } = render(
        <ProductCard {...defaultProps} onFavorite={onFavorite} isFavorite={false} />
      );
      fireEvent.click(getByLabelText('Add to favorites'));
      expect(onFavorite).toHaveBeenCalledWith(true);
    });

    it('calls onFavorite with false when unfavoriting', () => {
      const onFavorite = vi.fn();
      const { getByLabelText } = render(
        <ProductCard {...defaultProps} onFavorite={onFavorite} isFavorite={true} />
      );
      fireEvent.click(getByLabelText('Remove from favorites'));
      expect(onFavorite).toHaveBeenCalledWith(false);
    });
  });

  describe('Quantity Selector', () => {
    it('renders quantity selector when onQuantityChange is provided and quantity > 0', () => {
      const onQuantityChange = vi.fn();
      const { getByTestId } = render(
        <ProductCard
          {...defaultProps}
          quantity={2}
          onQuantityChange={onQuantityChange}
        />
      );
      expect(getByTestId('quantity-selector')).toBeTruthy();
    });

    it('shows add button when quantity is 0', () => {
      const onQuantityChange = vi.fn();
      const { getByLabelText } = render(
        <ProductCard
          {...defaultProps}
          quantity={0}
          onQuantityChange={onQuantityChange}
        />
      );
      expect(getByLabelText('Add to cart')).toBeTruthy();
    });

    it('calls onQuantityChange with minQuantity when add button is pressed', () => {
      const onQuantityChange = vi.fn();
      const { getByLabelText } = render(
        <ProductCard
          {...defaultProps}
          quantity={0}
          onQuantityChange={onQuantityChange}
          minQuantity={1}
        />
      );
      fireEvent.click(getByLabelText('Add to cart'));
      expect(onQuantityChange).toHaveBeenCalledWith(1);
    });

    it('displays current quantity value', () => {
      const onQuantityChange = vi.fn();
      const { getByText } = render(
        <ProductCard
          {...defaultProps}
          quantity={3}
          onQuantityChange={onQuantityChange}
        />
      );
      expect(getByText('3')).toBeTruthy();
    });
  });

  describe('Card Press', () => {
    it('calls onPress when card is pressed', () => {
      const onPress = vi.fn();
      const { getByText } = render(
        <ProductCard {...defaultProps} onPress={onPress} />
      );
      fireEvent.click(getByText('Test Product'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Image Handling', () => {
    it('shows placeholder when no image is provided', () => {
      const { getByTestId } = render(
        <ProductCard title="Test" price={10} />
      );
      expect(getByTestId('icon-image')).toBeTruthy();
    });
  });
});
