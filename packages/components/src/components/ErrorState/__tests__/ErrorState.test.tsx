/**
 * ErrorState Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ErrorState } from '../ErrorState';
import type { ErrorStateProps } from '../ErrorState.types';

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
        error: '#FF3B30',
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
      <RN.Pressable onPress={onPress} testID="retry-button" {...props}>
        <RN.Text>{children}</RN.Text>
      </RN.Pressable>
    ),
    Icon: ({ name, size, style, ...props }: any) => (
      <RN.View testID={`icon-${name}`} {...props} style={style} />
    ),
  };
});

describe('ErrorState', () => {
  const defaultProps: ErrorStateProps = {
    message: 'An error occurred while loading data',
  };

  describe('Basic Rendering', () => {
    it('renders error message correctly', () => {
      const { getByText } = render(<ErrorState {...defaultProps} />);
      expect(getByText('An error occurred while loading data')).toBeTruthy();
    });

    it('renders default title', () => {
      const { getByText } = render(<ErrorState {...defaultProps} />);
      expect(getByText('Something went wrong')).toBeTruthy();
    });

    it('renders custom title when provided', () => {
      const { getByText } = render(
        <ErrorState {...defaultProps} title="Connection Error" />
      );
      expect(getByText('Connection Error')).toBeTruthy();
    });

    it('renders warning icon', () => {
      const { getByTestId } = render(<ErrorState {...defaultProps} />);
      expect(getByTestId('icon-warning')).toBeTruthy();
    });
  });

  describe('Retry Button', () => {
    it('renders retry button when onRetry is provided', () => {
      const onRetry = vi.fn();
      const { getByText } = render(
        <ErrorState {...defaultProps} onRetry={onRetry} />
      );
      expect(getByText('Try Again')).toBeTruthy();
    });

    it('calls onRetry when retry button is pressed', () => {
      const onRetry = vi.fn();
      const { getByTestId } = render(
        <ErrorState {...defaultProps} onRetry={onRetry} />
      );
      fireEvent.click(getByTestId('retry-button'));
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('uses default retry label', () => {
      const onRetry = vi.fn();
      const { getByText } = render(
        <ErrorState {...defaultProps} onRetry={onRetry} />
      );
      expect(getByText('Try Again')).toBeTruthy();
    });

    it('uses custom retry label when provided', () => {
      const onRetry = vi.fn();
      const { getByText } = render(
        <ErrorState {...defaultProps} onRetry={onRetry} retryLabel="Reload Page" />
      );
      expect(getByText('Reload Page')).toBeTruthy();
    });

    it('does not render retry button when onRetry is not provided', () => {
      const { queryByTestId } = render(<ErrorState {...defaultProps} />);
      expect(queryByTestId('retry-button')).toBeNull();
    });
  });

  describe('Network Error Example', () => {
    it('renders network error state correctly', () => {
      const onRetry = vi.fn();
      const { getByText, getByTestId } = render(
        <ErrorState
          title="Network Error"
          message="Unable to connect to the server. Please check your internet connection."
          retryLabel="Retry Connection"
          onRetry={onRetry}
        />
      );

      expect(getByTestId('icon-warning')).toBeTruthy();
      expect(getByText('Network Error')).toBeTruthy();
      expect(getByText('Unable to connect to the server. Please check your internet connection.')).toBeTruthy();
      expect(getByText('Retry Connection')).toBeTruthy();
    });
  });

  describe('Server Error Example', () => {
    it('renders server error state correctly', () => {
      const onRetry = vi.fn();
      const { getByText, getByTestId } = render(
        <ErrorState
          title="Server Error"
          message="Our servers are experiencing issues. Please try again later."
          onRetry={onRetry}
        />
      );

      expect(getByTestId('icon-warning')).toBeTruthy();
      expect(getByText('Server Error')).toBeTruthy();
      expect(getByText('Our servers are experiencing issues. Please try again later.')).toBeTruthy();
    });
  });

  describe('404 Error Example', () => {
    it('renders not found error correctly', () => {
      const { getByText } = render(
        <ErrorState
          title="Not Found"
          message="The page you are looking for does not exist."
        />
      );

      expect(getByText('Not Found')).toBeTruthy();
      expect(getByText('The page you are looking for does not exist.')).toBeTruthy();
    });
  });

  describe('Permission Error Example', () => {
    it('renders permission error correctly', () => {
      const { getByText } = render(
        <ErrorState
          title="Access Denied"
          message="You do not have permission to view this content."
        />
      );

      expect(getByText('Access Denied')).toBeTruthy();
      expect(getByText('You do not have permission to view this content.')).toBeTruthy();
    });
  });

  describe('Section Theming', () => {
    it('accepts groceries section', () => {
      const { container } = render(
        <ErrorState {...defaultProps} section="groceries" />
      );
      expect(container).toBeTruthy();
    });

    it('accepts recipes section', () => {
      const { container } = render(
        <ErrorState {...defaultProps} section="recipes" />
      );
      expect(container).toBeTruthy();
    });

    it('accepts default section', () => {
      const { container } = render(
        <ErrorState {...defaultProps} section="default" />
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom style prop', () => {
      const { container } = render(
        <ErrorState {...defaultProps} style={{ backgroundColor: 'red' }} />
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Multiple Retry Clicks', () => {
    it('calls onRetry each time retry button is clicked', () => {
      const onRetry = vi.fn();
      const { getByTestId } = render(
        <ErrorState {...defaultProps} onRetry={onRetry} />
      );

      const retryButton = getByTestId('retry-button');
      fireEvent.click(retryButton);
      fireEvent.click(retryButton);
      fireEvent.click(retryButton);

      expect(onRetry).toHaveBeenCalledTimes(3);
    });
  });

  describe('Edge Cases', () => {
    it('handles very long error message', () => {
      const longMessage = 'This is a very long error message that provides detailed information about what went wrong. It might include technical details, suggested actions, and contact information for support. The message should be displayed properly regardless of length.';
      const { getByText } = render(<ErrorState message={longMessage} />);
      expect(getByText(longMessage)).toBeTruthy();
    });

    it('handles very long title', () => {
      const longTitle = 'This Is A Very Long Error Title That Might Not Fit On One Line';
      const { getByText } = render(
        <ErrorState {...defaultProps} title={longTitle} />
      );
      expect(getByText(longTitle)).toBeTruthy();
    });

    it('renders with minimal props', () => {
      const { getByText, getByTestId } = render(
        <ErrorState message="Error occurred" />
      );
      expect(getByTestId('icon-warning')).toBeTruthy();
      expect(getByText('Something went wrong')).toBeTruthy();
      expect(getByText('Error occurred')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('error icon is visible to assistive technologies', () => {
      const { getByTestId } = render(<ErrorState {...defaultProps} />);
      expect(getByTestId('icon-warning')).toBeTruthy();
    });

    it('retry button is pressable', () => {
      const onRetry = vi.fn();
      const { getByTestId } = render(
        <ErrorState {...defaultProps} onRetry={onRetry} />
      );
      const button = getByTestId('retry-button');
      expect(button).toBeTruthy();
      fireEvent.click(button);
      expect(onRetry).toHaveBeenCalled();
    });
  });
});
