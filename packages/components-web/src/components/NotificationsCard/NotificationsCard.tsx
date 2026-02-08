'use client';

import { forwardRef, useCallback } from 'react';
import type {
  NotificationsCardPropsBase,
  NotificationSetting,
} from '@groxigo/contracts/components/notifications-card';
import { Switch } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './NotificationsCard.module.css';

export type { NotificationSetting };

export interface NotificationsCardProps extends NotificationsCardPropsBase {}

export const NotificationsCard = forwardRef<HTMLDivElement, NotificationsCardProps>(
  (
    {
      title = 'Notifications',
      settings,
      onToggle,
      className,
      testID,
    },
    ref
  ) => {
    const handleToggle = useCallback(
      (key: string, enabled: boolean) => {
        onToggle?.(key, enabled);
      },
      [onToggle]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.list}>
          {settings.map((setting) => (
            <div key={setting.key} className={styles.item}>
              <span className={styles.label}>{setting.label}</span>
              <Switch
                checked={setting.enabled}
                onChange={(checked) => handleToggle(setting.key, checked)}
                size="sm"
                colorScheme="primary"
                testID={testID ? `${testID}-${setting.key}` : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

NotificationsCard.displayName = 'NotificationsCard';
export default NotificationsCard;
