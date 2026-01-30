import type { ViewProps, ViewStyle } from 'react-native';
import type { FilterBarPropsBase, FilterBarSection, FilterOption } from '@groxigo/contracts';

/**
 * FilterBar props for React Native
 *
 * Extends the platform-agnostic FilterBarPropsBase from @groxigo/contracts
 * with React Native-specific properties.
 */
export interface FilterBarProps extends Omit<FilterBarPropsBase, 'className'>, Omit<ViewProps, 'style'> {
  /**
   * Container style
   */
  style?: ViewStyle;
}

// Re-export types from contracts for convenience
export type { FilterBarSection, FilterOption };
