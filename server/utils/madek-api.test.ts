import { describe, expect, it } from 'vitest';
import { generateCacheKey } from './madek-api';

interface TestCase {
	endpoint: string;
	query?: Record<string, string>;
	expected: string;
}

describe('generateCacheKey', () => {
	it('generates consistent, filesystem-safe keys', () => {
		const testCases: TestCase[] = [
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
		const withSlash = generateCacheKey('/api-v2/contexts');
		const withoutSlash = generateCacheKey('api-v2/contexts');

		expect(withoutSlash).toBe('api-v2:contexts');
		expect(withSlash).toBe('api-v2:contexts');
	});

	it('generates different keys for different endpoints', () => {
		const key1 = generateCacheKey('/api-v2/contexts');
		const key2 = generateCacheKey('/api-v2/collections');

		expect(key1).not.toBe(key2);
	});

	it('generates different keys for different queries', () => {
		const key1 = generateCacheKey('/api-v2/collections', { responsible_user_id: '123' });
		const key2 = generateCacheKey('/api-v2/collections', { responsible_user_id: '456' });

		expect(key1).not.toBe(key2);
	});

	it('generates consistent keys for identical requests', () => {
		const key1 = generateCacheKey('/api-v2/collections', { responsible_user_id: '123' });
		const key2 = generateCacheKey('/api-v2/collections', { responsible_user_id: '123' });

		expect(key1).toBe(key2);
	});
});
