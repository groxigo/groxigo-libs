/**
 * Image URL Helpers (Client-side)
 *
 * Build srcSet strings from pre-generated WebP variant URLs.
 * Product images follow the pattern: .../productId/imageId/{variant}.webp
 */

const VARIANT_WIDTHS: Record<string, number> = {
  xs: 100,
  sm: 200,
  md: 400,
  lg: 600,
  xl: 800,
  '2xl': 1200,
  original: 2400,
};

/** Build srcSet from a variant URLs object returned by the API */
export function buildSrcSetFromVariants(
  variants: Record<string, string> | null | undefined,
  include: string[] = ['sm', 'md', 'lg', 'xl']
): string {
  if (!variants) return '';
  return include
    .filter((v) => variants[v] && VARIANT_WIDTHS[v])
    .map((v) => `${variants[v]} ${VARIANT_WIDTHS[v]}w`)
    .join(', ');
}

/**
 * Build srcSet from a CDN URL by inferring variant paths.
 * Works for product images with pattern: .../productId/imageId/{variant}.webp
 */
export function buildSrcSetFromUrl(
  url: string,
  include: string[] = ['sm', 'md', 'lg', 'xl']
): string {
  const match = url.match(/^(.+\/)(xs|sm|md|lg|xl|2xl|original)(\.webp)$/);
  if (!match) return '';
  const [, base, , ext] = match;
  return include
    .map((v) => `${base}${v}${ext} ${VARIANT_WIDTHS[v]}w`)
    .join(', ');
}
