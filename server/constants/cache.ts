import type { CacheOptions } from 'nitropack';
import {
	FIVE_MINUTES_IN_SECONDS,
	ONE_DAY_IN_SECONDS,
	ONE_HOUR_IN_SECONDS,
	TWELVE_HOURS_IN_SECONDS,
} from '../../shared/constants/time';

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

export const fiveMinutesCache: CacheOptions = {
	maxAge: FIVE_MINUTES_IN_SECONDS,
	swr: true,
};

export const oneHourCache: CacheOptions = {
	maxAge: ONE_HOUR_IN_SECONDS,
	swr: true,
};

export const twelveHoursCache: CacheOptions = {
	maxAge: TWELVE_HOURS_IN_SECONDS,
	swr: true,
};

export const twentyFourHoursCache: CacheOptions = {
	maxAge: ONE_DAY_IN_SECONDS,
	swr: true,
};

export const freshOneHourCache: CacheOptions = {
	maxAge: ONE_HOUR_IN_SECONDS,

	// No stale-while-revalidate - ensures freshness for sensitive data
	swr: false,
};
