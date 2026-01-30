import type { ViewProps, ViewStyle } from 'react-native';
import type { ErrorStatePropsBase, ErrorStateSection } from '@groxigo/contracts';

/**
 * ErrorState props for React Native
 *
 * Extends the platform-agnostic ErrorStatePropsBase from @groxigo/contracts
 * with React Native-specific properties.
 */
export interface ErrorStateProps extends Omit<ErrorStatePropsBase, 'className'>, Omit<ViewProps, 'style'> {
  /**
   * Container style
   */
  style?: ViewStyle;
}

// Re-export types from contracts for convenience
export type { ErrorStateSection };
