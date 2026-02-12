'use client';

import { forwardRef, useCallback, type ReactNode } from 'react';
import { Modal } from '@groxigo/ui-elements-web';
import { Times } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './ProductListModal.module.css';

export interface ProductListModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title (e.g. category name) */
  title?: string;
  /** Product content (tiles, cards, etc.) */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}

export const ProductListModal = forwardRef<HTMLDivElement, ProductListModalProps>(
  ({ isOpen, onClose, title, children, className, testID }, ref) => {
    const handleCloseClick = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        placement="center"
        showCloseButton={false}
        testID={testID}
      >
        <div
          ref={ref}
          className={clsx(styles.root, className)}
        >
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>{title ?? 'Products'}</h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCloseClick}
              aria-label="Close"
            >
              <Times size={16} />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </Modal>
    );
  }
);

ProductListModal.displayName = 'ProductListModal';
export default ProductListModal;
