import { Pressable, View, StyleSheet } from 'react-native';
import { Text, Icon, Image, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import { tokens } from '@groxigo/tokens/react-native';
import type { RecipeCardProps } from './RecipeCard.types';

/**
 * RecipeCard component
 *
 * Displays recipe information with image, time badge, rating, cuisine tag, and difficulty.
 * Supports responsive scaling for tablets via useDeviceType.
 */
export const RecipeCard = ({
  // Contract-based props
  id,
  imageUrl,
  title,
  prepTime,
  cookTime,
  totalTime,
  servings,
  difficulty,
  cuisine,
  rating,
  ratingCount,
  tags,
  badge,
  width = 180,
  onPress,
  testID,

  // Deprecated props (backward compatibility)
  image,
  time,

  // RN-specific props
  style,
}: RecipeCardProps) => {
  const theme = useTheme();
  const { uiSize, fontSize, spacing } = useDeviceType();

  // Resolve props with backward compatibility
  const displayImageUrl = imageUrl || (image && typeof image === 'object' && 'uri' in image ? (image as { uri: string }).uri : undefined);

  // Calculate display time (totalTime or prepTime + cookTime or deprecated time)
  const displayTime = totalTime || (prepTime && cookTime ? prepTime + cookTime : prepTime || cookTime) || time;

  // Get cuisine from tags or direct prop
  const cuisineTag = tags?.find(t => t.type === 'cuisine') || (cuisine ? { name: cuisine, color: null } : null);

  // Difficulty color mapping
  const getDifficultyColor = (level?: string) => {
    if (!level) return theme.colors.textSecondary;
    switch (level.toLowerCase()) {
      case 'easy':
        return theme.colors.success;
      case 'medium':
        return theme.colors.warning;
      case 'hard':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const cardWidth = uiSize(width);
  const imageHeight = cardWidth * 0.7;
  const difficultyColor = getDifficultyColor(difficulty);
  const cardBorderRadius = uiSize(16);

  return (
    <Pressable
      style={[
        styles.card,
        {
          width: cardWidth,
          backgroundColor: theme.colors.surface,
          borderRadius: cardBorderRadius,
        },
        style,
      ]}
      onPress={onPress}
      testID={testID}
    >
      {/* Image - uses layout.imageBg for easy config when transparent images are ready */}
      <View style={[
        styles.imageContainer,
        {
          backgroundColor: tokens.colors.semantic.layout.imageBg,
          borderTopLeftRadius: cardBorderRadius,
          borderTopRightRadius: cardBorderRadius,
        }
      ]}>
        <Image
          source={{ uri: displayImageUrl }}
          width={cardWidth}
          height={imageHeight}
          borderTopLeftRadius={cardBorderRadius}
          borderTopRightRadius={cardBorderRadius}
          backgroundColor={tokens.colors.semantic.layout.imageBg}
        />


        {/* Rating Badge - Top Right */}
        {rating != null && rating > 0 && (
          <View
            style={[
              styles.ratingBadge,
              {
                top: spacing(8),
                right: spacing(8),
                paddingHorizontal: spacing(8),
                paddingVertical: spacing(4),
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Icon name="star" size={uiSize(12)} color={theme.colors.warning} />
            <Text
              variant="caption"
              weight="semibold"
              style={[styles.ratingText, { fontSize: fontSize(10), color: theme.colors.text }]}
            >
              {rating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={[styles.content, { padding: spacing(12), gap: spacing(8), borderBottomLeftRadius: cardBorderRadius, borderBottomRightRadius: cardBorderRadius }]}>
        {/* Title Row with Time */}
        <View style={styles.titleRow}>
          <Text
            variant="bodySmall"
            weight="semibold"
            numberOfLines={2}
            style={[styles.title, { flex: 1, lineHeight: fontSize(18), color: theme.colors.text }]}
          >
            {title}
          </Text>
          {displayTime && (
            <View style={[styles.timeInline, { marginLeft: spacing(6) }]}>
              <Icon name="time-outline" size={uiSize(10)} color={theme.colors.primary} />
              <Text
                variant="caption"
                style={{ fontSize: fontSize(10), color: theme.colors.primary }}
              >
                {displayTime}m
              </Text>
            </View>
          )}
        </View>

        {/* Meta Row: Cuisine + Difficulty */}
        <View style={[styles.metaRow, { gap: spacing(8) }]}>
          {cuisineTag && (
            <View
              style={[
                styles.cuisineChip,
                { paddingHorizontal: spacing(8), paddingVertical: 2 },
                cuisineTag.color ? { backgroundColor: cuisineTag.color + '20' } : { backgroundColor: theme.colors.primary + '15' },
              ]}
            >
              <Text
                variant="caption"
                style={[
                  styles.cuisineText,
                  { fontSize: fontSize(10) },
                  cuisineTag.color ? { color: cuisineTag.color } : { color: theme.colors.primary },
                ]}
              >
                {cuisineTag.name}
              </Text>
            </View>
          )}

          {difficulty && (
            <View style={styles.difficultyContainer}>
              <View style={[styles.difficultyDot, { backgroundColor: difficultyColor }]} />
              <Text
                variant="caption"
                style={[
                  styles.difficultyText,
                  { fontSize: fontSize(10), color: theme.colors.textSecondary },
                ]}
              >
                {difficulty}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  timeBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 999,
    gap: 4,
  },
  timeText: {
    color: '#FFFFFF',
  },
  ratingBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    gap: 2,
  },
  ratingText: {},
  content: {},
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {},
  timeInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cuisineChip: {
    borderRadius: 4,
  },
  cuisineText: {
    textTransform: 'capitalize',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  difficultyText: {
    textTransform: 'capitalize',
  },
});

export default RecipeCard;
