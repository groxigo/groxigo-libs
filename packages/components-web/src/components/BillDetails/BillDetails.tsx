'use client';

import { forwardRef } from 'react';
import type { BillDetailsPropsBase, BillDetailsLineItem } from '@groxigo/contracts/components/bill-details';
import { Divider } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './BillDetails.module.css';

export interface BillDetailsProps extends BillDetailsPropsBase {
  className?: string;
}

const LINE_TYPE_CLASS: Record<string, string> = {
  savings: styles.valueSavings,
  free: styles.valueFree,
};

export const BillDetails = forwardRef<HTMLDivElement, BillDetailsProps>(
  (
    {
      items,
      total,
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
        {/* ── Line items ── */}
        {items.map((item, index) => (
          <div className={styles.row} key={`${item.label}-${index}`}>
            <span className={styles.label}>{item.label}</span>
            <span
              className={clsx(
                styles.value,
                item.type && LINE_TYPE_CLASS[item.type]
              )}
            >
              {item.value}
            </span>
          </div>
        ))}

        {/* ── Divider ── */}
        <Divider />

        {/* ── Total row ── */}
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>{total.label}</span>
          <span className={styles.totalValue}>{total.value}</span>
        </div>
      </div>
    );
  }
);

BillDetails.displayName = 'BillDetails';
export default BillDetails;
