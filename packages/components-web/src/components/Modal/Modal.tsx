/**
 * Modal Component (Web - Composite)
 *
 * Wrapper around ui-elements-web Modal with additional features.
 * Provides a complete modal with header, body, and footer sections.
 */

'use client';

import React, { forwardRef } from 'react';
import {
  Modal as BaseModal,
  ModalHeader as BaseModalHeader,
  ModalBody as BaseModalBody,
  ModalFooter as BaseModalFooter,
  Button,
  cn,
} from '@groxigo/ui-elements-web';
import type { ModalPropsBase } from '@groxigo/contracts';

// ============================================
// CONTENT MODAL - Complete modal with sections
// ============================================

export interface ContentModalProps extends ModalPropsBase {
  /** Modal title displayed in header */
  title?: string;
  /** Modal subtitle displayed below title */
  subtitle?: string;
  /** Footer content - typically action buttons */
  footer?: React.ReactNode;
  /** Primary action button text */
  primaryAction?: string;
  /** Primary action handler */
  onPrimaryAction?: () => void;
  /** Primary action loading state */
  primaryLoading?: boolean;
  /** Primary action disabled state */
  primaryDisabled?: boolean;
  /** Secondary action button text */
  secondaryAction?: string;
  /** Secondary action handler (defaults to onClose) */
  onSecondaryAction?: () => void;
  /** ID for the modal element */
  id?: string;
}

export const ContentModal = forwardRef<HTMLDivElement, ContentModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      footer,
      primaryAction,
      onPrimaryAction,
      primaryLoading,
      primaryDisabled,
      secondaryAction,
      onSecondaryAction,
      children,
      className,
      testID,
      id,
      ...props
    },
    ref
  ) => {
    const hasFooter = footer || primaryAction || secondaryAction;
    const modalId = id || `content-modal-${Math.random().toString(36).slice(2, 11)}`;

    return (
      <BaseModal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        id={modalId}
        className={className}
        testID={testID}
        {...props}
      >
        {/* Header */}
        {(title || subtitle) && (
          <BaseModalHeader id={`${modalId}-title`}>
            <div className="flex flex-col gap-1">
              {title && (
                <h2 className="text-lg font-semibold text-text-primary">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-text-secondary">{subtitle}</p>
              )}
            </div>
          </BaseModalHeader>
        )}

        {/* Body */}
        <BaseModalBody>{children}</BaseModalBody>

        {/* Footer */}
        {hasFooter && (
          <BaseModalFooter>
            {footer || (
              <>
                {secondaryAction && (
                  <Button
                    variant="ghost"
                    colorScheme="primary"
                    onPress={onSecondaryAction || onClose}
                  >
                    {secondaryAction}
                  </Button>
                )}
                {primaryAction && (
                  <Button
                    variant="solid"
                    colorScheme="primary"
                    onPress={onPrimaryAction}
                    loading={primaryLoading}
                    disabled={primaryDisabled}
                  >
                    {primaryAction}
                  </Button>
                )}
              </>
            )}
          </BaseModalFooter>
        )}
      </BaseModal>
    );
  }
);

ContentModal.displayName = 'ContentModal';

// Re-export base Modal components for composition
export {
  BaseModal as Modal,
  BaseModalHeader as ModalHeader,
  BaseModalBody as ModalBody,
  BaseModalFooter as ModalFooter,
};

export default ContentModal;
