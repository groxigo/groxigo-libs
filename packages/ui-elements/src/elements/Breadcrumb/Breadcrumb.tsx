/**
 * Breadcrumb Component
 *
 * A navigation path indicator that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { BreadcrumbProps, BreadcrumbSize, BreadcrumbColorScheme } from './Breadcrumb.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<BreadcrumbSize, {
  fontSize: number;
  iconSize: number;
  gap: number;
  separatorGap: number;
}> = {
  sm: { fontSize: 12, iconSize: 14, gap: 4, separatorGap: 6 },
  md: { fontSize: 14, iconSize: 16, gap: 6, separatorGap: 8 },
  lg: { fontSize: 16, iconSize: 18, gap: 8, separatorGap: 10 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: BreadcrumbColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<BreadcrumbColorScheme, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    neutral: colors.text,
  };

  return colorMap[colorScheme];
}

// ============================================
// BREADCRUMB COMPONENT
// ============================================

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  size = 'md',
  colorScheme = 'primary',
  showHomeIcon = false,
  maxItems,
  style,
  ...props
}) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const linkColor = getColorSchemeColor(theme, colorScheme);

  // Handle collapsing of items if maxItems is set
  const displayItems = useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Show first item, ellipsis, and last (maxItems - 2) items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));

    return [
      firstItem,
      { label: '...', isCollapsed: true } as any,
      ...lastItems,
    ];
  }, [items, maxItems]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: config.gap,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      separator: {
        marginHorizontal: config.separatorGap,
      },
      separatorText: {
        fontSize: config.fontSize,
        color: theme.colors.textMuted,
        fontFamily: theme.typography.fontFamily.sans,
      },
      link: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: config.gap,
        ...Platform.select({
          web: {
            cursor: 'pointer',
          } as any,
        }),
      },
      linkText: {
        fontSize: config.fontSize,
        color: linkColor,
        fontFamily: theme.typography.fontFamily.sans,
      },
      currentText: {
        fontSize: config.fontSize,
        color: theme.colors.text,
        fontWeight: '600',
        fontFamily: theme.typography.fontFamily.sans,
      },
      collapsedText: {
        fontSize: config.fontSize,
        color: theme.colors.textMuted,
        fontFamily: theme.typography.fontFamily.sans,
      },
      homeIcon: {
        width: config.iconSize,
        height: config.iconSize,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }, [theme, config, linkColor]);

  const renderSeparator = () => {
    if (typeof separator === 'string') {
      return (
        <View style={styles.separator}>
          <Text style={styles.separatorText}>{separator}</Text>
        </View>
      );
    }
    return <View style={styles.separator}>{separator}</View>;
  };

  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityLabel="Breadcrumb navigation"
      {...props}
    >
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;
        const isCollapsed = (item as any).isCollapsed;

        return (
          <View key={index} style={styles.itemContainer}>
            {index > 0 && renderSeparator()}

            {isCollapsed ? (
              <Text style={styles.collapsedText}>{item.label}</Text>
            ) : isLast ? (
              <View style={styles.link}>
                {item.icon}
                <Text style={styles.currentText} accessibilityRole="text">
                  {item.label}
                </Text>
              </View>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.link,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={item.onPress}
                accessibilityRole="link"
                accessibilityLabel={`Navigate to ${item.label}`}
              >
                {item.icon}
                <Text style={styles.linkText}>{item.label}</Text>
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Breadcrumb;
