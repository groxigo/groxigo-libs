import { useState, useEffect, useMemo } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Text, Icon, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import type { DeliveryBarProps, DeliveryAddress } from './DeliveryBar.types';

// Try to import Lottie - it's an optional peer dependency
let LottieView: React.ComponentType<any> | null = null;
try {
  LottieView = require('lottie-react-native').default;
} catch {
  // lottie-react-native not available
}

/**
 * Default address formatter
 */
function defaultFormatAddress(address: DeliveryAddress): string {
  if (address.city && address.state) {
    return `${address.city}, ${address.state}`;
  }
  return address.line1;
}

/**
 * DeliveryBar component
 *
 * Displays delivery address, estimated delivery time, and order countdown.
 * Supports optional Lottie animated backgrounds.
 */
export const DeliveryBar = ({
  address,
  formatAddress = defaultFormatAddress,
  deliveryTime,
  countdownMinutes,
  nextSlot,
  isBrowseMode = false,
  browseModeMessage = 'Browse mode - ordering disabled',
  onAddressPress,
  onCountdownComplete,
  lottieSource,
  showLottieBackground = false,
  section = 'default',
  isCompact = false,
  showDeliveryTime = true,
  showCountdown = true,
  renderAddress,
  renderActions,
  testID,
  style,
  ...props
}: DeliveryBarProps) => {
  const theme = useTheme();
  const { fontSize, spacing, iconSize } = useDeviceType();
  const [minutesRemaining, setMinutesRemaining] = useState(countdownMinutes ?? 0);

  // Update countdown every minute
  useEffect(() => {
    if (countdownMinutes === undefined || countdownMinutes <= 0) return;

    setMinutesRemaining(countdownMinutes);

    const interval = setInterval(() => {
      setMinutesRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          onCountdownComplete?.();
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [countdownMinutes, onCountdownComplete]);

  // Format countdown text
  const countdownText = useMemo(() => {
    if (minutesRemaining <= 0) {
      return 'Order now for next slot';
    }
    if (minutesRemaining < 60) {
      return `Order in ${minutesRemaining} min`;
    }
    const hours = Math.floor(minutesRemaining / 60);
    const mins = minutesRemaining % 60;
    return mins > 0 ? `Order in ${hours}h ${mins}m` : `Order in ${hours}h`;
  }, [minutesRemaining]);

  // Display text for address
  const addressDisplay = address ? formatAddress(address) : 'Set delivery location';

  // Section-based background color
  const sectionColors: Record<string, string> = {
    default: theme.colors.surfaceSecondary,
    groceries: theme.colors.primaryMuted || theme.colors.surfaceSecondary,
    recipes: theme.colors.secondaryMuted || theme.colors.surfaceSecondary,
  };

  const backgroundColor = sectionColors[section] || sectionColors.default;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingHorizontal: spacing(16),
          paddingVertical: spacing(isCompact ? 8 : 12),
        },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {/* Lottie Background */}
      {showLottieBackground && LottieView && lottieSource && (
        <View style={styles.lottieContainer}>
          <LottieView
            source={lottieSource}
            autoPlay
            loop
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Address Section */}
        <Pressable
          style={styles.addressSection}
          onPress={onAddressPress}
          disabled={!onAddressPress}
        >
          {renderAddress && address ? (
            renderAddress(address)
          ) : (
            <>
              <View style={[styles.addressRow, { gap: spacing(4) }]}>
                <Icon
                  name="location"
                  size={iconSize(18)}
                  color={theme.colors.text}
                />
                <Text
                  variant="h4"
                  style={{ color: theme.colors.text }}
                >
                  {addressDisplay}
                </Text>
                {onAddressPress && (
                  <Icon
                    name="chevron-down"
                    size={iconSize(14)}
                    color={theme.colors.textSecondary}
                  />
                )}
              </View>

              {/* Delivery Time & Countdown */}
              {address && !isBrowseMode && (
                <View style={[styles.deliveryInfo, { gap: spacing(4) }]}>
                  {showDeliveryTime && deliveryTime && (
                    <View style={[styles.timeRow, { gap: spacing(8) }]}>
                      <Text
                        variant="bodySmall"
                        weight="semibold"
                        style={{ color: theme.colors.textSecondary, fontSize: fontSize(13) }}
                      >
                        Est. delivery
                      </Text>
                      <Text
                        variant="bodySmall"
                        weight="semibold"
                        style={{ color: theme.colors.text, fontSize: fontSize(14) }}
                      >
                        {deliveryTime}
                      </Text>
                    </View>
                  )}

                  {showCountdown && countdownMinutes !== undefined && countdownMinutes > 0 && (
                    <View style={[styles.countdownRow, { gap: spacing(4) }]}>
                      <Icon
                        name="clock"
                        size={iconSize(12)}
                        color={theme.colors.success}
                      />
                      <Text
                        variant="caption"
                        style={{ color: theme.colors.success, fontSize: fontSize(12) }}
                      >
                        {countdownText}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* Browse Mode Message */}
              {isBrowseMode && (
                <View style={[styles.deliveryInfo, { marginTop: spacing(4) }]}>
                  <Text
                    variant="caption"
                    style={{
                      color: theme.colors.warning,
                      fontStyle: 'italic',
                      fontSize: fontSize(12),
                    }}
                  >
                    {browseModeMessage}
                  </Text>
                </View>
              )}
            </>
          )}
        </Pressable>

        {/* Actions Section */}
        {renderActions && (
          <View style={styles.actionsSection}>{renderActions()}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  lottieContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addressSection: {
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryInfo: {
    marginTop: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DeliveryBar;
