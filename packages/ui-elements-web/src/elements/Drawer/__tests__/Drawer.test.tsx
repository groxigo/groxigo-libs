import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '../Drawer';

describe('Drawer', () => {
  it('renders when isOpen is true', () => {
    render(
      <Drawer isOpen onClose={vi.fn()} testID="drawer">
        <DrawerBody>Drawer content</DrawerBody>
      </Drawer>
    );
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={vi.fn()} testID="drawer">
        <DrawerBody>Drawer content</DrawerBody>
      </Drawer>
    );
    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
  });

  it('renders with role="dialog"', () => {
    render(
      <Drawer isOpen onClose={vi.fn()}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(
      <Drawer isOpen onClose={vi.fn()}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('calls onClose on Escape key press', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEsc is false', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose} closeOnEsc={false}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders DrawerHeader with title text', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <DrawerHeader onClose={onClose}>Navigation</DrawerHeader>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('renders DrawerHeader close button that calls onClose', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <DrawerHeader onClose={onClose}>Title</DrawerHeader>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    const closeBtn = screen.getByLabelText('Close drawer');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders DrawerBody content', () => {
    render(
      <Drawer isOpen onClose={vi.fn()}>
        <DrawerBody>Main content here</DrawerBody>
      </Drawer>
    );
    expect(screen.getByText('Main content here')).toBeInTheDocument();
  });

  it('renders DrawerFooter content', () => {
    render(
      <Drawer isOpen onClose={vi.fn()}>
        <DrawerBody>Content</DrawerBody>
        <DrawerFooter>
          <button>Save</button>
        </DrawerFooter>
      </Drawer>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('preserves content when preserveContent is true and drawer closes', () => {
    const { rerender } = render(
      <Drawer isOpen onClose={vi.fn()} preserveContent testID="drawer">
        <DrawerBody>Preserved content</DrawerBody>
      </Drawer>
    );
    // Still rendered when closed because preserveContent=true
    rerender(
      <Drawer isOpen={false} onClose={vi.fn()} preserveContent testID="drawer">
        <DrawerBody>Preserved content</DrawerBody>
      </Drawer>
    );
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(
      <Drawer isOpen onClose={vi.fn()} testID="my-drawer">
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    expect(screen.getByTestId('my-drawer')).toBeInTheDocument();
  });

  it('forwards ref to the drawer panel element', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <Drawer ref={ref} isOpen onClose={vi.fn()}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
