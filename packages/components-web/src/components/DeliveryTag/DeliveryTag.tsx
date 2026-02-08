'use client';

import { forwardRef } from 'react';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './DeliveryTag.module.css';

export type DeliveryTagVariant = 'express' | 'standard' | 'scheduled';

export interface DeliveryTagProps {
  /** Visual variant determining background and text color */
  variant: DeliveryTagVariant;
  /** Display label (e.g. "EXPRESS", "9 MINS", "Scheduled 2-3 hrs") */
  label: string;
  /** Optional icon name hint (renders as text if provided) */
  icon?: string;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/** Map DeliveryTag variant to Badge colorScheme */
const VARIANT_COLOR_SCHEME: Record<DeliveryTagVariant, 'success' | 'neutral' | 'info'> = {
  express: 'success',
  standard: 'neutral',
  scheduled: 'info',
};

export const DeliveryTag = forwardRef<HTMLSpanElement, DeliveryTagProps>(
  ({ variant, label, icon, className, testID }, ref) => {
    return (
      <span ref={ref} className={clsx(styles.root, className)} data-testid={testID}>
        <Badge variant="subtle" colorScheme={VARIANT_COLOR_SCHEME[variant]} size="xs">
          {icon && (
            <span aria-hidden="true">{icon}</span>
          )}
          {label}
        </Badge>
      </span>
    );
  }
);

DeliveryTag.displayName = 'DeliveryTag';
export default DeliveryTag;
