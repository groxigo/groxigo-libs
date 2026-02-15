import { View, Image, StyleSheet } from 'react-native';
import { Text, Avatar, useTheme } from '@groxigo/ui-elements';
import { Rating } from '../Rating';
import type { ReviewCardProps } from './ReviewCard.types';

/**
 * ReviewCard component
 *
 * Review/rating display card.
 * Uses theme colors for consistent styling across platforms.
 */
export const ReviewCard = ({
  reviewerName,
  reviewerAvatar,
  rating,
  review,
  date,
  verified = false,
  style,
  section,
  ...props
}: ReviewCardProps) => {
  const theme = useTheme();

  const formatDate = (dateValue: Date | string | undefined): string => {
    if (!dateValue) return '';
    const dateObj = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <View
      style={[
        styles.container,
        {
          padding: theme.spacing[4],
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          gap: theme.spacing[3],
        },
        style,
      ]}
      {...props}
    >
      <View style={[styles.header, { gap: theme.spacing[3] }]}>
        {reviewerAvatar ? (
          <Image
            source={reviewerAvatar}
            style={[styles.avatar, { borderRadius: theme.radius.full }]}
          />
        ) : (
          <Avatar size="md" fallback={reviewerName} />
        )}
        <View style={[styles.reviewerInfo, { gap: theme.spacing[1] }]}>
          <View style={[styles.nameRow, { gap: theme.spacing[2] }]}>
            <Text variant="body" weight="semibold">
              {reviewerName}
            </Text>
            {verified && (
              <Text variant="caption" style={{ color: theme.colors.success }}>
                ✓ Verified
              </Text>
            )}
          </View>
          <View style={[styles.ratingRow, { gap: theme.spacing[2] }]}>
            <Rating value={rating} max={5} editable={false} size="sm" />
            {date && (
              <Text variant="caption" style={{ color: theme.colors.textTertiary }}>
                {formatDate(date)}
              </Text>
            )}
          </View>
        </View>
      </View>
      <Text variant="body" style={{ color: theme.colors.text }}>
        {review}
      </Text>
    </View>
  );
};

ReviewCard.displayName = 'ReviewCard';

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  reviewerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReviewCard;
