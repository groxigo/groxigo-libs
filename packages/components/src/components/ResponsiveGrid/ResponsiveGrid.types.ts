import { ViewStyle } from 'react-native';

export interface ResponsiveGridProps {
  /**
   * Child components to render in the grid
   */
  children: React.ReactNode;

  /**
   * Number of columns per breakpoint (overrides default calculations)
   */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };

  /**
   * Minimum cards per row (default: 2 for mobile, 3 for tablet, 4 for desktop)
   */
  minInRow?: number;

  /**
   * Maximum cards per row (default: 2 for mobile, 3 for tablet, 4 for desktop)
   */
  maxInRow?: number;

  /**
   * Spacing between cards (default: tokens.spacing[4] = 16px)
   */
  gap?: number;

  /**
   * Minimum card width in pixels (optional)
   */
  minCardWidth?: number;

  /**
   * Minimum grid container width in pixels (default: screen width)
   */
  minGridWidth?: number;

  /**
   * Maximum grid container width in pixels (optional, no limit by default)
   */
  maxGridWidth?: number;

  /**
   * Enable horizontal scrolling on small screens
   * Default: true on mobile/tablet, false on desktop
   */
  scrollable?: boolean;

  /**
   * Alignment when cards don't fill the full row (default: 'center')
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Additional container style
   */
  style?: ViewStyle;
}

