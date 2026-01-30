/**
 * Tabs Component
 *
 * A tab navigation component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import { Badge } from '../Badge';
import type { Theme } from '../../theme/types';
import type { TabsProps, TabPanelProps, TabsSize, TabsVariant, TabsColorScheme } from './Tabs.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<TabsSize, {
  height: number;
  paddingH: number;
  fontSize: number;
  gap: number;
}> = {
  sm: { height: 36, paddingH: 12, fontSize: 13, gap: 6 },
  md: { height: 44, paddingH: 16, fontSize: 14, gap: 8 },
  lg: { height: 52, paddingH: 20, fontSize: 16, gap: 10 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: TabsColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<TabsColorScheme, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    gray: colors.text,
  };

  return colorMap[colorScheme];
}

// ============================================
// TABS COMPONENT
// ============================================

export const Tabs = forwardRef<ViewType, TabsProps>(
  (
    {
      items,
      // New prop names (preferred)
      value,
      onChange,
      // Deprecated prop names (backward compatibility)
      selectedId,
      onSelect,
      // Other props
      size = 'md',
      variant = 'line',
      colorScheme = 'primary',
      fullWidth = false,
      isFitted,
      style,
      testID,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const primaryColor = getColorSchemeColor(theme, colorScheme);

  // Support both new and deprecated prop names
  const activeValue = value ?? selectedId;
  const handleChange = onChange ?? onSelect;
  const shouldFit = isFitted ?? fullWidth;

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        ...((variant === 'underline' || variant === 'line') && {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }),
        ...(variant === 'enclosed' && {
          backgroundColor: theme.colors.surfaceSecondary,
          borderRadius: 8,
          padding: 4,
        }),
      },
      tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: config.height,
        paddingHorizontal: config.paddingH,
        gap: config.gap,
        ...(shouldFit && { flex: 1 }),
        ...Platform.select({
          web: {
            cursor: 'pointer',
            userSelect: 'none',
          } as any,
        }),
      },
      tabDefault: {
        // Default variant has no extra styles
      },
      tabPills: {
        borderRadius: config.height / 2,
      },
      tabUnderline: {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginBottom: -1,
      },
      tabEnclosed: {
        borderRadius: 6,
      },
      tabActive: {
        // Active state handled in render
      },
      tabText: {
        fontSize: config.fontSize,
        fontWeight: '500',
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
      },
      tabTextActive: {
        fontWeight: '600',
      },
      badge: {
        marginLeft: 4,
      },
    });
  }, [theme, config, variant, shouldFit, primaryColor]);

  const getTabStyles = (isSelected: boolean, isDisabled: boolean) => {
    const tabStyles: any[] = [styles.tab];

    // Add variant styles
    if (variant === 'pills' || variant === 'soft-rounded') {
      tabStyles.push(styles.tabPills);
      if (isSelected) {
        tabStyles.push({ backgroundColor: `${primaryColor}15` });
      }
    } else if (variant === 'solid-rounded') {
      tabStyles.push(styles.tabPills);
      if (isSelected) {
        tabStyles.push({ backgroundColor: primaryColor });
      }
    } else if (variant === 'underline' || variant === 'line') {
      tabStyles.push(styles.tabUnderline);
      if (isSelected) {
        tabStyles.push({ borderBottomColor: primaryColor });
      }
    } else if (variant === 'enclosed') {
      tabStyles.push(styles.tabEnclosed);
      if (isSelected) {
        tabStyles.push({
          backgroundColor: theme.colors.surface,
          ...theme.shadows.sm,
        });
      }
    }

    if (isDisabled) {
      tabStyles.push({ opacity: 0.5 });
    }

    return tabStyles;
  };

  return (
    <View
      ref={ref}
      style={[styles.container, style]}
      accessibilityRole="tablist"
      {...props}
    >
      {items.map((item) => {
        // Support both 'key' (new) and 'id' (deprecated) for item identification
        const itemKey = item.key ?? item.id ?? '';
        const isSelected = activeValue === itemKey;
        const isDisabled = !!item.disabled;

        return (
          <Pressable
            key={itemKey}
            onPress={() => !isDisabled && handleChange?.(itemKey)}
            disabled={isDisabled}
            style={({ pressed }) => [
              ...getTabStyles(isSelected, isDisabled),
              pressed && !isDisabled && { opacity: 0.8 },
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected, disabled: isDisabled }}
          >
            {item.icon}
            <Text
              style={[
                styles.tabText,
                isSelected && [
                  styles.tabTextActive,
                  { color: variant === 'solid-rounded' && isSelected ? theme.colors.textInverse : primaryColor },
                ],
              ]}
            >
              {item.label}
            </Text>
            {item.badge !== undefined && (
              <Badge
                size="xs"
                colorScheme={isSelected ? (colorScheme === 'gray' ? 'neutral' : colorScheme) : 'neutral'}
                style={styles.badge}
              >
                {String(item.badge)}
              </Badge>
            )}
          </Pressable>
        );
      })}
    </View>
  );
  }
);

Tabs.displayName = 'Tabs';

// ============================================
// TAB PANEL COMPONENT
// ============================================

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  isActive = true,
  style,
}) => {
  if (!isActive) return null;

  return (
    <View
      style={style}
      accessible
      accessibilityLabel="Tab panel"
    >
      {children}
    </View>
  );
};

export default Tabs;
