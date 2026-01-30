import type { ViewStyle } from 'react-native';
import type { CategorySectionPropsBase } from '@groxigo/contracts';

/**
 * CategorySection component props for React Native
 */
export interface CategorySectionProps extends CategorySectionPropsBase {
  /**
   * Additional container style
   */
  style?: ViewStyle;

  /**
   * Additional grid style
   */
  gridStyle?: ViewStyle;
}
