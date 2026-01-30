import type { ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
import type { CardProps } from '@groxigo/ui-elements';
import type {
  RecipeCardPropsBase,
  RecipeCardDifficulty,
  RecipeCardBadgeVariant,
  RecipeCardSize,
  RecipeCardVariant,
  RecipeTagItem,
} from '@groxigo/contracts';

/**
 * RecipeCard props for React Native
 *
 * Extends the platform-agnostic RecipeCardPropsBase from @groxigo/contracts
 * with React Native-specific properties and deprecated prop aliases for backward compatibility.
 */
export interface RecipeCardProps extends Omit<RecipeCardPropsBase, 'className'> {
  // ======================================
  // DEPRECATED PROPS (for backward compatibility)
  // ======================================

  /**
   * @deprecated Use `imageUrl` instead
   * Recipe image source
   */
  image?: ImageSourcePropType;

  /**
   * @deprecated Use `prepTime`, `cookTime`, or `totalTime` instead
   * Cooking time in minutes
   */
  time?: number;

  // ======================================
  // REACT NATIVE-SPECIFIC PROPS
  // ======================================

  /**
   * Container style
   */
  style?: ViewStyle;

  /**
   * Image style
   */
  imageStyle?: ImageStyle;

  /**
   * Card variant (visual style)
   * @default 'elevated'
   */
  cardVariant?: CardProps['variant'];

  /**
   * Card padding
   * @default 'md'
   */
  padding?: CardProps['padding'];
}

// Re-export types from contracts for convenience
export type {
  RecipeCardDifficulty,
  RecipeCardBadgeVariant,
  RecipeCardSize,
  RecipeCardVariant,
  RecipeTagItem,
};
