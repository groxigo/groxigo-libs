'use client';

import { forwardRef, useState, useCallback, useMemo, useEffect, type FormEvent, type MouseEvent } from 'react';
import type {
  AuthCardPropsBase,
  AuthMode,
  AuthStep,
} from '@groxigo/contracts/components/auth-card';
import { Input, Button, Checkbox } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './AuthCard.module.css';

export type { AuthMode, AuthStep };

export interface AuthCardProps extends AuthCardPropsBase {
  className?: string;
}

/* ─── Inline SVG icons ─── */

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

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12.5 15l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Helper: compute initial step ─── */

function getInitialStep(mode?: AuthMode, initialEmail?: string): AuthStep {
  if (mode === 'signup') return 'signup';
  if (mode === 'signin' && initialEmail) return 'signin';
  return 'identify';
}

/* ─── AuthCard Component ─── */

const DEFAULT_AUTH_LABELS = {
  tagline: 'Fresh groceries delivered fast',
  continueButton: 'Continue',
  orDivider: 'or',
  welcomeBack: 'Welcome back',
  createAccount: 'Create your account',
  signInButton: 'Sign In',
  createAccountButton: 'Create Account',
  forgotPassword: 'Forgot Password?',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Password',
  createPasswordPlaceholder: 'Create Password',
  firstNamePlaceholder: 'First Name',
  lastNamePlaceholder: 'Last Name',
  phonePlaceholder: 'Phone Number',
  termsLabel: 'I agree to the Terms & Privacy Policy',
  googleAriaLabel: 'Continue with Google',
  facebookAriaLabel: 'Continue with Facebook',
  appleAriaLabel: 'Continue with Apple',
};

