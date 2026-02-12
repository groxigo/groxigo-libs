'use client';

import { forwardRef } from 'react';
import type { FooterPropsBase } from '@groxigo/contracts/components';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './Footer.module.css';

export interface FooterProps extends FooterPropsBase {
  className?: string;
}

/**
 * Footer -- responsive site footer with link sections, social icons,
 * divider, and copyright text.
 *
 * Breakpoints:
 * - Mobile (375px): vertical stack, px=16, py=32
 * - Tablet (768px): sections in flex-row (flex-wrap), p=32
 * - Desktop (1024px+): no-wrap row, px=80, py=40
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ sections, socialLinks, copyrightText, className, testID }, ref) => {
    return (
      <footer
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        role="contentinfo"
      >
        <div className={styles.inner}>
        {/* Link sections */}
        {sections && sections.length > 0 && (
          <nav className={styles.sections} aria-label="Footer navigation">
            {sections.map((section) => (
              <div key={section.title} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.links} role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          className={styles.link}
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onPress={link.onPress}
                          className={styles.linkButton}
                        >
                          {link.label}
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}

        {/* Social icons */}
        {socialLinks && socialLinks.length > 0 && (
          <div className={styles.socialIcons} aria-label="Social media links">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                className={styles.socialIcon}
                aria-label={social.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* The consuming app can customize this via CSS or render icons externally.
                    Show the platform initial as a minimal fallback. */}
                <span aria-hidden="true">
                  {social.platform.charAt(0).toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Divider */}
        {(copyrightText || (socialLinks && socialLinks.length > 0)) && (
          <hr className={styles.divider} />
        )}

        {/* Copyright */}
        {copyrightText && (
          <div className={styles.copyright}>
            <span>&copy;</span>
            <span>{copyrightText}</span>
          </div>
        )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
export default Footer;
