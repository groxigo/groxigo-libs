import type { ViewProps, ViewStyle } from 'react-native';
import type {
  BottomNavPropsBase,
  BottomNavItem,
  BottomNavSection,
  BottomNavVariant,
  BottomNavActiveIndicator,
} from '@groxigo/contracts';

/**
 * BottomNav props for React Native
 *
 * Extends the platform-agnostic BottomNavPropsBase from @groxigo/contracts
 * with React Native-specific properties.
 */
export interface BottomNavProps extends Omit<BottomNavPropsBase, 'className'>, Omit<ViewProps, 'style'> {
  /**
   * Container style
   */
  style?: ViewStyle;
}

// Re-export types from contracts for convenience
export type {
  BottomNavItem,
  BottomNavSection,
  BottomNavVariant,
  BottomNavActiveIndicator,
};
