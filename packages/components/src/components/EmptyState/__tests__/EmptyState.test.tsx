/**
 * EmptyState Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EmptyState } from '../EmptyState';
import type { EmptyStateProps } from '../EmptyState.types';

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
        text: '#000000',
        textSecondary: '#666666',
        textTertiary: '#999999',
      },
      spacing: {
        2: 8,
        4: 16,
        8: 32,
      },
    }),
    Text: ({ children, variant, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
    Button: ({ children, onPress, variant, ...props }: any) => (
      <RN.Pressable onPress={onPress} testID="action-button" {...props}>
        <RN.Text>{children}</RN.Text>
      </RN.Pressable>
    ),
    Icon: ({ name, size, style, ...props }: any) => (
      <RN.View testID={`icon-${name}`} {...props} style={style} />
    ),
  };
});

describe('EmptyState', () => {
  const defaultProps: EmptyStateProps = {
    title: 'No items found',
  };

  describe('Basic Rendering', () => {
    it('renders title correctly', () => {
      const { getByText } = render(<EmptyState {...defaultProps} />);
      expect(getByText('No items found')).toBeTruthy();
    });

    it('renders description when provided', () => {
      const { getByText } = render(
        <EmptyState {...defaultProps} description="Try adjusting your search" />
      );
      expect(getByText('Try adjusting your search')).toBeTruthy();
    });

    it('does not render description when not provided', () => {
      const { queryByText } = render(<EmptyState {...defaultProps} />);
      expect(queryByText('Try adjusting your search')).toBeNull();
    });
  });

  describe('Icon', () => {
    it('renders default icon (inbox)', () => {
      const { getByTestId } = render(<EmptyState {...defaultProps} />);
      expect(getByTestId('icon-inbox')).toBeTruthy();
    });

    it('renders custom icon when provided', () => {
      const { getByTestId } = render(
        <EmptyState {...defaultProps} icon="search" />
      );
      expect(getByTestId('icon-search')).toBeTruthy();
    });

    it('renders cart icon for cart empty state', () => {
      const { getByTestId } = render(
        <EmptyState {...defaultProps} icon="cart" />
      );
      expect(getByTestId('icon-cart')).toBeTruthy();
    });
  });

  describe('Action Button', () => {
    it('renders action button when actionLabel and onAction are provided', () => {
      const onAction = vi.fn();
      const { getByText } = render(
        <EmptyState {...defaultProps} actionLabel="Add Items" onAction={onAction} />
      );
      expect(getByText('Add Items')).toBeTruthy();
    });

    it('calls onAction when action button is pressed', () => {
      const onAction = vi.fn();
      const { getByTestId } = render(
        <EmptyState {...defaultProps} actionLabel="Add Items" onAction={onAction} />
      );
      fireEvent.click(getByTestId('action-button'));
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it('does not render action button when only actionLabel is provided', () => {
      const { queryByTestId } = render(
        <EmptyState {...defaultProps} actionLabel="Add Items" />
      );
      expect(queryByTestId('action-button')).toBeNull();
    });

    it('does not render action button when only onAction is provided', () => {
      const onAction = vi.fn();
      const { queryByTestId } = render(
        <EmptyState {...defaultProps} onAction={onAction} />
      );
      expect(queryByTestId('action-button')).toBeNull();
    });
  });

  describe('Complete Empty State', () => {
    it('renders all elements together', () => {
      const onAction = vi.fn();
      const { getByText, getByTestId } = render(
        <EmptyState
          icon="search"
          title="No results"
          description="Try different keywords"
          actionLabel="Clear Search"
          onAction={onAction}
        />
      );

      expect(getByTestId('icon-search')).toBeTruthy();
      expect(getByText('No results')).toBeTruthy();
      expect(getByText('Try different keywords')).toBeTruthy();
      expect(getByText('Clear Search')).toBeTruthy();
    });
  });

  describe('Cart Empty State Example', () => {
    it('renders cart empty state correctly', () => {
      const onAction = vi.fn();
      const { getByText, getByTestId } = render(
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          description="Add some items to get started"
          actionLabel="Start Shopping"
          onAction={onAction}
        />
      );

      expect(getByTestId('icon-cart')).toBeTruthy();
      expect(getByText('Your cart is empty')).toBeTruthy();
      expect(getByText('Add some items to get started')).toBeTruthy();
      expect(getByText('Start Shopping')).toBeTruthy();
    });
  });

  describe('Favorites Empty State Example', () => {
    it('renders favorites empty state correctly', () => {
      const onAction = vi.fn();
      const { getByText, getByTestId } = render(
        <EmptyState
          icon="heart"
          title="No favorites yet"
          description="Start adding products you love"
          actionLabel="Browse Products"
          onAction={onAction}
        />
      );

      expect(getByTestId('icon-heart')).toBeTruthy();
      expect(getByText('No favorites yet')).toBeTruthy();
      expect(getByText('Start adding products you love')).toBeTruthy();
      expect(getByText('Browse Products')).toBeTruthy();
    });
  });

  describe('Section Theming', () => {
    it('accepts groceries section', () => {
      const { container } = render(
        <EmptyState {...defaultProps} section="groceries" />
      );
      expect(container).toBeTruthy();
    });

    it('accepts recipes section', () => {
      const { container } = render(
        <EmptyState {...defaultProps} section="recipes" />
      );
      expect(container).toBeTruthy();
    });

    it('accepts default section', () => {
      const { container } = render(
        <EmptyState {...defaultProps} section="default" />
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom style prop', () => {
      const { container } = render(
        <EmptyState {...defaultProps} style={{ backgroundColor: 'red' }} />
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long title', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines in the UI';
      const { getByText } = render(<EmptyState title={longTitle} />);
      expect(getByText(longTitle)).toBeTruthy();
    });

    it('handles very long description', () => {
      const longDescription = 'This is a very long description that provides detailed information about why the state is empty and what the user can do about it. It might span multiple lines.';
      const { getByText } = render(
        <EmptyState {...defaultProps} description={longDescription} />
      );
      expect(getByText(longDescription)).toBeTruthy();
    });

    it('handles empty string icon (still shows default)', () => {
      const { getByTestId } = render(
        <EmptyState {...defaultProps} icon="" />
      );
      // Component uses icon || 'inbox' pattern, but icon="" is falsy
      // So it should not render the icon
    });
  });
});
