import { useCallback } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Icon, useTheme } from '@groxigo/ui-elements';
import { Header } from '../Header';
import type { CategoryNavBarProps } from './CategoryNavBar.types';

// Optional router imports - will only work if these packages are installed
let useRouter: (() => { back: () => void; push: (route: string) => void }) | undefined;
let useNavigation: (() => { goBack: () => void; navigate: (route: string) => void }) | undefined;

try {
  const expoRouter = require('expo-router');
  if (expoRouter?.useRouter) {
    useRouter = expoRouter.useRouter;
  }
} catch {
  // expo-router not available
}

try {
  const reactNavigation = require('@react-navigation/native');
  if (reactNavigation?.useNavigation) {
    useNavigation = reactNavigation.useNavigation;
  }
} catch {
  // react-navigation not available
}

/**
 * CategoryNavBar component
 *
 * Wrapper around Header component for category detail screens.
 * Displays back button, category name, and search icon.
 * Uses theme colors for consistent styling across platforms.
 */
export const CategoryNavBar = ({
  categoryName,
  onBack,
  onSearchPress,
  section,
  elevated = true,
  fixed = false,
  backgroundColor,
  style,
  accessibilityLabel,
  testID,
  ...props
}: CategoryNavBarProps) => {
  const theme = useTheme();

  const router = useRouter?.();
  const navigation = useNavigation?.();

  const handleBackPress = useCallback(() => {
    if (onBack) {
      onBack();
    } else if (router) {
      router.back();
    } else if (navigation) {
      navigation.goBack();
    } else {
      console.warn('CategoryNavBar: No navigation handler available. Provide onBack prop or install expo-router/react-navigation.');
    }
  }, [onBack, router, navigation]);

  const handleSearchPress = useCallback(() => {
    if (onSearchPress) {
      onSearchPress();
    } else if (router) {
      router.push('/search');
    } else if (navigation) {
      navigation.navigate('Search');
    } else {
      console.warn('CategoryNavBar: No navigation handler available. Provide onSearchPress prop or install expo-router/react-navigation.');
    }
  }, [onSearchPress, router, navigation]);

  const backButton = (
    <Pressable
      onPress={handleBackPress}
      style={({ pressed }) => [
        styles.iconButton,
        { borderRadius: theme.radius.sm },
        pressed && { opacity: 0.8 },
      ]}
      accessibilityLabel="Go back"
      accessibilityRole="button"
      testID={testID ? `${testID}-back` : undefined}
    >
      <Icon
        name="arrow.left"
        size={24}
        color={theme.colors.text}
      />
    </Pressable>
  );

  const searchButton = (
    <Pressable
      onPress={handleSearchPress}
      style={({ pressed }) => [
        styles.iconButton,
        { borderRadius: theme.radius.sm },
        pressed && { opacity: 0.8 },
      ]}
      accessibilityLabel="Search"
      accessibilityRole="button"
      testID={testID ? `${testID}-search` : undefined}
    >
      <Icon
        name="search"
        size={24}
        color={theme.colors.text}
      />
    </Pressable>
  );

  const headerStyle: ViewStyle = {
    minHeight: 56,
    ...(fixed && styles.fixed),
    ...(backgroundColor && { backgroundColor }),
    ...style,
  };

  return (
    <Header
      title={categoryName}
      leftAction={backButton}
      rightActions={[searchButton]}
      section={section}
      elevated={elevated}
      style={headerStyle}
      testID={testID}
      {...props}
    />
  );
};

CategoryNavBar.displayName = 'CategoryNavBar';

const styles = StyleSheet.create({
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default CategoryNavBar;
