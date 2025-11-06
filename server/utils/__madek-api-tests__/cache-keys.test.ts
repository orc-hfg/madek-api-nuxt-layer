import type { MadekApiOptions } from '../madek-api';
import { describe, expect, it } from 'vitest';
import { noCache, oneHourCache } from '../../constants/cache';
import { generateCacheKey, shouldUseCaching } from '../madek-api';

describe('shouldUseCaching()', () => {
	it('returns false when authentication is needed (do not allow caching for user sensitive data)', () => {
		const result = shouldUseCaching(true, true, oneHourCache);

		expect(result).toBe(false);
	});

	it('returns false when server side caching is disabled', () => {
		const result = shouldUseCaching(false, false, oneHourCache);

		expect(result).toBe(false);
	});

	it('returns false when cache options are noCache (explicit no-cache)', () => {
		const result = shouldUseCaching(true, false, noCache);

		expect(result).toBe(false);
	});

	it('returns true when all conditions for caching are met', () => {
		const result = shouldUseCaching(true, false, oneHourCache);

		expect(result).toBe(true);
	});
});

describe('generateCacheKey()', () => {
	it('generates consistent, filesystem-safe keys', () => {
		const testCases: { endpoint: string; expected: string; query?: MadekApiOptions['query'] }[] = [
			{
				endpoint: '/api-v2/auth-info',
				expected: 'api-v2:auth-info',
			},
			{
				endpoint: '/api-v2/contexts',
				query: {},
				expected: 'api-v2:contexts',
			},
			{
				endpoint: '/api-v2/collections',
				query: { responsible_user_id: '123' },
				expected: 'api-v2:collections:responsible_user_id:123',
			},
		];

		for (const { endpoint, query, expected } of testCases) {
			const result = generateCacheKey(endpoint, query);

			expect(result).toBe(expected);
		}
	});

	it('handles leading slashes correctly', () => {
		expect(generateCacheKey('/api-v2/contexts')).toBe('api-v2:contexts');
		expect(generateCacheKey('api-v2/contexts')).toBe('api-v2:contexts');
	});

	it('generates different keys for different endpoints', () => {
		expect(generateCacheKey('/api-v2/contexts'))
			.not
			.toBe(generateCacheKey('/api-v2/collections'));
	});

	it('generates different keys for different queries', () => {
		expect(generateCacheKey('/api-v2/collections', { responsible_user_id: '123' }))
			.not
			.toBe(generateCacheKey('/api-v2/collections', { responsible_user_id: '456' }));
	});

	it('generates consistent keys for identical requests', () => {
		const key1 = generateCacheKey('/api-v2/collections', { responsible_user_id: '123' });
		const key2 = generateCacheKey('/api-v2/collections', { responsible_user_id: '123' });

		expect(key1).toBe(key2);
	});

	it('generates consistent keys regardless of query parameter order', () => {
		const q1 = { param1: 'value1', param2: 'value2', param3: 'value3' };
		const q2 = { param3: 'value3', param1: 'value1', param2: 'value2' };

		expect(generateCacheKey('/api-v2/collections', q1))
			.toBe(generateCacheKey('/api-v2/collections', q2));
	});
});
