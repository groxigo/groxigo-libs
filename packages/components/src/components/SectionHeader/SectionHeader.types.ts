import type { ViewStyle } from 'react-native';
import type { SectionHeaderPropsBase } from '@groxigo/contracts';

/**
 * SectionHeader component props for React Native
 */
export interface SectionHeaderProps extends SectionHeaderPropsBase {
  /**
   * Additional container style
   */
  style?: ViewStyle;
}
