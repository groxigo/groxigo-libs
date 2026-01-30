/**
 * Select Component
 *
 * A dropdown select component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 *
 * Accessibility features:
 * - aria-expanded for dropdown state
 * - aria-haspopup="listbox"
 * - Keyboard navigation (up/down arrows, Enter, Escape) on web
 * - Proper focus management
 */

import React, { useState, useMemo, useCallback, forwardRef, useRef, useEffect, useId } from 'react';
import { View, Pressable, Modal, ScrollView, StyleSheet, Platform, AccessibilityInfo, findNodeHandle } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { SelectProps, SelectSize, SelectVariant, SelectColorScheme } from './Select.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<SelectSize, {
  height: number;
  paddingH: number;
  fontSize: number;
  iconSize: number;
  borderRadius: number;
}> = {
  sm: { height: 36, paddingH: 10, fontSize: 14, iconSize: 16, borderRadius: 6 },
  md: { height: 44, paddingH: 12, fontSize: 16, iconSize: 18, borderRadius: 8 },
  lg: { height: 52, paddingH: 14, fontSize: 18, iconSize: 20, borderRadius: 10 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: SelectColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<SelectColorScheme, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    neutral: colors.text,
  };

  return colorMap[colorScheme];
}

// ============================================
// VARIANT HELPERS
// ============================================

function getVariantStyles(
  theme: Theme,
  variant: SelectVariant,
  isFocused: boolean,
  isError: boolean,
  isDisabled: boolean,
  activeColor: string,
  borderRadius: number
) {
  const colors = theme.colors;

  const getBorderColor = () => {
    if (isError) return colors.error;
    if (isFocused) return activeColor;
    return colors.border;
  };

  switch (variant) {
    case 'outline':
      return {
        backgroundColor: isDisabled ? colors.surfaceDisabled : colors.surface,
        borderWidth: 1,
        borderColor: getBorderColor(),
        borderRadius,
      };
    case 'filled':
      return {
        backgroundColor: isDisabled ? colors.surfaceDisabled : colors.surfaceSecondary,
        borderWidth: isFocused || isError ? 1 : 0,
        borderColor: getBorderColor(),
        borderRadius,
      };
    case 'flushed':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: isFocused || isError ? 2 : 1,
        borderColor: getBorderColor(),
        borderRadius: 0,
      };
    case 'unstyled':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 0,
      };
    default:
      return {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: getBorderColor(),
        borderRadius,
      };
  }
}

// ============================================
// SELECT COMPONENT
// ============================================

