import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon, useTheme } from '@groxigo/ui-elements';
import type { ErrorStateProps } from './ErrorState.types';

/**
 * ErrorState component
 *
 * Displays an error state with icon, message, and optional retry action.
 * Uses theme colors for consistent styling across platforms.
 */
export const ErrorState = ({
  title = 'Something went wrong',
  message,
  retryLabel = 'Try Again',
  onRetry,
  section,
  testID,
  style,
  ...props
}: ErrorStateProps) => {
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
      <Icon
        name="warning"
        size="lg"
        style={{
          color: theme.colors.error,
          marginBottom: theme.spacing[2],
        }}
      />
      <Text
        variant="h3"
        style={[styles.title, { color: theme.colors.text }]}
      >
        {title}
      </Text>
      <Text
        variant="body"
        style={[styles.message, { color: theme.colors.textSecondary }]}
      >
        {message}
      </Text>
      {onRetry && (
        <Button variant="solid" onPress={onRetry}>
          {retryLabel}
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
  message: {
    textAlign: 'center',
    maxWidth: 400,
  },
});

export default ErrorState;
