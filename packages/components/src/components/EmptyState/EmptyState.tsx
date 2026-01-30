import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon, useTheme } from '@groxigo/ui-elements';
import type { EmptyStateProps } from './EmptyState.types';

/**
 * EmptyState component
 *
 * Displays an empty list state with icon, title, description, and optional action.
 * Uses theme colors for consistent styling across platforms.
 */
export const EmptyState = ({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
  section,
  testID,
  style,
  ...props
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { gap: theme.spacing[4], padding: theme.spacing[8] },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {icon && (
        <Icon
          name={icon as any}
          size="lg"
          style={{
            color: theme.colors.textTertiary,
            marginBottom: theme.spacing[2],
          }}
        />
      )}
      <Text
        variant="h3"
        style={[styles.title, { color: theme.colors.text }]}
      >
        {title}
      </Text>
      {description && (
        <Text
          variant="body"
          style={[styles.description, { color: theme.colors.textSecondary }]}
        >
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button variant="solid" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 400,
  },
});

export default EmptyState;
