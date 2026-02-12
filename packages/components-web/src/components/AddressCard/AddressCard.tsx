'use client';

import { forwardRef } from 'react';
import type {
  AddressCardPropsBase,
  AddressType,
} from '@groxigo/contracts/components/address-card';
import { Radio, Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './AddressCard.module.css';

export type { AddressType };

export interface AddressCardProps extends AddressCardPropsBase {}

export const AddressCard = forwardRef<HTMLDivElement, AddressCardProps>(
  (
    {
      id,
      type,
      label,
      line1,
      line2,
      selected = false,
      onSelect,
      onEdit,
      onDelete,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          selected ? styles.rootSelected : styles.rootDefault,
          className
        )}
        data-testid={testID}
        data-address-id={id}
      >
        {/* Radio button */}
        <Radio
          value={id}
          size="md"
          checked={selected}
          className={styles.radio}
          onSelect={onSelect}
          aria-label={`Select ${label} address`}
        />

        {/* Content: label + address lines */}
        <div className={styles.content}>
          <span className={styles.label}>{label}</span>
          <span className={styles.addressLine}>{line1}</span>
          {line2 && <span className={styles.addressLine}>{line2}</span>}
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onPress={onEdit}
              className={styles.actionButton}
              aria-label={`Edit ${label} address`}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onPress={onDelete}
              className={styles.actionButton}
              aria-label={`Delete ${label} address`}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    );
  }
);

AddressCard.displayName = 'AddressCard';
export default AddressCard;
