/**
 * Menu Component
 *
 * A dropdown menu component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useEffect, useMemo, useCallback, useRef, useState } from 'react';
import {
  View,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import { Divider } from '../Divider';
import type {
  MenuProps,
  MenuItemProps,
  MenuTriggerProps,
  MenuItemData,
  MenuDividerData,
} from './Menu.types';

// ============================================
// MENU ITEM COMPONENT
// ============================================

export const MenuItem: React.FC<MenuItemProps> = ({ item, onPress, style }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const styles = useMemo(() => {
    const textColor = item.destructive
      ? theme.colors.error
      : item.disabled
      ? theme.colors.textTertiary
      : theme.colors.text;

    return StyleSheet.create({
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: isHovered && !item.disabled
          ? theme.colors.surfaceSecondary
          : 'transparent',
      },
      icon: {
        width: 20,
        marginRight: 10,
        alignItems: 'center',
      },
      label: {
        flex: 1,
        color: textColor,
      },
    });
  }, [theme, item.destructive, item.disabled, isHovered]);

  const handlePress = useCallback(() => {
    if (!item.disabled) {
      onPress();
    }
  }, [item.disabled, onPress]);

  const webHoverProps = Platform.OS === 'web'
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  return (
    <Pressable
      style={[styles.item, style]}
      onPress={handlePress}
      disabled={item.disabled}
      accessibilityRole="menuitem"
      accessibilityLabel={item.label}
      accessibilityState={{ disabled: item.disabled }}
      {...webHoverProps}
    >
      {item.icon && (
        <View style={styles.icon}>
          <Text style={{ color: styles.label.color }}>{item.icon}</Text>
        </View>
      )}
      <Text
        variant="body"
        style={styles.label}
      >
        {item.label}
      </Text>
    </Pressable>
  );
};

// ============================================
// MENU TRIGGER COMPONENT
// ============================================

export const MenuTrigger: React.FC<MenuTriggerProps> = ({
  children,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={style}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Open menu"
    >
      {children}
    </Pressable>
  );
};

// ============================================
// MENU COMPONENT
// ============================================

export const Menu: React.FC<MenuProps> = ({
  visible,
  onClose,
  items,
  trigger,
  anchor = 'bottom-start',
  style,
  closeOnBackdrop = true,
  closeOnEscape = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);

  // Animate menu
  // useNativeDriver is not supported on web
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim, useNativeDriver]);

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

  const handleItemPress = useCallback(
    (item: MenuItemData) => {
      item.onPress?.();
      onClose();
    },
    [onClose]
  );

  const handleTriggerLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setTriggerLayout({ x, y, width, height });
  }, []);

  const isMenuDivider = (item: MenuItemData | MenuDividerData): item is MenuDividerData => {
    return 'type' in item && item.type === 'divider';
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        position: 'relative',
      },
      backdrop: {
        flex: 1,
        backgroundColor: 'transparent',
      },
      menuContainer: {
        position: 'absolute' as const,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        minWidth: 180,
        maxWidth: 280,
        ...theme.shadows.lg,
        overflow: 'hidden' as const,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      menuContent: {
        paddingVertical: 4,
      },
    });
  }, [theme]);

  // Calculate menu position based on anchor
  const getMenuPosition = useMemo(() => {
    const positions: Record<string, object> = {
      'top-start': { bottom: triggerLayout.height + 4, left: 0 },
      'top-end': { bottom: triggerLayout.height + 4, right: 0 },
      'bottom-start': { top: triggerLayout.height + 4, left: 0 },
      'bottom-end': { top: triggerLayout.height + 4, right: 0 },
    };
    return positions[anchor] || positions['bottom-start'];
  }, [anchor, triggerLayout]);

  const transformOrigin = useMemo(() => {
    if (Platform.OS !== 'web') return {};
    const origins: Record<string, string> = {
      'top-start': 'bottom left',
      'top-end': 'bottom right',
      'bottom-start': 'top left',
      'bottom-end': 'top right',
    };
    return { transformOrigin: origins[anchor] || 'top left' };
  }, [anchor]);

  return (
    <View style={styles.container}>
      {trigger && (
        <View ref={triggerRef} onLayout={handleTriggerLayout}>
          {trigger}
        </View>
      )}

      {visible && (
        <RNModal
          visible={visible}
          transparent
          animationType="none"
          onRequestClose={onClose}
          statusBarTranslucent
        >
          <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
            <View style={{ flex: 1 }} />
          </Pressable>

          <Animated.View
            style={[
              styles.menuContainer,
              getMenuPosition,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                ...(transformOrigin as object),
              },
              style,
            ]}
            accessibilityRole="menu"
            accessibilityLabel={accessibilityLabel || 'Menu'}
          >
            <View style={styles.menuContent}>
              {items.map((item, index) => {
                if (isMenuDivider(item)) {
                  return <Divider key={`divider-${index}`} spacing={4} />;
                }
                return (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onPress={() => handleItemPress(item)}
                  />
                );
              })}
            </View>
          </Animated.View>
        </RNModal>
      )}
    </View>
  );
};

export default Menu;