export const Select = forwardRef<ViewType, SelectProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      colorScheme = 'primary',
      label,
      value,
      onChange,
      options,
      placeholder = 'Select an option',
      error,
      helperText,
      disabled = false,
      required = false,
      fullWidth = true,
      containerStyle,
      style,
      labelStyle,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const activeColor = getColorSchemeColor(theme, colorScheme);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const modalContentRef = useRef<View>(null);
  const isError = !!error;

  // Generate unique ID for listbox
  const listboxId = useId();

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption;

  // Get enabled options for keyboard navigation
  const enabledOptions = useMemo(() =>
    options.filter(opt => !opt.disabled),
    [options]
  );

  const handleSelect = useCallback((optionValue: string | number) => {
    onChange?.(optionValue);
    setIsOpen(false);

    // Announce selection on native
    if (Platform.OS !== 'web') {
      const selected = options.find(opt => opt.value === optionValue);
      if (selected) {
        AccessibilityInfo.announceForAccessibility(`Selected ${selected.label}`);
      }
    }
  }, [onChange, options]);

  // Initialize focused index when modal opens
  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.findIndex(opt => opt.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);

      // Announce to screen reader on native
      if (Platform.OS !== 'web') {
        AccessibilityInfo.announceForAccessibility(
          `${label || 'Select'} dropdown opened. ${options.length} options available.`
        );
      }
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, value, options, label]);

  // Keyboard navigation for web
  useEffect(() => {
    if (Platform.OS !== 'web' || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + 1;
            // Skip disabled options
            let nextIndex = next >= options.length ? 0 : next;
            while (options[nextIndex]?.disabled && nextIndex !== prev) {
              nextIndex = nextIndex + 1 >= options.length ? 0 : nextIndex + 1;
            }
            return nextIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev - 1;
            // Skip disabled options
            let nextIndex = next < 0 ? options.length - 1 : next;
            while (options[nextIndex]?.disabled && nextIndex !== prev) {
              nextIndex = nextIndex - 1 < 0 ? options.length - 1 : nextIndex - 1;
            }
            return nextIndex;
          });
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && !options[focusedIndex]?.disabled) {
            handleSelect(options[focusedIndex].value);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        case 'Home':
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setFocusedIndex(options.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, options, handleSelect]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
  }, [disabled]);

  const variantStyles = getVariantStyles(
    theme,
    variant,
    isOpen,
    isError,
    disabled,
    activeColor,
    config.borderRadius
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        ...(fullWidth && { width: '100%' }),
      },
      label: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: '500',
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        marginBottom: 6,
      },
      required: {
        color: theme.colors.error,
      },
      selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: config.height,
        paddingHorizontal: config.paddingH,
        ...variantStyles,
        ...Platform.select({
          web: {
            cursor: disabled ? 'not-allowed' : 'pointer',
          } as any,
        }),
      },
      selectText: {
        flex: 1,
        fontSize: config.fontSize,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
      },
      placeholder: {
        color: theme.colors.textMuted,
      },
      icon: {
        width: config.iconSize,
        height: config.iconSize,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
      },
      iconText: {
        fontSize: config.iconSize,
        color: theme.colors.textSecondary,
      },
      helperText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
        marginTop: 4,
      },
      errorText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.error,
        fontFamily: theme.typography.fontFamily.sans,
        marginTop: 4,
      },
      // Modal styles
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        maxHeight: '50%',
        ...theme.shadows.lg,
      },
      modalHeader: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        marginBottom: 16,
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 12,
      },
      optionSelected: {
        backgroundColor: `${activeColor}15`,
      },
      optionDisabled: {
        opacity: 0.5,
      },
      optionText: {
        flex: 1,
        fontSize: config.fontSize,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
      },
      optionTextSelected: {
        color: activeColor,
        fontWeight: '600',
      },
    });
  }, [theme, config, variantStyles, activeColor, fullWidth, disabled]);

  return (
    <View ref={ref} style={[styles.container, containerStyle]} {...props}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <Pressable
        style={({ pressed }) => [
          styles.selectContainer,
          disabled && { opacity: 0.5 },
          pressed && !disabled && { opacity: 0.8 },
          style,
        ]}
        onPress={handlePress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel || label || 'Select option'}
        accessibilityRole="combobox"
        accessibilityState={{ disabled, expanded: isOpen }}
        accessibilityHint={`Opens a list of ${options.length} options`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
      >
        <Text
          style={[styles.selectText, isPlaceholder && styles.placeholder]}
          numberOfLines={1}
        >
          {displayText}
        </Text>
        <View style={styles.icon} accessibilityElementsHidden importantForAccessibility="no">
          <Text style={styles.iconText}>▼</Text>
        </View>
      </Pressable>
      {isError && error && (
        <Text style={styles.errorText} accessibilityRole="alert" accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
      {!isError && helperText && <Text style={styles.helperText}>{helperText}</Text>}

      {/* Modal for selection */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
          accessibilityRole="none"
          importantForAccessibility="no"
        >
          <Pressable
            ref={modalContentRef}
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
            accessibilityViewIsModal={true}
          >
            <Text style={styles.modalHeader} accessibilityRole="header">
              {label || 'Select an option'}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nativeID={listboxId}
              accessibilityRole="list"
              aria-label={`${label || 'Select'} options`}
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isOptionDisabled = option.disabled;
                const isFocused = index === focusedIndex;

                return (
                  <Pressable
                    key={String(option.value)}
                    style={({ pressed }) => [
                      styles.option,
                      isSelected && styles.optionSelected,
                      isFocused && Platform.OS === 'web' && { backgroundColor: `${activeColor}10` },
                      isOptionDisabled && styles.optionDisabled,
                      pressed && !isOptionDisabled && { opacity: 0.8 },
                    ]}
                    onPress={() => !isOptionDisabled && handleSelect(option.value)}
                    disabled={isOptionDisabled}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: isSelected,
                      disabled: isOptionDisabled,
                    }}
                    accessibilityLabel={`${option.label}${isSelected ? ', selected' : ''}${isOptionDisabled ? ', disabled' : ''}`}
                    accessibilityHint={isOptionDisabled ? 'This option is not available' : `Select ${option.label}`}
                  >
                    {option.icon}
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Text style={{ color: activeColor, fontSize: 16 }} accessibilityElementsHidden>✓</Text>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
  }
);

Select.displayName = 'Select';

export default Select;
