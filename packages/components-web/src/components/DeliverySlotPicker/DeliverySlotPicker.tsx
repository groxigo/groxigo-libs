'use client';

import { forwardRef, useCallback } from 'react';
import type {
  DeliverySlotPickerPropsBase,
  DeliveryDate,
  DeliveryTimeSlot,
} from '@groxigo/contracts/components/delivery-slot-picker';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './DeliverySlotPicker.module.css';

export type { DeliveryDate, DeliveryTimeSlot };

export interface DeliverySlotPickerProps extends DeliverySlotPickerPropsBase {
  className?: string;
}

export const DeliverySlotPicker = forwardRef<HTMLDivElement, DeliverySlotPickerProps>(
  (
    {
      dates,
      timeSlots,
      selectedDate,
      selectedSlot,
      onDateSelect,
      onSlotSelect,
      className,
      testID,
    },
    ref
  ) => {
    const handleDateSelect = useCallback(
      (dateKey: string) => {
        onDateSelect?.(dateKey);
      },
      [onDateSelect]
    );

    const handleSlotSelect = useCallback(
      (slotKey: string) => {
        onSlotSelect?.(slotKey);
      },
      [onSlotSelect]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Date chips — horizontal scrollable row */}
        <div className={styles.dates} role="radiogroup" aria-label="Select delivery date">
          {dates.map((d) => {
            const isSelected = d.key === selectedDate;
            return (
              <Button
                key={d.key}
                variant={isSelected ? 'solid' : 'outline'}
                colorScheme="primary"
                size="sm"
                onPress={() => handleDateSelect(d.key)}
                aria-checked={isSelected}
                className={clsx(
                  styles.dateChip,
                  isSelected ? styles.dateChipSelected : styles.dateChipDefault
                )}
              >
                <span
                  className={clsx(
                    styles.dateDay,
                    isSelected ? styles.textInverse : styles.textSecondary
                  )}
                >
                  {d.day}
                </span>
                <span
                  className={clsx(
                    styles.dateNumber,
                    isSelected ? styles.textInverse : styles.textPrimary
                  )}
                >
                  {d.date}
                </span>
                <span
                  className={clsx(
                    styles.dateMonth,
                    isSelected ? styles.textInverse : styles.textSecondary
                  )}
                >
                  {d.month}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Time slots — wrapping row of selectable chips */}
        <div className={styles.timeSlots} role="radiogroup" aria-label="Select delivery time">
          {timeSlots.map((slot) => {
            const isAvailable = slot.available !== false;
            const isSelected = slot.key === selectedSlot;

            return (
              <Button
                key={slot.key}
                variant={isSelected ? 'solid' : 'outline'}
                colorScheme="primary"
                size="sm"
                onPress={() => isAvailable && handleSlotSelect(slot.key)}
                disabled={!isAvailable}
                aria-checked={isSelected}
                className={clsx(
                  styles.timeSlot,
                  isSelected && styles.timeSlotSelected,
                  !isSelected && isAvailable && styles.timeSlotDefault,
                  !isAvailable && styles.timeSlotDisabled
                )}
              >
                <span
                  className={clsx(
                    styles.timeLabel,
                    isSelected && styles.timeLabelSelected,
                    !isSelected && isAvailable && styles.timeLabelDefault,
                    !isAvailable && styles.timeLabelDisabled
                  )}
                >
                  {slot.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
);

DeliverySlotPicker.displayName = 'DeliverySlotPicker';
export default DeliverySlotPicker;
