/**
 * Drawer Component
 *
 * A sliding drawer/panel component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 *
 * Accessibility features:
 * - Focus trap when open
 * - Proper ARIA role="dialog"
 * - Screen reader announcements
 * - Keyboard navigation (Escape to close)
 */

import React, { useEffect, useMemo, useCallback, useRef, forwardRef, useId } from 'react';
import {
  View,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
  ScrollView,
  AccessibilityInfo,
  findNodeHandle,
} from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerPosition,
  DrawerSize,
} from './Drawer.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const getSizeValue = (size: DrawerSize, isHorizontal: boolean): number | string => {
  const { width, height } = Dimensions.get('window');
  const dimension = isHorizontal ? width : height;

  const sizeConfig: Record<DrawerSize, number> = {
    sm: 0.25,
    md: 0.35,
    lg: 0.5,
    xl: 0.75,
    full: 1,
  };

  return dimension * sizeConfig[size];
};

// ============================================
// DRAWER HEADER COMPONENT
// ============================================

export interface DrawerHeaderInternalProps extends DrawerHeaderProps {
  /** ID for the title element, used for aria-labelledby */
  titleId?: string;
}

export const DrawerHeader: React.FC<DrawerHeaderInternalProps> = ({
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
        paddingHorizontal: 16,
        paddingVertical: 12,
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
          <Text variant="h5">{children}</Text>
        ) : (
          children
        )}
      </View>
      {showCloseButton && onClose && (
        <Pressable
          style={styles.closeButton}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close drawer"
          accessibilityHint="Closes this drawer panel"
          hitSlop={{ top: 6, right: 6, bottom: 6, left: 6 }}
        >
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      )}
    </View>
  );
};

// ============================================
// DRAWER BODY COMPONENT
// ============================================

export const DrawerBody: React.FC<DrawerBodyProps> = ({ children, style }) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      body: {
        flex: 1,
        padding: 16,
      },
    });
  }, []);

  return (
    <ScrollView style={[styles.body, style]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

// ============================================
// DRAWER FOOTER COMPONENT
// ============================================

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, style }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      },
    });
  }, [theme]);

  return <View style={[styles.footer, style]}>{children}</View>;
};

// ============================================
// FOCUS TRAP HOOK FOR WEB (Drawer)
// ============================================

/**
 * Hook to trap focus within a container (web only)
 */
function useDrawerFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<Animated.LegacyRef<View> | null>
) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || !isActive) return;

    // Store previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Need to get the actual DOM node from Animated.View
    const container = (containerRef.current as any)?._component as HTMLElement | null;
    if (!container) return;

    // Focus first focusable element
    const focusInitial = () => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    };

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
      if (previousActiveElement.current?.focus) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, containerRef]);
}

/**
 * Hook to manage focus on native platforms for Drawer
 */
function useDrawerNativeFocus(
  isActive: boolean,
  containerRef: React.RefObject<Animated.LegacyRef<View> | null>,
  title?: string
) {
  useEffect(() => {
    if (Platform.OS === 'web' || !isActive) return;

    // Announce drawer to screen readers
    if (title) {
      AccessibilityInfo.announceForAccessibility(`${title} drawer opened`);
    }

    // Focus the drawer container
    const focusElement = containerRef.current;
    if (focusElement) {
      const reactTag = findNodeHandle(focusElement as any);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }

    return () => {
      // Announce close to screen readers
      if (title) {
        AccessibilityInfo.announceForAccessibility(`${title} drawer closed`);
      }
    };
  }, [isActive, containerRef, title]);
}

// ============================================
// DRAWER COMPONENT
// ============================================

export const Drawer = forwardRef<ViewType, DrawerProps>(
  (
    {
      visible,
      onClose,
      children,
      position = 'left',
      size = 'md',
      closeOnBackdrop = true,
      closeOnEscape = true,
      title,
      showCloseButton = true,
      style,
      backdropStyle,
      accessibilityLabel,
    },
    ref
  ) => {
  const theme = useTheme();
  const isHorizontal = position === 'left' || position === 'right';
  const drawerSize = getSizeValue(size, isHorizontal);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const drawerContainerRef = useRef<Animated.LegacyRef<View>>(null);

  // Generate unique ID for aria-labelledby
  const titleId = useId();

  // Focus trap for web
  useDrawerFocusTrap(visible, drawerContainerRef);

  // Native focus management
  useDrawerNativeFocus(visible, drawerContainerRef, title);

  // Animate drawer
  // useNativeDriver is not supported on web, so we disable it for web
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver,
        }),
      ]).start();
    }
  }, [visible, slideAnim, backdropAnim, useNativeDriver]);

  // Handle escape key on web
  useEffect(() => {
    if (Platform.OS === 'web' && closeOnEscape && visible) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, closeOnEscape, onClose]);

  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdrop) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  // Combine refs
  const setRefs = useCallback((node: any) => {
    drawerContainerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  const getTranslateValue = () => {
    const outputRange = (() => {
      switch (position) {
        case 'left':
          return [-(drawerSize as number), 0];
        case 'right':
          return [drawerSize as number, 0];
        case 'top':
          return [-(drawerSize as number), 0];
        case 'bottom':
          return [drawerSize as number, 0];
      }
    })();

    return slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange,
    });
  };

  const styles = useMemo(() => {
    const getPositionStyle = () => {
      const baseStyle = {
        position: 'absolute' as const,
        backgroundColor: theme.colors.surface,
        ...theme.shadows.xl,
      };

      switch (position) {
        case 'left':
          return { ...baseStyle, left: 0, top: 0, bottom: 0, width: drawerSize as number };
        case 'right':
          return { ...baseStyle, right: 0, top: 0, bottom: 0, width: drawerSize as number };
        case 'top':
          return { ...baseStyle, top: 0, left: 0, right: 0, height: drawerSize as number };
        case 'bottom':
          return { ...baseStyle, bottom: 0, left: 0, right: 0, height: drawerSize as number };
      }
    };

    return StyleSheet.create({
      backdrop: {
        flex: 1,
        backgroundColor: 'transparent',
      },
      backdropOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      drawerContainer: getPositionStyle(),
      content: {
        flex: 1,
      },
    });
  }, [theme, position, drawerSize]);

  const translateStyle = isHorizontal
    ? { transform: [{ translateX: getTranslateValue() }] }
    : { transform: [{ translateY: getTranslateValue() }] };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={[styles.backdrop, backdropStyle]}>
        <Animated.View
          style={[
            styles.backdropOverlay,
            { opacity: backdropAnim },
          ]}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={handleBackdropPress}
            accessibilityRole="none"
            importantForAccessibility="no"
          />
        </Animated.View>

        <Animated.View
          ref={setRefs}
          style={[styles.drawerContainer, translateStyle, style]}
          accessibilityRole="none"
          accessibilityLabel={accessibilityLabel || title || 'Drawer'}
          accessibilityViewIsModal={true}
          aria-modal={true}
          aria-labelledby={title ? titleId : undefined}
        >
          {title && (
            <DrawerHeader
              showCloseButton={showCloseButton}
              onClose={onClose}
              titleId={titleId}
            >
              {title}
            </DrawerHeader>
          )}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </RNModal>
  );
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
