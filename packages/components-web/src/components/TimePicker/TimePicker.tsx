'use client';

/**
 * TimePicker Component (Web)
 *
 * Time slot selection component.
 * Supports available/unavailable states and selection callback.
 */

import { forwardRef } from 'react';
import { Text, cn } from '@groxigo/ui-elements-web';

export interface TimeSlot {
  /**
   * Unique identifier for the time slot
   */
  id: string;

  /**
   * Display label (e.g., "9:00 AM - 11:00 AM")
   */
  label: string;

  /**
   * Start time
   */
  startTime?: string;

  /**
   * End time
   */
  endTime?: string;

  /**
   * Whether the slot is available
   * @default true
   */
  available?: boolean;

  /**
   * Additional premium fee for this slot
   */
  premiumFee?: number;

  /**
   * Number of available slots remaining
   */
  slotsRemaining?: number;
}

export interface TimePickerProps {
  /**
   * Available time slots
   */
  slots: TimeSlot[];

  /**
   * Currently selected slot ID
   */
  selectedId?: string;

  /**
   * Callback when a slot is selected
   */
  onSelect?: (slot: TimeSlot) => void;

  /**
   * Label for the picker
   */
  label?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Whether the picker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Layout orientation
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

const sizeClasses = {
  sm: {
    slot: 'px-3 py-2',
    text: 'text-sm',
    caption: 'text-xs',
  },
  md: {
    slot: 'px-4 py-3',
    text: 'text-base',
    caption: 'text-sm',
  },
  lg: {
    slot: 'px-5 py-4',
    text: 'text-lg',
    caption: 'text-base',
  },
};

const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      slots,
      selectedId,
      onSelect,
      label,
      helperText,
      error,
      disabled = false,
      orientation = 'vertical',
      size = 'md',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const config = sizeClasses[size];

    const formatPrice = (value: number) => `+$${value.toFixed(2)}`;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2', className)}
        data-testid={testID}
        {...props}
      >
        {/* Label */}
        {label && (
          <Text variant="bodySmall" weight="medium" className="text-text-primary">
            {label}
          </Text>
        )}

        {/* Time slots */}
        <div
          className={cn(
            'flex gap-2',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
        >
          {slots.map((slot) => {
            const isSelected = slot.id === selectedId;
            const isAvailable = slot.available !== false;
            const isDisabled = disabled || !isAvailable;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => !isDisabled && onSelect?.(slot)}
                disabled={isDisabled}
                className={cn(
                  'flex items-center justify-between',
                  'rounded-lg border transition-all',
                  config.slot,
                  orientation === 'horizontal' && 'flex-1 min-w-[140px]',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                    : 'border-border bg-white hover:border-primary-300',
                  isDisabled && 'opacity-50 cursor-not-allowed bg-gray-50',
                  error && !isSelected && 'border-error-300'
                )}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-2">
                  <ClockIcon
                    className={cn(
                      isSelected ? 'text-primary-500' : 'text-text-tertiary'
                    )}
                  />
                  <div className="flex flex-col items-start">
                    <Text
                      variant="body"
                      weight={isSelected ? 'semibold' : 'medium'}
                      className={cn(config.text, isSelected && 'text-primary-600')}
                    >
                      {slot.label}
                    </Text>
                    {slot.slotsRemaining !== undefined && isAvailable && (
                      <Text variant="caption" colorScheme="muted" className={config.caption}>
                        {slot.slotsRemaining} slot{slot.slotsRemaining !== 1 ? 's' : ''} left
                      </Text>
                    )}
                    {!isAvailable && (
                      <Text variant="caption" colorScheme="error" className={config.caption}>
                        Unavailable
                      </Text>
                    )}
                  </div>
                </div>

                {slot.premiumFee !== undefined && slot.premiumFee > 0 && (
                  <Text
                    variant="bodySmall"
                    weight="medium"
                    colorScheme="warning"
                    className="ml-2"
                  >
                    {formatPrice(slot.premiumFee)}
                  </Text>
                )}
              </button>
            );
          })}
        </div>

        {/* Helper text or error */}
        {(helperText || error) && (
          <Text
            variant="caption"
            colorScheme={error ? 'error' : 'muted'}
          >
            {error || helperText}
          </Text>
        )}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
