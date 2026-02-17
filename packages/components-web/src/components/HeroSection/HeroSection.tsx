'use client';

import { forwardRef, useState, useMemo } from 'react';
import type { FormEvent } from 'react';
import type { HeroSectionPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './HeroSection.module.css';

export interface HeroSectionProps extends HeroSectionPropsBase {
  className?: string;
}

/* ─── Inline SVG brand icons (colored, matching AuthCard) ─── */

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10z" fill="#1877F2" />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
    <path d="M14.94 14.34c-.35.81-.52 1.17-.97 1.89-.63.99-1.52 2.23-2.62 2.24-1.23.01-1.55-.8-3.22-.79-1.67.01-2.02.81-3.25.8-1.1-.01-1.94-1.11-2.57-2.1C.73 13.73.29 10.65 1.46 8.7c.82-1.37 2.25-2.17 3.57-2.17 1.33 0 2.16.8 3.26.8 1.07 0 1.72-.81 3.26-.81 1.17 0 2.44.64 3.25 1.74-2.85 1.56-2.39 5.63.14 6.08zM11.17 4.4c.49-.63.86-1.52.73-2.43-.8.05-1.74.56-2.29 1.22-.5.59-.92 1.5-.76 2.37.88.03 1.79-.49 2.32-1.16z" />
  </svg>
);

/* ─── Grocery & utensil SVG icons for animated background ─── */

const groceryIcons = [
  // Chili pepper — red body, green stem
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M24 8C24 8 22 6 20 6C18 6 16 8 16 8" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 10C14 14 8 22 10 32C12 40 20 44 28 40C36 36 40 26 36 18C34 14 30 12 26 12C22 12 20 14 20 18C20 22 22 26 26 28" stroke="#962D22" strokeWidth="2" strokeLinecap="round" fill="#E74C3C" />
    </svg>
  ),
  // Onion — purple body, green sprout
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="30" rx="14" ry="12" stroke="#6C3483" strokeWidth="2" fill="#C39BD3" />
      <path d="M24 18C24 18 20 10 24 6C28 10 24 18 24 18Z" stroke="#2D5A27" strokeWidth="2" fill="#58D68D" />
      <path d="M18 22C20 28 20 36 18 42" stroke="#6C3483" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M30 22C28 28 28 36 30 42" stroke="#6C3483" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
  // Mortar & pestle — stone gray bowl, wood pestle
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M10 24C10 24 8 38 12 40C16 42 32 42 36 40C40 38 38 24 38 24Z" stroke="#5D6D7E" strokeWidth="2" strokeLinecap="round" fill="#ABB2B9" />
      <line x1="8" y1="24" x2="40" y2="24" stroke="#5D6D7E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="22" x2="38" y2="8" stroke="#6F4E37" strokeWidth="3" strokeLinecap="round" />
      <circle cx="39" cy="7" r="2.5" stroke="#6F4E37" strokeWidth="2" fill="#A0724A" />
    </svg>
  ),
  // Rolling pin — warm wood
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <rect x="12" y="18" width="24" height="12" rx="6" stroke="#6F4E37" strokeWidth="2" fill="#C4956A" />
      <line x1="12" y1="24" x2="6" y2="24" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="24" x2="42" y2="24" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="5" cy="24" r="2" stroke="#5C3D2E" strokeWidth="2" fill="#8B6B4A" />
      <circle cx="43" cy="24" r="2" stroke="#5C3D2E" strokeWidth="2" fill="#8B6B4A" />
    </svg>
  ),
  // Pan — dark metal, wood handle
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <circle cx="20" cy="26" r="14" stroke="#3D4F5F" strokeWidth="2" fill="#85929E" />
      <line x1="32" y1="20" x2="46" y2="10" stroke="#6F4E37" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  // Leaf / herb — green
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M8 40C8 40 10 20 24 10C38 20 40 40 40 40Z" stroke="#1E8449" strokeWidth="2" strokeLinecap="round" fill="#58D68D" />
      <path d="M24 10C24 10 24 25 24 40" stroke="#1E8449" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 28C20 24 24 22 24 22" stroke="#1E8449" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 28C28 24 24 22 24 22" stroke="#1E8449" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // Banana — yellow
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M12 8C12 8 8 16 8 24C8 36 18 42 30 40C38 38 42 32 42 28L12 8Z" stroke="#B7950B" strokeWidth="2" strokeLinecap="round" fill="#F9E154" />
      <path d="M12 8C16 10 28 14 42 28" stroke="#B7950B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // Garlic — off-white bulb
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M24 42C16 42 10 36 10 28C10 20 16 16 20 14L24 6L28 14C32 16 38 20 38 28C38 36 32 42 24 42Z" stroke="#A09070" strokeWidth="2" fill="#F5F0E1" />
      <path d="M24 16L24 42" stroke="#C8BFA6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  // Spoon — silver
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="14" rx="8" ry="10" stroke="#717D7E" strokeWidth="2" fill="#BDC3C7" />
      <line x1="24" y1="24" x2="24" y2="44" stroke="#717D7E" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  // Pot — copper body, metal handles
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="16" width="32" height="24" rx="4" stroke="#8B5A2B" strokeWidth="2" fill="#D4956A" />
      <line x1="6" y1="16" x2="42" y2="16" stroke="#8B5A2B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 16C4 16 4 12 6 12" stroke="#5D6D7E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M42 16C44 16 44 12 42 12" stroke="#5D6D7E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M20 8C20 6 22 4 24 4C26 4 28 6 28 8" stroke="#5D6D7E" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  // Whisk — silver wires, wood handle
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <line x1="24" y1="20" x2="24" y2="44" stroke="#6F4E37" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 20C16 10 20 4 24 4C28 4 32 10 32 20Z" stroke="#717D7E" strokeWidth="2" strokeLinecap="round" fill="#BDC3C7" />
      <path d="M18 20C18 12 21 6 24 6C27 6 30 12 30 20" stroke="#717D7E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  ),
  // Carrot — orange body, green top
  (s: number) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M24 44L16 16L32 16Z" stroke="#CA6F1E" strokeWidth="2" strokeLinejoin="round" fill="#F0B27A" />
      <path d="M18 8C20 12 22 14 24 16" stroke="#1E8449" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 8C28 12 26 14 24 16" stroke="#1E8449" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 4C24 8 24 14 24 16" stroke="#1E8449" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
];

