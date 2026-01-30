/**
 * Modal Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Modal } from '../Modal';
import type { ModalProps } from '../Modal.types';

// Mock react-native
vi.mock('react-native', async () => {
  const React = await import('react');
  const RN = await vi.importActual<typeof import('react-native-web')>('react-native-web');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: vi.fn((options: any) => options.ios || options.default),
    },
    Modal: ({ children, visible, onRequestClose, ...props }: any) => {
      if (!visible) return null;
      return React.createElement(RN.View, { testID: 'rn-modal', ...props }, children);
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
        overlay: 'rgba(0,0,0,0.5)',
        text: '#000000',
      },
      spacing: {
        1: 4,
        2: 8,
        4: 16,
      },
      radius: {
        md: 8,
        lg: 12,
      },
    }),
    Card: ({ children, variant, padding, style, ...props }: any) => (
      <RN.View testID="modal-card" style={style} {...props}>{children}</RN.View>
    ),
    Text: ({ children, variant, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
    Icon: ({ name, size, ...props }: any) => (
      <RN.View testID={`icon-${name}`} {...props} />
    ),
  };
});

describe('Modal', () => {
  const defaultProps: ModalProps = {
    visible: true,
    children: <></>,
  };

  describe('Visibility', () => {
    it('renders content when visible is true', () => {
      const { getByTestId } = render(
        <Modal {...defaultProps}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      );
      expect(getByTestId('modal-content')).toBeTruthy();
    });

    it('does not render when visible is false', () => {
      const { queryByTestId } = render(
        <Modal visible={false}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      );
      expect(queryByTestId('modal-content')).toBeNull();
    });

    it('shows/hides based on visible prop changes', () => {
      const { queryByTestId, rerender } = render(
        <Modal visible={false}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      );
      expect(queryByTestId('modal-content')).toBeNull();

      rerender(
        <Modal visible={true}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      );
      expect(queryByTestId('modal-content')).toBeTruthy();
    });
  });

  describe('Title', () => {
    it('renders title when provided', () => {
      const { getByText } = render(
        <Modal {...defaultProps} title="Modal Title">
          <span>Content</span>
        </Modal>
      );
      expect(getByText('Modal Title')).toBeTruthy();
    });

    it('does not render title when not provided', () => {
      const { queryByText } = render(
        <Modal {...defaultProps}>
          <span>Content</span>
        </Modal>
      );
      expect(queryByText('Modal Title')).toBeNull();
    });
  });

  describe('Close Button', () => {
    it('shows close button by default', () => {
      const onClose = vi.fn();
      const { getByTestId } = render(
        <Modal {...defaultProps} onClose={onClose}>
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('icon-x')).toBeTruthy();
    });

    it('hides close button when showCloseButton is false', () => {
      const { queryByTestId } = render(
        <Modal {...defaultProps} showCloseButton={false}>
          <span>Content</span>
        </Modal>
      );
      expect(queryByTestId('icon-x')).toBeNull();
    });

    it('calls onClose when close button is pressed', () => {
      const onClose = vi.fn();
      const { getByLabelText } = render(
        <Modal {...defaultProps} onClose={onClose}>
          <span>Content</span>
        </Modal>
      );
      fireEvent.click(getByLabelText('Close modal'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Backdrop Click', () => {
    it('calls onClose when backdrop is clicked (dismissible true)', () => {
      const onClose = vi.fn();
      const { getByTestId } = render(
        <Modal {...defaultProps} onClose={onClose} dismissible={true}>
          <span>Content</span>
        </Modal>
      );
      // The backdrop is the outer pressable
      const backdrop = getByTestId('rn-modal').children[0];
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    });

    it('does not call onClose when backdrop is clicked (dismissible false)', () => {
      const onClose = vi.fn();
      const { getByTestId } = render(
        <Modal {...defaultProps} onClose={onClose} dismissible={false}>
          <span>Content</span>
        </Modal>
      );
      const backdrop = getByTestId('rn-modal').children[0];
      fireEvent.click(backdrop);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('is dismissible by default', () => {
      const onClose = vi.fn();
      const { getByTestId } = render(
        <Modal {...defaultProps} onClose={onClose}>
          <span>Content</span>
        </Modal>
      );
      const backdrop = getByTestId('rn-modal').children[0];
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Content Click Propagation', () => {
    it('does not close modal when content is clicked', () => {
      const onClose = vi.fn();
      const { getByTestId } = render(
        <Modal {...defaultProps} onClose={onClose}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      );
      fireEvent.click(getByTestId('modal-content'));
      // onClose should only be called once from the inner pressable stopPropagation test
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      const { getByTestId } = render(
        <Modal {...defaultProps} size="sm">
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('modal-card')).toBeTruthy();
    });

    it('renders with medium size (default)', () => {
      const { getByTestId } = render(
        <Modal {...defaultProps} size="md">
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('modal-card')).toBeTruthy();
    });

    it('renders with large size', () => {
      const { getByTestId } = render(
        <Modal {...defaultProps} size="lg">
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('modal-card')).toBeTruthy();
    });

    it('renders with full size', () => {
      const { getByTestId } = render(
        <Modal {...defaultProps} size="full">
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('modal-card')).toBeTruthy();
    });
  });

  describe('Content Rendering', () => {
    it('renders children content', () => {
      const { getByText } = render(
        <Modal {...defaultProps}>
          <span>Custom Content</span>
        </Modal>
      );
      expect(getByText('Custom Content')).toBeTruthy();
    });

    it('renders complex children', () => {
      const { getByText, getByTestId } = render(
        <Modal {...defaultProps}>
          <div data-testid="complex-content">
            <span>Line 1</span>
            <span>Line 2</span>
          </div>
        </Modal>
      );
      expect(getByTestId('complex-content')).toBeTruthy();
      expect(getByText('Line 1')).toBeTruthy();
      expect(getByText('Line 2')).toBeTruthy();
    });
  });

  describe('Header Rendering', () => {
    it('renders header when title is provided', () => {
      const { getByText } = render(
        <Modal {...defaultProps} title="Header Title">
          <span>Content</span>
        </Modal>
      );
      expect(getByText('Header Title')).toBeTruthy();
    });

    it('renders header when showCloseButton is true (even without title)', () => {
      const onClose = vi.fn();
      const { getByTestId } = render(
        <Modal {...defaultProps} onClose={onClose} showCloseButton={true}>
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('icon-x')).toBeTruthy();
    });

    it('does not render header when no title and showCloseButton is false', () => {
      const { queryByTestId } = render(
        <Modal {...defaultProps} showCloseButton={false}>
          <span>Content</span>
        </Modal>
      );
      expect(queryByTestId('icon-x')).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('has accessible close button', () => {
      const onClose = vi.fn();
      const { getByLabelText } = render(
        <Modal {...defaultProps} onClose={onClose}>
          <span>Content</span>
        </Modal>
      );
      expect(getByLabelText('Close modal')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('accepts custom style prop', () => {
      const { getByTestId } = render(
        <Modal {...defaultProps} style={{ backgroundColor: 'red' }}>
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('modal-card')).toBeTruthy();
    });

    it('accepts custom contentStyle prop', () => {
      const { getByTestId } = render(
        <Modal {...defaultProps} contentStyle={{ padding: 20 }}>
          <span>Content</span>
        </Modal>
      );
      expect(getByTestId('modal-card')).toBeTruthy();
    });
  });
});