export const AuthCard = forwardRef<HTMLDivElement, AuthCardProps>(
  (
    {
      mode,
      initialEmail = '',
      onCheckEmail,
      onSignIn,
      onSignUp,
      onSubmit,
      onGoogleAuth,
      onFacebookAuth,
      onAppleAuth,
      onForgotPassword,
      isLoading = false,
      error,
      termsUrl,
      privacyUrl,
      labels: labelsProp,
      className,
      testID,
    },
    ref
  ) => {
    const l = { ...DEFAULT_AUTH_LABELS, ...labelsProp };
    const [step, setStep] = useState<AuthStep>(() => getInitialStep(mode, initialEmail));
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const hasSso = !!(onGoogleAuth || onFacebookAuth || onAppleAuth);

    // Auto-check email when opened with a pre-filled email and no explicit mode
    useEffect(() => {
      if (initialEmail && !mode && onCheckEmail && step === 'identify') {
        setIsChecking(true);
        onCheckEmail(initialEmail.trim())
          .then(({ exists }) => {
            setStep(exists ? 'signin' : 'signup');
          })
          .finally(() => {
            setIsChecking(false);
          });
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleBack = useCallback(() => {
      setPassword('');
      setFirstName('');
      setLastName('');
      setPhone('');
      setTermsAccepted(false);
      setStep('identify');
    }, []);

    const handleContinue = useCallback(
      async (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        if (onCheckEmail) {
          setIsChecking(true);
          try {
            const { exists } = await onCheckEmail(email.trim());
            setStep(exists ? 'signin' : 'signup');
          } finally {
            setIsChecking(false);
          }
        } else {
          setStep('signin');
        }
      },
      [email, onCheckEmail]
    );

    const handleSignIn = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        const handler = onSignIn ?? onSubmit;
        handler?.(email.trim(), password);
      },
      [email, password, isLoading, onSignIn, onSubmit]
    );

    const handleSignUp = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        onSignUp?.({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          termsAccepted,
        });
      },
      [email, password, firstName, lastName, phone, termsAccepted, isLoading, onSignUp]
    );

    const termsLabel = useMemo(() => {
      if (!termsUrl && !privacyUrl) return l.termsLabel;
      return (
        <span>
          {l.termsLabel}
        </span>
      );
    }, [termsUrl, privacyUrl, l.termsLabel]);

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* ── Step 1: Identify ── */}
        {step === 'identify' && (
          <>
            <div className={styles.logoArea}>
              <span className={styles.brand}>Groxigo</span>
              <span className={styles.tagline}>{l.tagline}</span>
            </div>

            <form className={styles.formArea} onSubmit={handleContinue} noValidate>
              <Input
                type="email"
                placeholder={l.emailPlaceholder}
                value={email}
                onChangeText={setEmail}
                disabled={isChecking}
                size="sm"
                fullWidth
                autoComplete="email"
                name="email"
                testID={testID ? `${testID}-email` : undefined}
              />

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                size="sm"
                fullWidth
                loading={isChecking}
                testID={testID ? `${testID}-continue` : undefined}
              >
                {l.continueButton}
              </Button>
            </form>

            {hasSso && (
              <>
                <div className={styles.dividerRow}>
                  <span className={styles.dividerLine} />
                  <span className={styles.dividerText}>{l.orDivider}</span>
                  <span className={styles.dividerLine} />
                </div>

                <div className={styles.ssoIconRow}>
                  {onGoogleAuth && (
                    <button
                      type="button"
                      className={styles.ssoIcon}
                      onClick={onGoogleAuth}
                      disabled={isChecking}
                      aria-label={l.googleAriaLabel}
                    >
                      <GoogleIcon />
                    </button>
                  )}
                  {onFacebookAuth && (
                    <button
                      type="button"
                      className={styles.ssoIcon}
                      onClick={onFacebookAuth}
                      disabled={isChecking}
                      aria-label={l.facebookAriaLabel}
                    >
                      <FacebookIcon />
                    </button>
                  )}
                  {onAppleAuth && (
                    <button
                      type="button"
                      className={styles.ssoIcon}
                      onClick={onAppleAuth}
                      disabled={isChecking}
                      aria-label={l.appleAriaLabel}
                    >
                      <AppleIcon />
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* ── Step 2a: Sign In ── */}
        {step === 'signin' && (
          <>
            <div className={styles.stepHeader}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
                aria-label="Back"
              >
                <BackArrow />
              </button>
              <div>
                <h2 className={styles.stepHeading}>{l.welcomeBack}</h2>
                <p className={styles.stepEmail}>{email}</p>
              </div>
            </div>

            <form className={styles.formArea} onSubmit={handleSignIn} noValidate>
              <Input
                type="password"
                placeholder={l.passwordPlaceholder}
                value={password}
                onChangeText={setPassword}
                disabled={isLoading}
                size="sm"
                fullWidth
                autoComplete="current-password"
                name="password"
                testID={testID ? `${testID}-password` : undefined}
              />

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                size="sm"
                fullWidth
                loading={isLoading}
                testID={testID ? `${testID}-submit` : undefined}
              >
                {l.signInButton}
              </Button>
            </form>

            {onForgotPassword && (
              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => onForgotPassword(email)}
                  disabled={isLoading}
                >
                  {l.forgotPassword}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Step 2b: Sign Up ── */}
        {step === 'signup' && (
          <>
            <div className={styles.stepHeader}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
                aria-label="Back"
              >
                <BackArrow />
              </button>
              <div>
                <h2 className={styles.stepHeading}>{l.createAccount}</h2>
                <p className={styles.stepEmail}>{email}</p>
              </div>
            </div>

            <form className={styles.formArea} onSubmit={handleSignUp} noValidate>
              <div className={styles.nameRow}>
                <Input
                  type="text"
                  placeholder={l.firstNamePlaceholder}
                  value={firstName}
                  onChangeText={setFirstName}
                  disabled={isLoading}
                  size="sm"
                  fullWidth
                  autoComplete="given-name"
                  name="firstName"
                  testID={testID ? `${testID}-firstName` : undefined}
                />
                <Input
                  type="text"
                  placeholder={l.lastNamePlaceholder}
                  value={lastName}
                  onChangeText={setLastName}
                  disabled={isLoading}
                  size="sm"
                  fullWidth
                  autoComplete="family-name"
                  name="lastName"
                  testID={testID ? `${testID}-lastName` : undefined}
                />
              </div>

              <Input
                type="tel"
                placeholder={l.phonePlaceholder}
                value={phone}
                onChangeText={setPhone}
                disabled={isLoading}
                size="sm"
                fullWidth
                autoComplete="tel"
                name="phone"
                testID={testID ? `${testID}-phone` : undefined}
              />

              <Input
                type="password"
                placeholder={l.createPasswordPlaceholder}
                value={password}
                onChangeText={setPassword}
                disabled={isLoading}
                size="sm"
                fullWidth
                autoComplete="new-password"
                name="password"
                testID={testID ? `${testID}-password` : undefined}
              />

              <Checkbox
                checked={termsAccepted}
                onChange={setTermsAccepted}
                disabled={isLoading}
                size="sm"
                label={termsLabel}
                name="terms"
                testID={testID ? `${testID}-terms` : undefined}
              />

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                size="sm"
                fullWidth
                loading={isLoading}
                testID={testID ? `${testID}-submit` : undefined}
              >
                {l.createAccountButton}
              </Button>
            </form>
          </>
        )}
      </div>
    );
  }
);

AuthCard.displayName = 'AuthCard';
export default AuthCard;
