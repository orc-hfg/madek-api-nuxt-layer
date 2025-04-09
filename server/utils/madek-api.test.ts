import type { H3Event } from 'h3';
import type { FetchError } from 'ofetch';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildRequestConfig, createMadekApiClient, fetchData, generateCacheKey, getAuthHeader, handleFetchError, shouldUseCaching } from './madek-api';

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

	describe('data fetching', () => {
		describe('fetchData', () => {
			it('builds correct request configuration and calls $fetch', async () => {
				const fetchFunctionMock = vi.fn();
				vi.stubGlobal('$fetch', fetchFunctionMock);

				await fetchData('https://api.example.com/test', {
					needsAuth: true,
					query: { param: 'value' },
				}, 'test-token');

				expect(fetchFunctionMock).toHaveBeenCalledWith(
					'https://api.example.com/test',
					expect.objectContaining({
						headers: { Authorization: 'token test-token' },
						query: { param: 'value' },
					}),
				);

				vi.unstubAllGlobals();
			});
		});
	});

	describe('error handling', () => {
		it('passes FetchError status message correctly', () => {
			const fetchError = new Error('Original message') as FetchError;
			fetchError.statusCode = 401;
			fetchError.statusMessage = 'Unauthorized';

			let caughtError;
			try {
				handleFetchError(fetchError);
			}
			catch (error) {
				caughtError = error as Error;
			}

			expect(caughtError?.message).toBe('Unauthorized');
		});

		it('uses statusCode when no message is provided', () => {
			const fetchError = new Error('Network Error') as FetchError;
			fetchError.statusCode = 404;

			let caughtError;
			try {
				handleFetchError(fetchError);
			}
			catch (error) {
				caughtError = error as Error;
			}

			expect(caughtError?.message).toBe('Not Found');
		});

		it('handles FetchError without statusCode or statusMessage', () => {
			const fetchError = new Error('Fetch Error') as FetchError;

			let caughtError;
			try {
				handleFetchError(fetchError);
			}
			catch (error) {
				caughtError = error as Error;
			}

			expect(caughtError?.message).toBe('Internal Server Error');
		});

		it('uses statusText as fallback when statusMessage is missing', () => {
			const fetchError = new Error('Network Error') as FetchError;
			fetchError.statusCode = 403;
			fetchError.statusText = 'Forbidden Access';

			let caughtError;
			try {
				handleFetchError(fetchError);
			}
			catch (error) {
				caughtError = error as Error;
			}

			expect(caughtError?.message).toBe('Forbidden Access');
		});
	});

	describe('caching mechanisms', () => {
		describe('shouldUseCaching', () => {
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

		describe('generateCacheKey', () => {
			it('generates consistent, filesystem-safe keys', () => {
				const testCases: { endpoint: string; query?: Record<string, string>; expected: string }[] = [
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

			it('generates consistent keys regardless of query parameter order', () => {
				const queryOrder1 = { param1: 'value1', param2: 'value2', param3: 'value3' };
				const queryOrder2 = { param3: 'value3', param1: 'value1', param2: 'value2' };
				const queryOrder3 = { param2: 'value2', param3: 'value3', param1: 'value1' };

				const key1 = generateCacheKey('/api-v2/collections', queryOrder1);
				const key2 = generateCacheKey('/api-v2/collections', queryOrder2);
				const key3 = generateCacheKey('/api-v2/collections', queryOrder3);

				expect(key1).toBe(key2);
				expect(key1).toBe(key3);
				expect(key2).toBe(key3);

				expect(key1).toBe('api-v2:collections:param1:value1:param2:value2:param3:value3');
			});
		});
	});

	describe('createMadekApiClient', () => {
		beforeEach(() => {
			const mockDefineCachedFunction = vi.fn();
			mockDefineCachedFunction.mockImplementation(<T>(function_: () => T) => {
				return () => function_();
			});
			vi.stubGlobal('defineCachedFunction', mockDefineCachedFunction);
		});

		mockNuxtImport('useRuntimeConfig', () => {
			return () => {
				return {
					public: {
						madekApi: {
							baseUrl: 'https://api.example.com',
						},
					},
					madekApi: {
						token: 'test-api-token',
					},
				};
			};
		});

		afterAll(() => {
			vi.restoreAllMocks();
		});

		describe('basic API functionality', () => {
			it('returns an object with fetchFromApi method that calls fetchData with correct parameters', async () => {
				const fetchDataFunctionMock = vi.fn();
				const mockEvent = {} as H3Event;

				const client = createMadekApiClient(mockEvent, fetchDataFunctionMock);
				const endpoint = '/resources/123';
				const apiOptions = { needsAuth: true, query: { param: 'value' } };

				await client.fetchFromApi(endpoint, { apiOptions });

				expect(fetchDataFunctionMock).toHaveBeenCalledWith(
					'https://api.example.com/resources/123',
					apiOptions,
					'test-api-token',
				);
			});
		});

		describe('caching mechanism', () => {
			it('uses cachedFunction with correct parameters when caching is enabled', async () => {
				const fetchDataFunctionMock = vi.fn();
				const mockEvent = {} as H3Event;

				const client = createMadekApiClient(mockEvent, fetchDataFunctionMock);
				await client.fetchFromApi('/test-endpoint', {
					apiOptions: { query: { param: 'value' } },
					publicDataCache: { maxAge: 3600 },
				});

				expect(defineCachedFunction).toHaveBeenCalledWith(
					expect.any(Function),
					expect.objectContaining({
						maxAge: 3600,
						name: 'madek-api',
						getKey: expect.any(Function) as unknown as () => string,
					}),
				);
			});

			it('skips caching and directly calls fetchData when auth is needed', async () => {
				const fetchDataFunctionMock = vi.fn();
				const mockEvent = {} as H3Event;

				const client = createMadekApiClient(mockEvent, fetchDataFunctionMock);
				await client.fetchFromApi('/authenticated-endpoint', {
					apiOptions: { needsAuth: true },
					publicDataCache: { maxAge: 3600 },
				});

				expect(fetchDataFunctionMock).toHaveBeenCalledWith(
					'https://api.example.com/authenticated-endpoint',
					{ needsAuth: true },
					'test-api-token',
				);
				expect(defineCachedFunction).not.toHaveBeenCalled();
			});
		});
	});
});
