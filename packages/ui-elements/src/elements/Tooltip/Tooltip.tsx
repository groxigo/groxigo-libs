/**
 * Tooltip Component
 *
 * A tooltip component that works across iOS, Android, and Web.
 * Shows contextual information on hover (web) or long press (mobile).
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useEffect, useMemo, useCallback, useRef, useState, forwardRef } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
  FlexAlignType,
} from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { TooltipProps, TooltipPlacement } from './Tooltip.types';

// ============================================
// ARROW COMPONENT
// ============================================

interface ArrowProps {
  placement: TooltipPlacement;
  color: string;
}

const Arrow: React.FC<ArrowProps> = ({ placement, color }) => {
  const size = 6;

  const getArrowStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
    };

    const isTop = placement.startsWith('top');
    const isBottom = placement.startsWith('bottom');
    const isLeft = placement === 'left';
    const isRight = placement === 'right';

    if (isTop) {
      return {
        ...baseStyle,
        borderLeftWidth: size,
        borderRightWidth: size,
        borderTopWidth: size,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -1,
      };
    }

    if (isBottom) {
      return {
        ...baseStyle,
        borderLeftWidth: size,
        borderRightWidth: size,
        borderBottomWidth: size,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
        marginBottom: -1,
      };
    }

    if (isLeft) {
      return {
        ...baseStyle,
        borderTopWidth: size,
        borderBottomWidth: size,
        borderLeftWidth: size,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: color,
        marginLeft: -1,
      };
    }

    if (isRight) {
      return {
        ...baseStyle,
        borderTopWidth: size,
        borderBottomWidth: size,
        borderRightWidth: size,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: color,
        marginRight: -1,
      };
    }

    return baseStyle;
  };

  return <View style={getArrowStyle()} />;
};

// ============================================
// TOOLTIP COMPONENT
// ============================================

export const Tooltip = forwardRef<ViewType, TooltipProps>(
  (
    {
      content,
      children,
      placement = 'top',
      showDelay = 0,
      hideDelay = 0,
      disabled = false,
      showArrow = true,
      style,
      contentStyle,
      maxWidth = 250,
      accessibilityLabel,
      visible: controlledVisible,
      onVisibleChange,
    },
    ref
  ) => {
  const theme = useTheme();
  const [internalVisible, setInternalVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [tooltipLayout, setTooltipLayout] = useState({ width: 0, height: 0 });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<View>(null);

  const isVisible = controlledVisible !== undefined ? controlledVisible : internalVisible;

  const setVisible = useCallback(
    (value: boolean) => {
      if (controlledVisible === undefined) {
        setInternalVisible(value);
      }
      onVisibleChange?.(value);
    },
    [controlledVisible, onVisibleChange]
  );

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Animate tooltip
  // useNativeDriver is not supported on web
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver,
      }).start();
    }
  }, [isVisible, fadeAnim, useNativeDriver]);

  const show = useCallback(() => {
    if (disabled) return;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    if (showDelay > 0) {
      showTimeoutRef.current = setTimeout(() => setVisible(true), showDelay);
    } else {
      setVisible(true);
    }
  }, [disabled, showDelay, setVisible]);

  const hide = useCallback(() => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);

    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => setVisible(false), hideDelay);
    } else {
      setVisible(false);
    }
  }, [hideDelay, setVisible]);

  const handleTriggerLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setTriggerLayout({ x, y, width, height });
  }, []);

  const handleTooltipLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipLayout({ width, height });
  }, []);

  const styles = useMemo(() => {
    const tooltipBg = theme.colors.text;

    return StyleSheet.create({
      container: {
        position: 'relative',
      },
      tooltipWrapper: {
        position: 'absolute',
        zIndex: theme.zIndex.tooltip,
      },
      tooltip: {
        backgroundColor: tooltipBg,
        borderRadius: theme.radius.sm,
        paddingHorizontal: 10,
        paddingVertical: 6,
        maxWidth,
        ...theme.shadows.md,
      },
      tooltipText: {
        color: theme.colors.surface,
        fontSize: 13,
        lineHeight: 18,
      },
      arrowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }, [theme, maxWidth]);

  // Calculate tooltip position based on placement
  const getTooltipPosition = useMemo((): ViewStyle => {
    const gap = 8;
    const { width: tw, height: th } = tooltipLayout;
    const { width: triggerW, height: triggerH } = triggerLayout;

    const positions: Record<TooltipPlacement, ViewStyle> = {
      top: {
        bottom: triggerH + gap,
        left: (triggerW - tw) / 2,
      },
      'top-start': {
        bottom: triggerH + gap,
        left: 0,
      },
      'top-end': {
        bottom: triggerH + gap,
        right: 0,
      },
      bottom: {
        top: triggerH + gap,
        left: (triggerW - tw) / 2,
      },
      'bottom-start': {
        top: triggerH + gap,
        left: 0,
      },
      'bottom-end': {
        top: triggerH + gap,
        right: 0,
      },
      left: {
        right: triggerW + gap,
        top: (triggerH - th) / 2,
      },
      right: {
        left: triggerW + gap,
        top: (triggerH - th) / 2,
      },
    };

    return positions[placement] || positions.top;
  }, [placement, tooltipLayout, triggerLayout]);

  const getArrowPosition = useMemo((): ViewStyle => {
    const isTop = placement.startsWith('top');
    const isBottom = placement.startsWith('bottom');
    const isStart = placement.endsWith('-start');
    const isEnd = placement.endsWith('-end');

    const getAlignItems = (): FlexAlignType => {
      if (isStart) return 'flex-start';
      if (isEnd) return 'flex-end';
      return 'center';
    };

    if (isTop || isBottom) {
      return {
        flexDirection: isTop ? 'column' : 'column-reverse',
        alignItems: getAlignItems(),
        paddingHorizontal: isStart || isEnd ? 12 : 0,
      };
    }

    return {
      flexDirection: placement === 'left' ? 'row' : 'row-reverse',
      alignItems: 'center',
    };
  }, [placement]);

  // Web-specific hover handlers
  const webProps = Platform.OS === 'web'
    ? {
        onMouseEnter: show,
        onMouseLeave: hide,
      }
    : {};

  // Mobile uses long press
  const mobileProps = Platform.OS !== 'web'
    ? {
        onLongPress: show,
        onPressOut: hide,
        delayLongPress: 300,
      }
    : {};

  const tooltipContent = typeof content === 'string' ? (
    <Text style={styles.tooltipText}>{content}</Text>
  ) : (
    content
  );

  return (
    <View ref={ref} style={styles.container}>
      <Pressable
        ref={triggerRef}
        onLayout={handleTriggerLayout}
        accessibilityHint={typeof content === 'string' ? content : accessibilityLabel}
        {...webProps}
        {...mobileProps}
      >
        {children}
      </Pressable>

      {isVisible && (
        <Animated.View
          style={[
            styles.tooltipWrapper,
            getTooltipPosition,
            { opacity: fadeAnim },
          ]}
          onLayout={handleTooltipLayout}
          accessibilityLabel={accessibilityLabel || (typeof content === 'string' ? content : undefined)}
        >
          <View style={getArrowPosition}>
            {showArrow && placement.startsWith('bottom') && (
              <View style={styles.arrowContainer}>
                <Arrow placement={placement} color={theme.colors.text} />
              </View>
            )}
            {showArrow && placement === 'right' && (
              <View style={styles.arrowContainer}>
                <Arrow placement={placement} color={theme.colors.text} />
              </View>
            )}
            <View style={[styles.tooltip, contentStyle, style]}>
              {tooltipContent}
            </View>
            {showArrow && placement.startsWith('top') && (
              <View style={styles.arrowContainer}>
                <Arrow placement={placement} color={theme.colors.text} />
              </View>
            )}
            {showArrow && placement === 'left' && (
              <View style={styles.arrowContainer}>
                <Arrow placement={placement} color={theme.colors.text} />
              </View>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
