import { View, Pressable, Image, StyleSheet } from 'react-native';
import { Text, Icon, Badge, useTheme } from '@groxigo/ui-elements';
import type { ListItemProps } from './ListItem.types';

/**
 * ListItem component
 *
 * Reusable list item with actions.
 * Uses theme colors for consistent styling across platforms.
 */
export const ListItem = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  leftImage,
  rightContent,
  badge,
  selected = false,
  disabled = false,
  onPress,
  style,
  ...props
}: ListItemProps) => {
  const theme = useTheme();

  const content = (
    <View
      style={[
        styles.container,
        {
          padding: theme.spacing[3],
          gap: theme.spacing[3],
          backgroundColor: selected
            ? theme.colors.primary + '10'
            : theme.colors.surface,
          ...(selected && {
            borderLeftWidth: 3,
            borderLeftColor: theme.colors.primary,
          }),
          ...(disabled && { opacity: 0.5 }),
        },
        style,
      ]}
      {...props}
    >
      {leftImage && (
        <Image
          source={leftImage}
          style={[
            styles.image,
            { borderRadius: theme.radius.md },
          ]}
        />
      )}
      {leftIcon && !leftImage && (
        <Icon
          name={leftIcon as any}
          size="md"
          style={{
            color: selected ? theme.colors.primary : theme.colors.textSecondary,
          }}
        />
      )}
      <View style={[styles.content, { gap: theme.spacing[1] }]}>
        <Text
          variant="body"
          style={{
            fontWeight: selected ? '600' : '400',
            color: selected ? theme.colors.primary : theme.colors.text,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            variant="caption"
            style={{ color: theme.colors.textSecondary }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {badge && (
        <Badge variant="solid" size="sm">
          {String(badge)}
        </Badge>
      )}
      {rightContent}
      {rightIcon && !rightContent && (
        <Icon
          name={rightIcon as any}
          size="sm"
          style={{ color: theme.colors.textTertiary }}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          pressed && !disabled && { opacity: 0.8 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
  },
});

export default ListItem;
