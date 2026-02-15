import { View, Pressable, Platform, StyleSheet } from 'react-native';
import { Text, Icon, Badge, useTheme } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/react-native';
import { useDeviceType } from '@groxigo/ui-core';
import type { BottomNavProps } from './BottomNav.types';

// Dynamic import for expo-blur (optional peer dependency)
let BlurView: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  BlurView = require('expo-blur').BlurView;
} catch {
  // expo-blur not available, will use fallback
}

/**
 * BottomNav component
 *
 * Bottom navigation bar for mobile.
 * Supports two variants:
 * - 'default': Standard bottom nav with solid background
 * - 'floating': Floating pill with glass/blur effect
 *
 * Uses theme colors for consistent styling across platforms.
 */
export const BottomNav = ({
  items,
  selectedId,
  onSelect,
  section,
  variant = 'default',
  activeIndicator = 'highlight',
  activeColor,
  inactiveColor,
  highlightColor,
  backgroundColor,
  testID,
  style,
  ...props
}: BottomNavProps) => {
  const theme = useTheme();
  const { uiSize, fontSize } = useDeviceType();

  // Use theme colors by default - app can override via props
  const colors = {
    active: activeColor || theme.colors.primary,
    inactive: inactiveColor || theme.colors.textTertiary,
    highlight: highlightColor || theme.colors.primarySubtle,
  };

  if (variant === 'floating') {
    // Responsive sizes for floating variant
    const floatingIconWrapperSize = { width: uiSize(40), height: uiSize(26) };
    const floatingBorderRadius = uiSize(28);
    const floatingIconSize = uiSize(16); // sm = 16px, now responsive

    return (
      <View
        style={[
          styles.floatingContainer,
          { paddingHorizontal: uiSize(24) },
          style,
        ]}
        testID={testID}
        {...props}
      >
        <View style={[styles.floatingWrapper, { borderRadius: floatingBorderRadius }]}>
          {BlurView ? (
            <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFill} />
          ) : (
            <View style={styles.floatingFallback} />
          )}
          <View
            style={[
              styles.floatingGlassOverlay,
              backgroundColor && { backgroundColor },
            ]}
          />
          <View
            style={[
              styles.floatingContent,
              {
                paddingVertical: uiSize(4),
                paddingHorizontal: uiSize(12),
              },
            ]}
          >
            {items.map((item) => {
              const isSelected = selectedId === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => onSelect?.(item.id)}
                  style={({ pressed }) => [
                    styles.floatingNavItem,
                    {
                      paddingHorizontal: uiSize(14),
                      paddingVertical: uiSize(2),
                    },
                    pressed && { opacity: 0.8 },
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={item.label}
                >
                  <View style={[styles.floatingIconWrapper, floatingIconWrapperSize]}>
                    {isSelected && activeIndicator === 'highlight' && (
                      <View
                        style={[
                          styles.activeHighlight,
                          {
                            ...floatingIconWrapperSize,
                            borderRadius: uiSize(13),
                            backgroundColor: colors.highlight,
                          },
                        ]}
                      />
                    )}
                    <Icon
                      name={item.icon as any}
                      size={floatingIconSize}
                      style={{ color: isSelected ? colors.active : colors.inactive }}
                    />
                    {item.badge && (
                      <View style={[styles.floatingBadge, { top: uiSize(-6), right: uiSize(-6) }]}>
                        <Badge variant="solid" colorScheme="error" size="sm">
                          {String(item.badge)}
                        </Badge>
                      </View>
                    )}
                  </View>
                  <Text
                    variant="caption"
                    style={[
                      styles.floatingLabel,
                      {
                        fontSize: fontSize(10),
                        marginTop: uiSize(-1),
                        color: isSelected ? colors.active : colors.inactive,
                        fontWeight: isSelected ? '600' : '500',
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  // Default variant
  const defaultIconSize = uiSize(20); // md = 20px, now responsive

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingBottom: Platform.OS === 'ios' ? uiSize(8) : uiSize(12),
          paddingTop: uiSize(8),
          ...Platform.select({
            web: {
              boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
            } as any,
            ios: {
              shadowColor: tokens.colors.primitives.black,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {items.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect?.(item.id)}
            style={({ pressed }) => [
              styles.navItem,
              {
                gap: uiSize(4),
                paddingVertical: uiSize(4),
              },
              pressed && { opacity: 0.8 },
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={item.label}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={item.icon as any}
                size={defaultIconSize}
                style={{ color: isSelected ? colors.active : colors.inactive }}
              />
              {item.badge && (
                <View style={[styles.badge, { top: uiSize(-4), right: uiSize(-4) }]}>
                  <Badge variant="solid" colorScheme="error" size="sm">
                    {String(item.badge)}
                  </Badge>
                </View>
              )}
            </View>
            <Text
              variant="caption"
              style={{
                color: isSelected ? colors.active : colors.inactive,
                fontWeight: isSelected ? '600' : '400',
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

BottomNav.displayName = 'BottomNav';

const styles = StyleSheet.create({
  // Default variant styles
  container: {
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
  },

  // Floating variant styles
  floatingContainer: {
    alignItems: 'center',
  },
  floatingWrapper: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(20px)',
      } as any,
      ios: {
        shadowColor: tokens.colors.primitives.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  floatingGlassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  floatingFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  floatingContent: {
    flexDirection: 'row',
  },
  floatingNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeHighlight: {
    position: 'absolute',
  },
  floatingBadge: {
    position: 'absolute',
  },
  floatingLabel: {},
});

export default BottomNav;
