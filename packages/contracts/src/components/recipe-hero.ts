/**
 * RecipeHero Component Contract
 *
 * Platform-agnostic interface for RecipeHero component.
 * Full-width hero with background image, dark gradient overlay,
 * title, and meta information (time, difficulty, servings, rating).
 */

export interface RecipeHeroPropsBase {
  /** Recipe title */
  title: string;
  /** Background image URL */
  imageUrl: string;
  /** Cook time display string (e.g., "30 min") */
  cookTime?: string;
  /** Difficulty level (e.g., "Easy", "Medium", "Hard") */
  difficulty?: string;
  /** Number of servings */
  servings?: number;
  /** Average rating (0-5) */
  rating?: number;
  /** Callback when save/bookmark button is pressed */
  onSave?: () => void;
  /** Whether the recipe is saved/bookmarked */
  isSaved?: boolean;
  /** Test ID for testing */
  testID?: string;
}
