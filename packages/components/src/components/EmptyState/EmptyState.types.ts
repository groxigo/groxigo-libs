import type { ViewProps, ViewStyle } from 'react-native';
import type { EmptyStatePropsBase, EmptyStateSection } from '@groxigo/contracts';

/**
 * EmptyState props for React Native
 *
 * Extends the platform-agnostic EmptyStatePropsBase from @groxigo/contracts
 * with React Native-specific properties.
 */
export interface EmptyStateProps extends Omit<EmptyStatePropsBase, 'className'>, Omit<ViewProps, 'style'> {
  /**
   * Container style
   */
  style?: ViewStyle;
}

// Re-export types from contracts for convenience
export type { EmptyStateSection };
