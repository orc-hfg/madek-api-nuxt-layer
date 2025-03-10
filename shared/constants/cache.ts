/**
 * Cache configuration constants for API requests
 */

import type { CacheOptions } from 'nitropack';
import {
	FIVE_MINUTES_IN_SECONDS,
	ONE_DAY_IN_SECONDS,
	ONE_HOUR_IN_SECONDS,
	TWELVE_HOURS_IN_SECONDS,
} from './time';

// Standard cache configurations
export const noCache: CacheOptions = {
	maxAge: 0,
	swr: false,
};

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

// Specialized cache configurations
export const freshOneHourCache: CacheOptions = {
	maxAge: ONE_HOUR_IN_SECONDS,
	swr: false, // No stale-while-revalidate - ensures freshness for sensitive data
};
