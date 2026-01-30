/**
 * Platform Utilities
 *
 * Cross-platform utilities for iOS, Android, and Web.
 */

import { Platform, PlatformOSType } from 'react-native';

/**
 * Current platform
 */
export const currentPlatform: PlatformOSType = Platform.OS;

/**
 * Platform checks
 */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const isNative = Platform.OS !== 'web';

/**
 * Platform version
 */
export const platformVersion = Platform.Version;

/**
 * Check if running on iOS with specific version or higher
 */
export function isIOSVersionAtLeast(version: number): boolean {
  if (!isIOS) return false;
  const v = typeof Platform.Version === 'string' ? parseInt(Platform.Version, 10) : Platform.Version;
  return v >= version;
}

/**
 * Check if running on Android with specific API level or higher
 */
export function isAndroidAPILevelAtLeast(apiLevel: number): boolean {
  if (!isAndroid) return false;
  const v = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);
  return v >= apiLevel;
}

/**
 * Select value based on platform
 */
export function platformSelect<T>(options: {
  ios?: T;
  android?: T;
  web?: T;
  native?: T;
  default: T;
}): T {
  if (isIOS && options.ios !== undefined) return options.ios;
  if (isAndroid && options.android !== undefined) return options.android;
  if (isWeb && options.web !== undefined) return options.web;
  if (isNative && options.native !== undefined) return options.native;
  return options.default;
}

/**
 * Platform-specific style selection (typed for StyleSheet)
 */
export function platformStyles<T extends object>(styles: {
  base?: T;
  ios?: Partial<T>;
  android?: Partial<T>;
  web?: Partial<T>;
  native?: Partial<T>;
}): T {
  const baseStyles = styles.base || ({} as T);

  let platformSpecific: Partial<T> = {};

  if (isIOS && styles.ios) {
    platformSpecific = styles.ios;
  } else if (isAndroid && styles.android) {
    platformSpecific = styles.android;
  } else if (isWeb && styles.web) {
    platformSpecific = styles.web;
  } else if (isNative && styles.native) {
    platformSpecific = styles.native;
  }

  return { ...baseStyles, ...platformSpecific };
}

/**
 * Get safe area insets default values per platform
 */
export function getDefaultSafeAreaInsets() {
  return platformSelect({
    ios: { top: 44, bottom: 34, left: 0, right: 0 },
    android: { top: 24, bottom: 0, left: 0, right: 0 },
    web: { top: 0, bottom: 0, left: 0, right: 0 },
    default: { top: 0, bottom: 0, left: 0, right: 0 },
  });
}

/**
 * Check if the platform supports haptic feedback
 */
export function supportsHaptics(): boolean {
  return isIOS || (isAndroid && isAndroidAPILevelAtLeast(26));
}

/**
 * Check if the platform supports blur effects
 */
export function supportsBlur(): boolean {
  return isIOS || isWeb;
}

/**
 * Check if the platform supports native animations
 */
export function supportsNativeDriver(): boolean {
  return isNative;
}
