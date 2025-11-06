import type { RuntimeConfigStructure } from '../../../tests/mocks/runtime-config';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it } from 'vitest';
import { setupApiTestContext } from '../../../tests/mocks/madek-api';
import { createRuntimeConfigMock } from '../../../tests/mocks/runtime-config';

/*
 * Note: Tests use the `using` keyword (Node 24+, TypeScript 5.2+) for automatic resource cleanup.
 * The test context is automatically disposed at the end of each test, even if assertions fail.
 * See readme.testing.md → Explicit Resource Management for details.
 */

let runtimeConfigReturnValue: RuntimeConfigStructure;

function useRuntimeConfigMock() {
	return runtimeConfigReturnValue;
}

mockNuxtImport('useRuntimeConfig', () => useRuntimeConfigMock);

describe('createMadekApiClient()', () => {
	beforeEach(() => {
		runtimeConfigReturnValue = createRuntimeConfigMock();
	});

	it('returns an object with fetchFromApi method that calls fetchData with correct parameters', async () => {
		using apiTestContext = setupApiTestContext();

		const endpoint = 'resources/123';
		const apiOptions = { isAuthenticationNeeded: true, query: { param: 'value' } };

		await apiTestContext.client.fetchFromApi(endpoint, { apiOptions });

		expect(apiTestContext.loggerWarnSpy).toHaveBeenCalledTimes(1);
		expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
			apiTestContext.mockEvent,
			'https://api.example.com/resources/123',
			apiOptions,
			'test-api-token',
		);
	});

	it('correctly replaces path parameters in endpoint template', async () => {
		using apiTestContext = setupApiTestContext();

		await apiTestContext.client.fetchFromApiWithPathParameters(
			'collection/:collectionId/meta-datum/:metaKeyId',
			{ collectionId: 'abc-123', metaKeyId: 'meta_key.456' },
		);

		expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
			apiTestContext.mockEvent,
			'https://api.example.com/collection/abc-123/meta-datum/meta_key.456',
			{},
			'test-api-token',
		);
	});

	it('handles multiple path parameters and preserves non-parameter parts of the URL', async () => {
		using apiTestContext = setupApiTestContext();

		await apiTestContext.client.fetchFromApiWithPathParameters(
			'api/:version/collection/:collectionId/meta-datum/:metaKeyId',
			{ version: 'v2', collectionId: 'abc-123', metaKeyId: 'meta_key.456' },
		);

		expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
			apiTestContext.mockEvent,
			'https://api.example.com/api/v2/collection/abc-123/meta-datum/meta_key.456',
			{},
			'test-api-token',
		);
	});

	describe('caching mechanism', () => {
		beforeEach(() => {
			runtimeConfigReturnValue = createRuntimeConfigMock({ enableServerSideCaching: true });
		});

		it('uses cachedFunction with correct parameters when caching is enabled', async () => {
			using apiTestContext = setupApiTestContext();

			await apiTestContext.client.fetchFromApi('test-endpoint', {
				apiOptions: { query: { param: 'value' } },
				publicDataCache: { maxAge: 3600 },
			});

			expect(apiTestContext.defineCachedFunctionMock).toHaveBeenCalledWith(
				expect.any(Function),
				expect.objectContaining({
					maxAge: 3600,
					name: 'madek-api',
					getKey: expect.any(Function) as unknown as () => string,
				}),
			);
		});

		it('skips caching and directly calls fetchData when authentication is needed', async () => {
			using apiTestContext = setupApiTestContext();

			await apiTestContext.client.fetchFromApi('authenticated-endpoint', {
				apiOptions: { isAuthenticationNeeded: true },
				publicDataCache: { maxAge: 3600 },
			});

			expect(apiTestContext.loggerWarnSpy).toHaveBeenCalledTimes(1);
			expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
				apiTestContext.mockEvent,
				'https://api.example.com/authenticated-endpoint',
				{ isAuthenticationNeeded: true },
				'test-api-token',
			);
			expect(apiTestContext.defineCachedFunctionMock).not.toHaveBeenCalled();
		});

		it('does not log warning when authenticated request uses null for publicDataCache', async () => {
			using apiTestContext = setupApiTestContext();

			await apiTestContext.client.fetchFromApi('authenticated-endpoint', {
				apiOptions: { isAuthenticationNeeded: true },
				publicDataCache: null,
			});

			expect(apiTestContext.loggerWarnSpy).not.toHaveBeenCalled();
			expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
				apiTestContext.mockEvent,
				'https://api.example.com/authenticated-endpoint',
				{ isAuthenticationNeeded: true },
				'test-api-token',
			);
			expect(apiTestContext.defineCachedFunctionMock).not.toHaveBeenCalled();
		});

		it('skips caching when publicDataCache is null (explicit no-cache)', async () => {
			using apiTestContext = setupApiTestContext();

			await apiTestContext.client.fetchFromApi('test-endpoint', {
				publicDataCache: null,
			});

			expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
				apiTestContext.mockEvent,
				'https://api.example.com/test-endpoint',
				{},
				'test-api-token',
			);
			expect(apiTestContext.defineCachedFunctionMock).not.toHaveBeenCalled();
		});

		it('logs cache usage when caching is enabled', async () => {
			using apiTestContext = setupApiTestContext();

			const cacheOptions = { maxAge: 3600, swr: true };

			await apiTestContext.client.fetchFromApi('cached-endpoint', {
				publicDataCache: cacheOptions,
			});

			expect(apiTestContext.loggerInfoSpy).toHaveBeenCalledWith(
				'Using cache for request: cached-endpoint',
				cacheOptions,
			);
		});
	});
});

describe('createMadekApiClient() without server-side caching', () => {
	beforeEach(() => {
		runtimeConfigReturnValue = createRuntimeConfigMock({ enableServerSideCaching: false });
	});

	it('calls fetchData directly when caching is globally disabled', async () => {
		using apiTestContext = setupApiTestContext();

		await apiTestContext.client.fetchFromApi('test-endpoint', {
			publicDataCache: { maxAge: 3600 },
		});

		// Should call fetchData directly, not through caching
		expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
			apiTestContext.mockEvent,
			'https://api.example.com/test-endpoint',
			{},
			'test-api-token',
		);

		// Should NOT call defineCachedFunction when caching is disabled
		expect(apiTestContext.defineCachedFunctionMock).not.toHaveBeenCalled();
	});
});
