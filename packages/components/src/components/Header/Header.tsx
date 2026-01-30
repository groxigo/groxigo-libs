import { View, Platform, StyleSheet } from 'react-native';
import { Text, useTheme } from '@groxigo/ui-elements';
import type { HeaderProps } from './Header.types';

/**
 * Header component
 *
 * App header with navigation and actions.
 * Uses theme colors for consistent styling across platforms.
 */
export const Header = ({
  title,
  leftAction,
  rightActions,
  elevated = true,
  section,
  testID,
  style,
  ...props
}: HeaderProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          padding: theme.spacing[1],
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          ...(elevated && {
            ...Platform.select({
              web: {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              } as any,
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              },
              android: {
                elevation: 3,
              },
            }),
          }),
        },
        style,
      ]}
      testID={testID}
      {...props}
    >
      <View style={[styles.leftSection, { gap: theme.spacing[3] }]}>
        {leftAction}
        {title && (
          <Text variant="h2" style={{ color: theme.colors.text }}>
            {title}
          </Text>
        )}
      </View>
      {rightActions && rightActions.length > 0 && (
        <View style={[styles.rightSection, { gap: theme.spacing[2] }]}>
          {rightActions.map((action, index) => (
            <View key={index}>{action}</View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
