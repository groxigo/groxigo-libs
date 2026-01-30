import { View, Platform, useWindowDimensions, StyleSheet } from 'react-native';
import { useTheme } from '@groxigo/ui-elements';
import type { ResponsiveGridProps } from './ResponsiveGrid.types';

/**
 * Custom breakpoint system
 * Mobile (Portrait): 320px – 480px
 * Mobile (Landscape): 481px – 767px
 * Tablet (Portrait): 768px – 1023px
 * Tablet (Landscape): 1024px – 1279px
 * Laptop / Desktop: 1280px – 1440px
 */
type CustomBreakpoint = 'mobile-portrait' | 'mobile-landscape' | 'tablet-portrait' | 'tablet-landscape' | 'laptop-desktop';

const getCustomBreakpoint = (width: number): CustomBreakpoint => {
  if (width >= 1280) return 'laptop-desktop';
  if (width >= 1024) return 'tablet-landscape';
  if (width >= 768) return 'tablet-portrait';
  if (width >= 481) return 'mobile-landscape';
  return 'mobile-portrait';
};

/**
 * ResponsiveGrid component
 *
 * A flexible grid layout that adapts to screen size, calculates optimal cards per row,
 * and ensures cards always fill the available space with no side gaps.
 * Uses theme spacing for consistent layout across platforms.
 */
export const ResponsiveGrid = ({
  children,
  columns,
  minInRow,
  maxInRow,
  gap,
  align = 'center',
  style,
}: ResponsiveGridProps) => {
  const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const breakpoint = getCustomBreakpoint(screenWidth);

  // Use theme spacing for gap, default to spacing[4] (16px)
  const gapValue = gap ?? theme.spacing[4];

  const defaultColumns: Record<CustomBreakpoint, number> = {
    'mobile-portrait': 1,
    'mobile-landscape': 2,
    'tablet-portrait': 4,
    'tablet-landscape': 4,
    'laptop-desktop': 4,
  };

  const getColumnsForBreakpoint = (): number => {
    if (columns) {
      if (breakpoint === 'mobile-portrait' || breakpoint === 'mobile-landscape') {
        if (columns.mobile !== undefined) return columns.mobile;
      }
      if (breakpoint === 'tablet-portrait' || breakpoint === 'tablet-landscape') {
        if (columns.tablet !== undefined) return columns.tablet;
      }
      if (breakpoint === 'laptop-desktop') {
        if (columns.desktop !== undefined) return columns.desktop;
      }
    }
    return defaultColumns[breakpoint];
  };

  let cardsPerRow = getColumnsForBreakpoint();

  if (minInRow !== undefined && cardsPerRow < minInRow) {
    cardsPerRow = minInRow;
  }
  if (maxInRow !== undefined && cardsPerRow > maxInRow) {
    cardsPerRow = maxInRow;
  }

  const cardWidthStyle = Platform.OS === 'web'
    ? `calc((100% - ${gapValue * (cardsPerRow - 1)}px) / ${cardsPerRow})`
    : (() => {
        const estimatedContainerWidth = screenWidth * 0.8 - 32;
        const gapPercent = estimatedContainerWidth > 0 ? (gapValue / estimatedContainerWidth) * 100 : 0;
        const totalGapPercent = gapPercent * (cardsPerRow - 1);
        const cardWidthPercent = (100 - totalGapPercent) / cardsPerRow;
        return `${cardWidthPercent}%`;
      })();

  const containerStyle = StyleSheet.create({
    base: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: gapValue,
    },
  });

  const cardWrapperStyle = {
    width: cardWidthStyle as any,
    maxWidth: cardWidthStyle as any,
    minWidth: 0,
    flexShrink: 1,
    flexBasis: cardWidthStyle as any,
    overflow: 'hidden' as const,
    alignSelf: 'flex-start' as const,
  };

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <View style={[containerStyle.base, style]}>
      {childrenArray.map((child, index) => (
        <View
          key={index}
          style={cardWrapperStyle}
          collapsable={false}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

export default ResponsiveGrid;
