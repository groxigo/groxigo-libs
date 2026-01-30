/**
 * Toast Component
 *
 * A notification toast component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useEffect, useMemo, forwardRef } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { ToastProps, ToastVariant, ToastPosition } from './Toast.types';

// ============================================
// VARIANT HELPERS
// ============================================

function getVariantStyles(theme: Theme, variant: ToastVariant) {
  const colors = theme.colors;

  const variantMap: Record<ToastVariant, { background: string; text: string; border: string }> = {
    success: {
      background: colors.successSubtle,
      text: colors.success,
      border: colors.success,
    },
    error: {
      background: colors.errorSubtle,
      text: colors.error,
      border: colors.error,
    },
    warning: {
      background: colors.warningSubtle,
      text: colors.warning,
      border: colors.warning,
    },
    info: {
      background: colors.infoSubtle,
      text: colors.info,
      border: colors.info,
    },
  };

  return variantMap[variant];
}

function getPositionStyles(position: ToastPosition) {
  const positions: Record<ToastPosition, object> = {
    top: { top: 20, left: 20, right: 20 },
    bottom: { bottom: 20, left: 20, right: 20 },
    'top-left': { top: 20, left: 20 },
    'top-right': { top: 20, right: 20 },
    'bottom-left': { bottom: 20, left: 20 },
    'bottom-right': { bottom: 20, right: 20 },
  };

  return positions[position];
}

// ============================================
// TOAST COMPONENT
// ============================================

export const Toast = forwardRef<ViewType, ToastProps>(
  (
    {
      message,
      title,
      variant = 'info',
      duration = 3000,
      position = 'bottom',
      showCloseButton = false,
      icon,
      actionLabel,
      onAction,
      onDismiss,
      style,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const variantStyles = getVariantStyles(theme, variant);
  const positionStyles = getPositionStyles(position);

  // Auto-dismiss timer
  useEffect(() => {
    if (duration > 0 && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        position: 'absolute',
        zIndex: theme.zIndex.toast,
        ...positionStyles,
        ...Platform.select({
          web: {
            pointerEvents: 'auto',
          } as any,
        }),
      },
      toast: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: variantStyles.background,
        borderLeftWidth: 4,
        borderLeftColor: variantStyles.border,
        borderRadius: 8,
        padding: 12,
        gap: 12,
        ...theme.shadows.lg,
        ...Platform.select({
          web: {
            maxWidth: 400,
          } as any,
        }),
      },
      iconContainer: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        flex: 1,
      },
      title: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: '600',
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        marginBottom: 2,
      },
      message: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
      },
      actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
      },
      actionButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        backgroundColor: variantStyles.border,
      },
      actionText: {
        fontSize: theme.typography.fontSize.xs,
        fontWeight: '600',
        color: theme.colors.textInverse,
        fontFamily: theme.typography.fontFamily.sans,
      },
      closeButton: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: theme.colors.surfaceSecondary,
      },
      closeText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textSecondary,
      },
    });
  }, [theme, variantStyles, positionStyles]);

  return (
    <View
      ref={ref}
      style={[styles.container, style]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={title ? `${title}: ${message}` : message}
      {...props}
    >
      <View style={styles.toast}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.message}>{message}</Text>

          {actionLabel && onAction && (
            <View style={styles.actions}>
              <Pressable
                style={styles.actionButton}
                onPress={onAction}
                accessibilityRole="button"
                accessibilityLabel={actionLabel}
              >
                <Text style={styles.actionText}>{actionLabel}</Text>
              </Pressable>
            </View>
          )}
        </View>

        {showCloseButton && onDismiss && (
          <Pressable
            style={styles.closeButton}
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss notification"
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
  }
);

Toast.displayName = 'Toast';

export default Toast;
