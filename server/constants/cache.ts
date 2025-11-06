import type { CacheOptions } from 'nitropack';
import { FIVE_MINUTES_IN_SECONDS, ONE_DAY_IN_SECONDS, ONE_HOUR_IN_SECONDS, TWELVE_HOURS_IN_SECONDS } from '../../shared/constants/time';

/*
 * Disables caching completely.
 *
 * Use cases:
 * - Binary data (Blob, streams) - would be corrupted during serialization
 * - Real-time data that must never be stale
 * - Authenticated requests that must not be cached
 *
 * Use null instead of a CacheOptions object to indicate no caching.
 * Null is semantically correct here - it represents the intentional absence of caching.
 */
// eslint-disable-next-line unicorn/no-null
export const noCache = null;

export const fiveMinutesCache = {
	maxAge: FIVE_MINUTES_IN_SECONDS,
	swr: true,
} as const satisfies CacheOptions;

export const oneHourCache = {
	maxAge: ONE_HOUR_IN_SECONDS,
	swr: true,
} as const satisfies CacheOptions;

export const twelveHoursCache = {
	maxAge: TWELVE_HOURS_IN_SECONDS,
	swr: true,
} as const satisfies CacheOptions;

export const twentyFourHoursCache = {
	maxAge: ONE_DAY_IN_SECONDS,
	swr: true,
} as const satisfies CacheOptions;

export const freshOneHourCache = {
	maxAge: ONE_HOUR_IN_SECONDS,

	// No stale-while-revalidate - ensures freshness for sensitive data
	swr: false,
} as const satisfies CacheOptions;

/*
 * Union type of all allowed cache configurations.
 * Enforces usage of predefined cache constants instead of ad-hoc CacheOptions objects.
 *
 * Note: While TypeScript cannot prevent direct usage of `null` (since noCache = null is a primitive),
 * you should always use the `noCache` constant for consistency and clarity.
 *
 * Allowed:
 * - publicDataCache: noCache (preferred)
 * - publicDataCache: null (works, but not recommended)
 * - publicDataCache: oneHourCache
 *
 * Prevented:
 * - publicDataCache: { maxAge: 123 } (TypeScript error)
 */
export type AllowedCacheOptions
	= | typeof noCache
		| typeof fiveMinutesCache
		| typeof oneHourCache
		| typeof twelveHoursCache
		| typeof twentyFourHoursCache
		| typeof freshOneHourCache;