/* ─── Deterministic scatter position generator ─── */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

interface ScatterPosition {
  x: number;
  y: number;
  iconIndex: number;
  size: number;
  rotation: number;
  opacity: number;
}

function generateScatterPositions(seed: number): ScatterPosition[] {
  const rand = seededRandom(seed);
  const positions: ScatterPosition[] = [];
  const sizes = [28, 32, 36, 40, 44];
  const opacities = [0.25, 0.30, 0.35, 0.40, 0.45];

  // Grid-with-jitter: divide into cells, place one icon per cell with random offset
  const cols = 10;
  const rows = 7;
  const cellW = 100 / cols;
  const cellH = 100 / rows;
  const jitter = 0.6; // how far within cell the icon can shift (0-1)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = (col + 0.2 + rand() * jitter) * cellW;
      const y = (row + 0.2 + rand() * jitter) * cellH;

      positions.push({
        x,
        y,
        iconIndex: Math.floor(rand() * groceryIcons.length),
        size: sizes[Math.floor(rand() * sizes.length)],
        rotation: (rand() - 0.5) * 40,
        opacity: opacities[Math.floor(rand() * opacities.length)],
      });
    }
  }

  return positions;
}

/* ─── Animated icons background ─── */

function AnimatedIconsBackground() {
  const positions = useMemo(() => generateScatterPositions(42), []);

  return (
    <div className={styles.iconsContainer} aria-hidden="true">
      <div className={styles.iconsStrip}>
        {/* First tile (left half of strip: 0-50%) */}
        {positions.map((pos, i) => (
          <div
            key={i}
            className={styles.scatterIcon}
            style={{
              left: `${pos.x / 2}%`,
              top: `${pos.y}%`,
              transform: `rotate(${pos.rotation}deg)`,
              opacity: pos.opacity,
            }}
          >
            {groceryIcons[pos.iconIndex](pos.size)}
          </div>
        ))}
        {/* Second tile (right half: 50-100%) — duplicate for seamless loop */}
        {positions.map((pos, i) => (
          <div
            key={`d-${i}`}
            className={styles.scatterIcon}
            style={{
              left: `${pos.x / 2 + 50}%`,
              top: `${pos.y}%`,
              transform: `rotate(${pos.rotation}deg)`,
              opacity: pos.opacity,
            }}
          >
            {groceryIcons[pos.iconIndex](pos.size)}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * HeroSection — full-bleed hero banner with headline, subheadline,
 * email capture form, "or" divider, and SSO icon buttons.
 *
 * Warm cream background with animated scattered grocery/utensil
 * SVG icons scrolling left-to-right via CSS marquee.
 *
 * Heights: 480px mobile, 520px tablet, 600px large.
 */
export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      headline,
      subheadline,
      backgroundImage,
      onGetStarted,
      ctaLabel = 'Continue',
      emailPlaceholder = 'Sign in or sign up using email',
      dividerText = 'or',
      onGoogleAuth,
      onFacebookAuth,
      onAppleAuth,
      onContinueAsGuest,
      guestLabel = 'Just browsing? Continue as guest',
      className,
      testID,
    },
    ref
  ) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        onGetStarted(email.trim());
      }
    };

    const hasSso = !!(onGoogleAuth || onFacebookAuth || onAppleAuth);

    return (
      <section
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        role="region"
        aria-label="Hero"
      >
        {backgroundImage && (
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
        )}

        <AnimatedIconsBackground />

        <div className={styles.content}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subheadline}>{subheadline}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.emailInput}
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className={styles.ctaButton}>
              {ctaLabel}
            </button>
          </form>

          {hasSso && (
            <>
              <div className={styles.dividerRow}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>{dividerText}</span>
                <span className={styles.dividerLine} />
              </div>

              <div className={styles.ssoIconRow}>
                {onGoogleAuth && (
                  <button
                    type="button"
                    className={styles.ssoIcon}
                    onClick={onGoogleAuth}
                    aria-label="Continue with Google"
                  >
                    <GoogleIcon />
                  </button>
                )}
                {onFacebookAuth && (
                  <button
                    type="button"
                    className={styles.ssoIcon}
                    onClick={onFacebookAuth}
                    aria-label="Continue with Facebook"
                  >
                    <FacebookIcon />
                  </button>
                )}
                {onAppleAuth && (
                  <button
                    type="button"
                    className={styles.ssoIcon}
                    onClick={onAppleAuth}
                    aria-label="Continue with Apple"
                  >
                    <AppleIcon />
                  </button>
                )}
              </div>
            </>
          )}

          {onContinueAsGuest && (
            <button
              type="button"
              className={styles.guestCta}
              onClick={onContinueAsGuest}
            >
              {guestLabel}
            </button>
          )}
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';
export default HeroSection;
