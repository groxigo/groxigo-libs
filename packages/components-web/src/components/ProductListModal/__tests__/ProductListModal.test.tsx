import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductListModal } from '../ProductListModal';

describe('ProductListModal', () => {
  it('renders modal content when isOpen is true', () => {
    render(
      <ProductListModal isOpen onClose={vi.fn()} testID="product-modal">
        <div>Product List Content</div>
      </ProductListModal>
    );
    expect(screen.getByTestId('product-modal')).toBeInTheDocument();
    expect(screen.getByText('Product List Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <ProductListModal isOpen={false} onClose={vi.fn()} testID="product-modal">
        <div>Hidden Content</div>
      </ProductListModal>
    );
    expect(screen.queryByTestId('product-modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  it('renders title text', () => {
    render(
      <ProductListModal isOpen onClose={vi.fn()} title="Spices & Seasonings">
        <div>Items</div>
      </ProductListModal>
    );
    expect(screen.getByText('Spices & Seasonings')).toBeInTheDocument();
  });

  it('renders default title "Products" when no title is provided', () => {
    render(
      <ProductListModal isOpen onClose={vi.fn()}>
        <div>Items</div>
      </ProductListModal>
    );
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders close button with aria-label', () => {
    render(
      <ProductListModal isOpen onClose={vi.fn()}>
        <div>Content</div>
      </ProductListModal>
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <ProductListModal isOpen onClose={handleClose}>
        <div>Content</div>
      </ProductListModal>
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders children content', () => {
    render(
      <ProductListModal isOpen onClose={vi.fn()}>
        <span>Product A</span>
        <span>Product B</span>
      </ProductListModal>
    );
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });
});
