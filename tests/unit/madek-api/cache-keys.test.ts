import type { MadekApiOptions } from '../../../server/utils/madek-api';
import { describe, expect, it } from 'vitest';
import { generateCacheKey, shouldUseCaching } from '../../../server/utils/madek-api';

describe('shouldUseCaching()', () => {
	it('returns false when authentication is needed (do not allow caching for user sensitive data)', () => {
		const cacheOptions = { maxAge: 3600 };
		const result = shouldUseCaching(true, cacheOptions, false);

		expect(result).toBe(false);
	});

	it('returns false when in development mode', () => {
		const cacheOptions = { maxAge: 3600 };
		const result = shouldUseCaching(false, cacheOptions, true);

		expect(result).toBe(false);
	});

	it('returns false when cache options are undefined', () => {
		const result = shouldUseCaching(false, undefined, false);

		expect(result).toBe(false);
	});

	it('returns true when all conditions for caching are met', () => {
		const cacheOptions = { maxAge: 3600 };
		const result = shouldUseCaching(false, cacheOptions, false);

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
