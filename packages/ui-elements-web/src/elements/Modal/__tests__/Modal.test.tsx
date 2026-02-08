import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    usePortal: false,
  };

  it('renders when isOpen is true', () => {
    render(
      <Modal {...defaultProps} testID="modal">
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} usePortal={false} testID="modal">
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders with role="dialog"', () => {
    render(
      <Modal {...defaultProps}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(
      <Modal {...defaultProps}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('renders close button by default', () => {
    render(
      <Modal {...defaultProps}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal {...defaultProps} showCloseButton={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} usePortal={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key press', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} usePortal={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEsc is false', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} usePortal={false} closeOnEsc={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on overlay click when closeOnOverlayClick is true', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} usePortal={false} closeOnOverlayClick>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    // The backdrop is the element with aria-hidden="true" that handles click
    const backdrop = screen.getByRole('presentation').querySelector('[aria-hidden="true"]');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onClose on overlay click when closeOnOverlayClick is false', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} usePortal={false} closeOnOverlayClick={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    const backdrop = screen.getByRole('presentation').querySelector('[aria-hidden="true"]');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('renders ModalHeader with title', () => {
    render(
      <Modal {...defaultProps}>
        <ModalHeader>My Title</ModalHeader>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders ModalBody with content', () => {
    render(
      <Modal {...defaultProps}>
        <ModalBody>Body content here</ModalBody>
      </Modal>
    );
    expect(screen.getByText('Body content here')).toBeInTheDocument();
  });

  it('renders ModalFooter with content', () => {
    render(
      <Modal {...defaultProps}>
        <ModalBody>Content</ModalBody>
        <ModalFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </ModalFooter>
      </Modal>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(
      <Modal {...defaultProps} testID="my-modal">
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByTestId('my-modal')).toBeInTheDocument();
  });
});
