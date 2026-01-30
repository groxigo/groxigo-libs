/**
 * Modal Component
 *
 * A flexible modal/dialog component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 *
 * Accessibility features:
 * - Focus trap when trapFocus is enabled
 * - Initial focus management via initialFocusRef
 * - Focus restoration via finalFocusRef
 * - Proper ARIA roles and attributes
 */

import React, { useEffect, useMemo, useCallback, forwardRef, useRef, useId } from 'react';
import {
  View,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  findNodeHandle,
  AccessibilityInfo,
} from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
} from './Modal.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<ModalSize, { maxWidth: number; widthPercent: number }> = {
  xs: { maxWidth: 280, widthPercent: 85 },
  sm: { maxWidth: 320, widthPercent: 90 },
  md: { maxWidth: 480, widthPercent: 90 },
  lg: { maxWidth: 640, widthPercent: 95 },
  xl: { maxWidth: 800, widthPercent: 95 },
  full: { maxWidth: 9999, widthPercent: 100 },
};

// ============================================
// MODAL HEADER COMPONENT
// ============================================

export interface ModalHeaderInternalProps extends ModalHeaderProps {
  /** ID for the title element, used for aria-labelledby */
  titleId?: string;
}

export const ModalHeader: React.FC<ModalHeaderInternalProps> = ({
  children,
  showCloseButton = true,
  onClose,
  style,
  titleId,
}) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      },
      title: {
        flex: 1,
      },
      closeButton: {
        // Ensure minimum 44x44 touch target for accessibility
        minWidth: 44,
        minHeight: 44,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: theme.colors.surfaceSecondary,
        marginLeft: 12,
      },
      closeText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.textSecondary,
      },
    });
  }, [theme]);

  return (
    <View style={[styles.header, style]}>
      <View style={styles.title} nativeID={titleId}>
        {typeof children === 'string' ? (
          <Text variant="h4">{children}</Text>
        ) : (
          children
        )}
      </View>
      {showCloseButton && onClose && (
        <Pressable
          style={styles.closeButton}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
          accessibilityHint="Closes this dialog"
          hitSlop={{ top: 6, right: 6, bottom: 6, left: 6 }}
        >
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      )}
    </View>
  );
};

// ============================================
// MODAL BODY COMPONENT
// ============================================

export const ModalBody: React.FC<ModalBodyProps> = ({ children, style }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      body: {
        padding: 20,
      },
    });
  }, [theme]);

  return <View style={[styles.body, style]}>{children}</View>;
};

// ============================================
// MODAL FOOTER COMPONENT
// ============================================

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, style }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      },
    });
  }, [theme]);

  return <View style={[styles.footer, style]}>{children}</View>;
};

// ============================================
// FOCUS TRAP HOOK FOR WEB
// ============================================

/**
 * Hook to trap focus within a container (web only)
 * On native, React Native Modal handles focus automatically
 */
function useFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement | ViewType | null>,
  initialFocusRef?: React.RefObject<any>,
  finalFocusRef?: React.RefObject<any>
) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || !isActive) return;

    // Store previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current as HTMLElement | null;
    if (!container) return;

    // Focus initial element or first focusable
    const focusInitial = () => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus?.();
      } else {
        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement?.focus();
      }
    };

    // Use requestAnimationFrame to ensure modal is visible
    requestAnimationFrame(focusInitial);

    // Handle tab key for focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus on close
      const elementToRestore = finalFocusRef?.current || previousActiveElement.current;
      if (elementToRestore?.focus) {
        elementToRestore.focus();
      }
    };
  }, [isActive, containerRef, initialFocusRef, finalFocusRef]);
}

/**
 * Hook to manage focus on native platforms
 * Uses AccessibilityInfo to announce modal and manage focus
 */
function useNativeFocus(
  isActive: boolean,
  containerRef: React.RefObject<ViewType | null>,
  initialFocusRef?: React.RefObject<any>,
  title?: string
) {
  useEffect(() => {
    if (Platform.OS === 'web' || !isActive) return;

    // Announce modal to screen readers
    if (title) {
      AccessibilityInfo.announceForAccessibility(`${title} dialog opened`);
    }

    // Focus the initial element or modal container
    const focusElement = initialFocusRef?.current || containerRef.current;
    if (focusElement) {
      const reactTag = findNodeHandle(focusElement);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }

    return () => {
      // Announce close to screen readers
      if (title) {
        AccessibilityInfo.announceForAccessibility(`${title} dialog closed`);
      }
    };
  }, [isActive, containerRef, initialFocusRef, title]);
}

