import type { CacheOptions } from 'nitropack';
import { describe, expect, it } from 'vitest';
import { buildRequestConfig, generateCacheKey, getAuthHeader, shouldUseCaching } from './madek-api';

interface TestCase {
	endpoint: string;
	query?: Record<string, string>;
	expected: string;
}

describe('madek api client', () => {
	describe('request configuration', () => {
		describe('getAuthHeader', () => {
			it('returns undefined when token is undefined', () => {
				const result = getAuthHeader();

				expect(result).toBeUndefined();
			});

			it('returns undefined when token is empty string', () => {
				const result = getAuthHeader('');

				expect(result).toBeUndefined();
			});

			it('returns correctly formatted auth header when token is provided', () => {
				const token = 'test-token-123';
				const result = getAuthHeader(token);

				expect(result).toBeDefined();
				expect(result).toStrictEqual({ Authorization: `token ${token}` });
			});
		});

		describe('buildRequestConfig', () => {
			it('returns empty config when no options are provided', () => {
				const result = buildRequestConfig();

				expect(result).toStrictEqual({
					headers: undefined,
					query: undefined,
				});
			});

			it('includes auth header when needsAuth is true', () => {
				const token = 'test-token';
				const result = buildRequestConfig({ needsAuth: true }, token);

				expect(result).toStrictEqual({
					headers: { Authorization: `token ${token}` },
					query: undefined,
				});
			});

			it('does not include auth header when needsAuth is false', () => {
				const token = 'test-token';
				const result = buildRequestConfig({ needsAuth: false }, token);

				expect(result).toStrictEqual({
					headers: undefined,
					query: undefined,
				});
			});

			it('includes query parameters when provided', () => {
				const query = { parameter1: 'value1', parameter2: 'value2' };
				const result = buildRequestConfig({ query });

				expect(result).toStrictEqual({
					headers: undefined,
					query,
				});
			});

			it('combines auth headers and query parameters when both are provided', () => {
				const token = 'test-token';
				const query = { parameter1: 'value1', parameter2: 'value2' };
				const result = buildRequestConfig({ needsAuth: true, query }, token);

				expect(result).toStrictEqual({
					headers: { Authorization: `token ${token}` },
					query,
				});
			});
		});
	});

	describe('caching mechanisms', () => {
		describe('shouldUseCaching', () => {
			it('returns false when authentication is needed (do not allow caching for user sensitive data)', () => {
				const cacheOptions: CacheOptions = { maxAge: 3600 };
				const result = shouldUseCaching(true, cacheOptions, false);

				expect(result).toBe(false);
			});

			it('returns false when in development mode', () => {
				const cacheOptions: CacheOptions = { maxAge: 3600 };
				const result = shouldUseCaching(false, cacheOptions, true);

				expect(result).toBe(false);
			});

			it('returns false when cache options are undefined', () => {
				const result = shouldUseCaching(false, undefined, false);

				expect(result).toBe(false);
			});

			it('returns true when all conditions for caching are met', () => {
				const cacheOptions: CacheOptions = { maxAge: 3600 };
				const result = shouldUseCaching(false, cacheOptions, false);

				expect(result).toBe(true);
			});
		});

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
	});
});
