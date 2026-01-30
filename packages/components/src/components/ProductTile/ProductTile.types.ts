import type { ViewStyle } from 'react-native';
import type { ProductTilePropsBase } from '@groxigo/contracts';

/**
 * ProductTile component props for React Native
 */
export interface ProductTileProps extends ProductTilePropsBase {
  /**
   * Additional container style
   */
  style?: ViewStyle;
}
