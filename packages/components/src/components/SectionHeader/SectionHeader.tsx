import { View, Pressable, StyleSheet } from 'react-native';
import { Text, Icon, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import type { SectionHeaderProps } from './SectionHeader.types';

/**
 * SectionHeader component
 *
 * Displays a section title with optional icon and "See All" action.
 * Used for consistent section headers across the app.
 */
export const SectionHeader = ({
  title,
  titleVariant = 'h2',
  subtitle,
  icon,
  iconColor,
  showSeeAll = false,
  seeAllText = 'See all',
  onSeeAllPress,
  style,
  testID,
}: SectionHeaderProps) => {
  const theme = useTheme();
  const { fontSize, spacing } = useDeviceType();

  const effectiveIconColor = iconColor || theme.colors.primary;

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing[4],
          marginBottom: theme.spacing[2],
        },
        style,
      ]}
      testID={testID}
    >
      <View style={[styles.leftContent, { gap: theme.spacing[2] }]}>
        {icon && (
          <Icon
            name={icon as any}
            size="md"
            color={effectiveIconColor}
          />
        )}
        <View>
          <Text variant={titleVariant} style={{ color: theme.colors.text }}>
            {title}
          </Text>
          {subtitle && (
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.textSecondary, marginTop: 2 }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {showSeeAll && onSeeAllPress && (
        <Pressable
          style={[styles.seeAllButton, { gap: spacing(4) }]}
          onPress={onSeeAllPress}
          hitSlop={8}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: fontSize(14),
              fontWeight: '500',
            }}
          >
            {seeAllText}
          </Text>
          <Icon
            name="chevron-right"
            size="sm"
            color={theme.colors.primary}
          />
        </Pressable>
      )}
    </View>
  );
};

SectionHeader.displayName = 'SectionHeader';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SectionHeader;
