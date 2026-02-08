'use client';

import { forwardRef } from 'react';
import type { DriverCardPropsBase } from '@groxigo/contracts/components/driver-card';
import { Avatar, Button } from '@groxigo/ui-elements-web';
import { Phone } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './DriverCard.module.css';

export interface DriverCardProps extends DriverCardPropsBase {}

export const DriverCard = forwardRef<HTMLDivElement, DriverCardProps>(
  (
    {
      name,
      vehicle,
      avatarUrl,
      phone,
      onCall,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <Avatar
          src={avatarUrl}
          name={name}
          size="md"
        />

        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          {vehicle && <span className={styles.vehicle}>{vehicle}</span>}
        </div>

        {onCall && (
          <Button
            variant="solid"
            colorScheme="primary"
            size="sm"
            onPress={onCall}
            leftIcon={<Phone size={18} />}
            testID={testID ? `${testID}-call` : undefined}
          >
            Call
          </Button>
        )}
      </div>
    );
  }
);

DriverCard.displayName = 'DriverCard';
export default DriverCard;
