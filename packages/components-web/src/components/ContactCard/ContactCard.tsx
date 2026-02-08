'use client';

import { forwardRef } from 'react';
import type { ContactCardPropsBase } from '@groxigo/contracts/components/contact-card';
import { Button } from '@groxigo/ui-elements-web';
import { Phone, Envelope } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './ContactCard.module.css';

export interface ContactCardProps extends ContactCardPropsBase {}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(
  (
    {
      title = 'Contact Us',
      description,
      email,
      phone,
      onContact,
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
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.details}>
          {email && (
            <div className={styles.row}>
              <Envelope size={18} />
              <a href={`mailto:${email}`} className={styles.link}>{email}</a>
            </div>
          )}
          {phone && (
            <div className={styles.row}>
              <Phone size={18} />
              <a href={`tel:${phone}`} className={styles.link}>{phone}</a>
            </div>
          )}
        </div>

        {onContact && (
          <Button
            variant="outline"
            colorScheme="primary"
            size="md"
            fullWidth
            onPress={onContact}
            testID={testID ? `${testID}-contact` : undefined}
          >
            Get in Touch
          </Button>
        )}
      </div>
    );
  }
);

ContactCard.displayName = 'ContactCard';
export default ContactCard;
