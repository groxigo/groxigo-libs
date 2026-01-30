import type { ViewProps, ViewStyle } from 'react-native';
import type { RatingPropsBase, RatingSize, RatingSection } from '@groxigo/contracts';

/**
 * Rating props for React Native
 *
 * Extends the platform-agnostic RatingPropsBase from @groxigo/contracts
 * with React Native-specific properties.
 */
export interface RatingProps extends Omit<RatingPropsBase, 'className'>, Omit<ViewProps, 'style'> {
  /**
   * Container style
   */
  style?: ViewStyle;
}

// Re-export types from contracts for convenience
export type { RatingSize, RatingSection };
