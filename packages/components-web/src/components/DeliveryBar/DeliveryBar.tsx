/**
 * DeliveryBar Component (Web)
 *
 * Displays delivery address, estimated delivery time, and order countdown.
 * Implements @groxigo/contracts DeliveryBarPropsBase.
 */

'use client';

import React, { forwardRef, useState, useEffect, useMemo } from 'react';
import { cn, Text, Icon } from '@groxigo/ui-elements-web';
import type {
  DeliveryBarPropsBase,
  DeliveryAddress,
  DeliveryBarSection,
} from '@groxigo/contracts';

// Try to import Lottie - it's an optional peer dependency
let Lottie: React.ComponentType<any> | null = null;
try {
  Lottie = require('lottie-react').default;
} catch {
  // lottie-react not available
}

const sectionClasses: Record<DeliveryBarSection, string> = {
  default: 'bg-surface-secondary',
  groceries: 'bg-primary-50',
  recipes: 'bg-secondary-50',
};

/**
 * Default address formatter
 */
function defaultFormatAddress(address: DeliveryAddress): string {
  if (address.city && address.state) {
    return `${address.city}, ${address.state}`;
  }
  return address.line1;
}

export interface DeliveryBarProps extends DeliveryBarPropsBase {
  /** Custom render function for address display */
  renderAddress?: (address: DeliveryAddress) => React.ReactNode;

  /** Custom render function for right side actions */
  renderActions?: () => React.ReactNode;

  /** Whether to show the delivery time section */
  showDeliveryTime?: boolean;

  /** Whether to show the countdown section */
  showCountdown?: boolean;
}

export const DeliveryBar = forwardRef<HTMLDivElement, DeliveryBarProps>(
  (
    {
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
      className,
      testID,
      ...props
    },
    ref
  ) => {
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

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          isCompact ? 'py-2 px-4' : 'py-3 px-4 md:px-6',
          sectionClasses[section],
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Lottie Background */}
        {showLottieBackground && Lottie && lottieSource && (
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <Lottie animationData={lottieSource} loop autoplay className="w-full h-full" />
          </div>
        )}

        {/* Content */}
        <div className="relative flex items-start justify-between gap-4">
          {/* Address Section */}
          <button
            type="button"
            className={cn(
              'flex-1 text-left',
              onAddressPress && 'cursor-pointer hover:opacity-80 transition-opacity'
            )}
            onClick={onAddressPress}
            disabled={!onAddressPress}
          >
            {renderAddress && address ? (
              renderAddress(address)
            ) : (
              <div className="space-y-1">
                {/* Address Row */}
                <div className="flex items-center gap-1">
                  <Icon
                    name="location"
                    size="sm"
                    className="text-text-secondary"
                  />
                  <Text variant="caption" className="text-text-secondary">
                    {addressDisplay}
                  </Text>
                  {onAddressPress && (
                    <Icon
                      name="chevron-down"
                      size="xs"
                      className="text-text-tertiary"
                    />
                  )}
                </div>

                {/* Delivery Time & Countdown */}
                {address && !isBrowseMode && (
                  <div className="space-y-0.5">
                    {showDeliveryTime && deliveryTime && (
                      <div className="flex items-center gap-2">
                        <Text variant="bodySmall" weight="semibold" className="text-text-secondary">
                          Est. delivery
                        </Text>
                        <Text variant="bodySmall" weight="semibold" className="text-text-primary">
                          {deliveryTime}
                        </Text>
                      </div>
                    )}

                    {showCountdown && countdownMinutes !== undefined && countdownMinutes > 0 && (
                      <div className="flex items-center gap-1">
                        <Icon
                          name="clock"
                          size="xs"
                          className="text-success"
                        />
                        <Text variant="caption" className="text-success">
                          {countdownText}
                        </Text>
                      </div>
                    )}
                  </div>
                )}

                {/* Browse Mode Message */}
                {isBrowseMode && (
                  <Text variant="caption" className="text-warning italic">
                    {browseModeMessage}
                  </Text>
                )}
              </div>
            )}
          </button>

          {/* Actions Section */}
          {renderActions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {renderActions()}
            </div>
          )}
        </div>
      </div>
    );
  }
);

DeliveryBar.displayName = 'DeliveryBar';

export default DeliveryBar;
