import { useEffect, useRef, useCallback } from 'react';
import { View, Pressable, Platform, Animated, TouchableOpacity, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Input, Icon, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import type { SearchBarProps } from './SearchBar.types';
import {
  useSearchBarState,
  useDebouncedSearch,
  useSearchBarHandlers,
  validateControlledMode,
} from './SearchBar.hooks';

/**
 * SearchBar component
 *
 * Search input with icon and optional clear button.
 * Uses theme colors for consistent styling across platforms.
 * Mobile: md size (40px height), full width
 * Web: lg size (48px height), max 600px width, centered
 */
export const SearchBar = ({
  value,
  onChangeText,
  onSearch,
  onClear,
  showClearButton = true,
  containerStyle,
  placeholder: customPlaceholder,
  placeholderSuggestions = ['atta', 'tomato', 'onion'],
  placeholderRotationInterval = 5000,
  debounceMs = 300,
  minSearchLength = 3,
  showBackButton = false,
  onBack,
  backIcon,
  results = [],
  renderResultItem,
  onResultSelect,
  showResults,
  maxResults = 5,
  isLoading = false,
  ...inputProps
}: SearchBarProps) => {
  const theme = useTheme();
  const { uiSize, fontSize } = useDeviceType();
  const isWeb = Platform.OS === 'web';
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Responsive icon sizes
  const iconSizeMd = uiSize(20);
  const iconSizeSm = uiSize(16);

  // Validate controlled/uncontrolled mode
  validateControlledMode(value, onChangeText, isWeb);

  // Use shared state hook
  const {
    searchValue,
    setSearchValue,
    isFocused,
    setIsFocused,
    displayPlaceholder,
    setDisplayPlaceholder,
    shouldShowResults,
    displayedResults,
    shouldUseRotatingPlaceholder,
    rotatingPlaceholder,
  } = useSearchBarState({
    value,
    placeholderSuggestions,
    placeholderRotationInterval,
    customPlaceholder,
    minSearchLength,
    results,
    showResults,
    maxResults,
  });

  // Use shared debounced search hook
  const { debouncedSearch, debounceRef } = useDebouncedSearch(onSearch, debounceMs, minSearchLength);

  // Use shared event handlers
  const {
    handleChangeText,
    handleClear,
    handleFocus,
    handleBlur,
    handleBack,
    handleResultSelect,
  } = useSearchBarHandlers({
    value,
    searchValue,
    setSearchValue,
    onChangeText,
    onClear,
    onSearch,
    onBack,
    onResultSelect,
    inputProps,
    debouncedSearch,
    setIsFocused,
    debounceRef,
  });

  // Initialize display placeholder on mount
  useEffect(() => {
    if (displayPlaceholder === '') {
      setDisplayPlaceholder(rotatingPlaceholder);
      fadeAnim.setValue(1);
    }
  }, []);

  // Update placeholder when rotatingPlaceholder changes
  // useNativeDriver is not supported on web
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    if (displayPlaceholder !== rotatingPlaceholder) {
      if (shouldUseRotatingPlaceholder && displayPlaceholder !== '') {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.7,
            duration: 150,
            useNativeDriver,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver,
          }),
        ]).start();
        setTimeout(() => {
          setDisplayPlaceholder(rotatingPlaceholder);
        }, 150);
      } else {
        setDisplayPlaceholder(rotatingPlaceholder);
        fadeAnim.setValue(1);
      }
    }
  }, [rotatingPlaceholder, shouldUseRotatingPlaceholder, displayPlaceholder]);

  // Default padding horizontal (responsive)
  const defaultPaddingHorizontal = uiSize(16);

  // Determine left icon - back button or search icon
  const leftIconContent = showBackButton ? (
    <Pressable onPress={handleBack} style={{ padding: uiSize(4) }}>
      {backIcon || <Icon name="chevron.left" size={iconSizeMd} />}
    </Pressable>
  ) : <Icon name="search" size={iconSizeMd} />;

  // Render result item
  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => {
    if (renderResultItem) {
      return (
        <TouchableOpacity
          onPress={() => handleResultSelect(item, index)}
          style={{
            padding: uiSize(12),
            borderBottomWidth: index < displayedResults.length - 1 ? 1 : 0,
            borderBottomColor: theme.colors.border,
          }}
        >
          {renderResultItem(item, index)}
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => handleResultSelect(item, index)}
        style={{
          padding: uiSize(12),
          borderBottomWidth: index < displayedResults.length - 1 ? 1 : 0,
          borderBottomColor: theme.colors.border,
        }}
      >
        <Text style={{ fontSize: fontSize(16), color: theme.colors.text }}>
          {typeof item === 'string' ? item : JSON.stringify(item)}
        </Text>
      </TouchableOpacity>
    );
  }, [renderResultItem, handleResultSelect, displayedResults.length, theme, uiSize, fontSize]);

  // Container styles - web has max width
  const searchBarContainerStyle = isWeb
    ? { width: '100%' as const, maxWidth: 600, alignSelf: 'center' as const }
    : { width: '100%' as const };

  return (
    <View style={[searchBarContainerStyle, containerStyle]}>
      <Animated.View style={{ opacity: shouldUseRotatingPlaceholder ? fadeAnim : 1 }}>
        <Input
          {...inputProps}
          value={value !== undefined ? value : searchValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={displayPlaceholder || rotatingPlaceholder}
          style={[
            {
              borderRadius: uiSize(theme.radius.full),
              paddingLeft: uiSize(8),
              paddingRight: defaultPaddingHorizontal,
            },
            inputProps.style,
          ]}
          leftIcon={leftIconContent}
          rightIcon={
            isLoading ? (
              <View style={{ padding: uiSize(4) }}>
                <ActivityIndicator size="small" color={theme.colors.textSecondary} />
              </View>
            ) : showClearButton && (value !== undefined ? value : searchValue)
              ? (
                  <Pressable onPress={handleClear} style={{ padding: uiSize(4) }}>
                    <Icon name="x" size={iconSizeSm} />
                  </Pressable>
                )
              : undefined
          }
        />
      </Animated.View>

      {/* Results Dropdown */}
      {shouldShowResults && displayedResults.length > 0 && (
        <View
          style={[
            styles.resultsDropdown,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: uiSize(theme.radius.md),
              borderWidth: 1,
              borderColor: theme.colors.border,
              marginTop: uiSize(4),
              maxHeight: maxResults * uiSize(60),
            },
          ]}
        >
          <FlatList
            data={displayedResults}
            renderItem={renderItem}
            keyExtractor={(item, index) => `result-${index}`}
            scrollEnabled={displayedResults.length > maxResults}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
    }),
  },
});

export default SearchBar;
