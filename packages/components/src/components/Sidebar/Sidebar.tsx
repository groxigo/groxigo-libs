import { Modal, Pressable, View, Animated, StyleSheet, Platform } from 'react-native';
import { Text, Icon, Badge, useTheme } from '@groxigo/ui-elements';
import { useEffect, useRef } from 'react';
import type { SidebarProps } from './Sidebar.types';

/**
 * Sidebar component
 *
 * Side navigation drawer.
 * Uses theme colors for consistent styling across platforms.
 */
export const Sidebar = ({
  items,
  selectedId,
  open,
  onClose,
  width = 280,
  style,
  ...props
}: SidebarProps) => {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(-width)).current;

  // useNativeDriver is not supported on web
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: open ? 0 : -width,
      duration: 300,
      useNativeDriver,
    }).start();
  }, [open, width, slideAnim, useNativeDriver]);

  if (!open) return null;

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onClose}
      {...props}
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: theme.colors.overlay }]}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.sidebar,
            {
              width,
              backgroundColor: theme.colors.surface,
              transform: [{ translateX: slideAnim }],
            },
            style,
          ]}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              style={{
                padding: theme.spacing[4],
                gap: theme.spacing[2],
              }}
            >
              {items.map((item) => {
                const isSelected = selectedId === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      item.onPress?.();
                      onClose();
                    }}
                    style={({ pressed }) => [
                      styles.menuItem,
                      {
                        padding: theme.spacing[3],
                        borderRadius: theme.radius.md,
                        backgroundColor: isSelected
                          ? theme.colors.primary + '20'
                          : 'transparent',
                        gap: theme.spacing[3],
                      },
                      pressed && { opacity: 0.8 },
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={item.label}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon as any}
                        size="md"
                        style={{
                          color: isSelected
                            ? theme.colors.primary
                            : theme.colors.textSecondary,
                        }}
                      />
                    )}
                    <Text
                      variant="body"
                      style={{
                        flex: 1,
                        color: isSelected
                          ? theme.colors.primary
                          : theme.colors.text,
                        fontWeight: isSelected ? '600' : '400',
                      }}
                    >
                      {item.label}
                    </Text>
                    {item.badge && (
                      <Badge variant="solid" size="sm">
                        {String(item.badge)}
                      </Badge>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

Sidebar.displayName = 'Sidebar';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Sidebar;
