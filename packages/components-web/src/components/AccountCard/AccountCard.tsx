'use client';

import { forwardRef, type ReactNode } from 'react';
import type { AccountCardPropsBase } from '@groxigo/contracts/components/account-card';
import { Button } from '@groxigo/ui-elements-web';
import { Edit } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './AccountCard.module.css';

export interface AccountCardProps extends AccountCardPropsBase {
  children?: ReactNode;
}

export const AccountCard = forwardRef<HTMLDivElement, AccountCardProps>(
  (
    {
      title,
      onEdit,
      children,
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
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {onEdit && (
            <Button
              variant="ghost"
              colorScheme="primary"
              size="sm"
              onPress={onEdit}
              leftIcon={<Edit size={16} />}
              testID={testID ? `${testID}-edit` : undefined}
            >
              Edit
            </Button>
          )}
        </div>

        {children && <div className={styles.content}>{children}</div>}
      </div>
    );
  }
);

AccountCard.displayName = 'AccountCard';
export default AccountCard;