// ============================================
// MODAL COMPONENT
// ============================================

export const Modal = forwardRef<ViewType, ModalProps>(
  (
    {
      // New prop names (preferred)
      isOpen,
      closeOnOverlayClick,
      closeOnEsc,
      // Deprecated prop names (backward compatibility)
      visible,
      closeOnBackdrop,
      closeOnEscape,
      // New props from contract
      trapFocus = true,
      blockScroll = true,
      initialFocusRef,
      finalFocusRef,
      onOpen,
      onAnimationComplete,
      placement = 'center',
      // Existing props
      onClose,
      children,
      size = 'md',
      showCloseButton = true,
      title,
      animationType = 'fade',
      style,
      backdropStyle,
      accessibilityLabel,
      testID,
    },
    ref
  ) => {
  const theme = useTheme();
  const sizeStyles = sizeConfig[size];
  const modalContainerRef = useRef<ViewType>(null);

  // Generate unique ID for aria-labelledby
  const titleId = useId();

  // Support both new and deprecated prop names
  const modalIsOpen = isOpen ?? visible ?? false;
  const shouldCloseOnOverlay = closeOnOverlayClick ?? closeOnBackdrop ?? true;
  const shouldCloseOnEsc = closeOnEsc ?? closeOnEscape ?? true;

  // Focus trap for web
  useFocusTrap(
    modalIsOpen && trapFocus,
    modalContainerRef,
    initialFocusRef,
    finalFocusRef
  );

  // Native focus management
  useNativeFocus(
    modalIsOpen && trapFocus,
    modalContainerRef,
    initialFocusRef,
    title
  );

  // Handle escape key on web
  useEffect(() => {
    if (Platform.OS === 'web' && shouldCloseOnEsc && modalIsOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [modalIsOpen, shouldCloseOnEsc, onClose]);

  // Call onOpen when modal opens
  useEffect(() => {
    if (modalIsOpen && onOpen) {
      onOpen();
    }
  }, [modalIsOpen, onOpen]);

  const handleBackdropPress = useCallback(() => {
    if (shouldCloseOnOverlay) {
      onClose();
    }
  }, [shouldCloseOnOverlay, onClose]);

  // Combine refs
  const setRefs = useCallback((node: ViewType | null) => {
    modalContainerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: size === 'full' ? 0 : 20,
      },
      modalContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: size === 'full' ? 0 : theme.radius.lg,
        maxWidth: sizeStyles.maxWidth,
        width: `${sizeStyles.widthPercent}%` as unknown as number,
        maxHeight: size === 'full' ? '100%' : '90%',
        ...theme.shadows.xl,
        overflow: 'hidden',
      },
      content: {
        flex: size === 'full' ? 1 : undefined,
      },
    });
  }, [theme, size, sizeStyles]);

  return (
    <RNModal
      visible={modalIsOpen}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={[styles.backdrop, backdropStyle]}
        onPress={handleBackdropPress}
        accessibilityRole="none"
        importantForAccessibility="no"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: `${sizeStyles.widthPercent}%` as unknown as number, maxWidth: sizeStyles.maxWidth }}
        >
          <Pressable
            ref={setRefs}
            style={[styles.modalContainer, style]}
            onPress={(e) => e.stopPropagation()}
            accessibilityRole="none"
            accessibilityLabel={accessibilityLabel || title || 'Modal dialog'}
            accessibilityViewIsModal={true}
            aria-modal={true}
            aria-labelledby={title ? titleId : undefined}
            testID={testID}
          >
            {title && (
              <ModalHeader
                showCloseButton={showCloseButton}
                onClose={onClose}
                titleId={titleId}
              >
                {title}
              </ModalHeader>
            )}
            <ScrollView
              style={styles.content}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </RNModal>
  );
  }
);

Modal.displayName = 'Modal';

export default Modal;
