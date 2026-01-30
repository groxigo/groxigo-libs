/**
 * RecipeSection Types
 *
 * Enterprise section component for displaying recipes.
 */

import type { StyleProp, ViewStyle } from 'react-native';
import type {
  RecipeSectionPropsBase,
  RecipeSectionItem,
  RecipeSectionDisplayType,
} from '@groxigo/contracts';

/**
 * RecipeSection props for React Native
 */
export interface RecipeSectionProps extends Omit<RecipeSectionPropsBase, 'className'> {
  /** Container style */
  style?: StyleProp<ViewStyle>;
}

// Re-export types from contracts for convenience
export type { RecipeSectionItem, RecipeSectionDisplayType };
