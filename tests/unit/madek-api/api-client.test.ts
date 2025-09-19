import type { RuntimeConfigStructure } from '../../mocks/runtime-config';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { setupApiTestContext } from '../../mocks/madek-api';
import { createRuntimeConfigMock } from '../../mocks/runtime-config';

/*
 * TODO: @upgrade-node24
 * When we bump the project to Node ≥ 24 LTS:
 *  1. Remove every beforeEach / afterEach that only calls setupApiTestContext/ctx.dispose
 *  2. Inside each test block add: `using apiTestContext = setupApiTestContext();`
 *  3. Drop the `dispose` property from the context (remove dispose: cleanup)
 *  See: https://www.epicweb.dev/better-test-setup-with-disposable-objects
 */

let runtimeConfigReturnValue: RuntimeConfigStructure;

function useRuntimeConfigMock() {
	return runtimeConfigReturnValue;
}

mockNuxtImport('useRuntimeConfig', () => useRuntimeConfigMock);

describe('createMadekApiClient()', () => {
	let apiTestContext: ReturnType<typeof setupApiTestContext>;

	beforeEach(() => {
		runtimeConfigReturnValue = createRuntimeConfigMock();
		apiTestContext = setupApiTestContext();
	});

	afterEach(() => {
		apiTestContext.dispose();
	});

	it('returns an object with fetchFromApi method that calls fetchData with correct parameters', async () => {
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
			apiTestContext = setupApiTestContext();
		});

		afterEach(() => {
			apiTestContext.dispose();
		});

		it('uses cachedFunction with correct parameters when caching is enabled', async () => {
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

		it('logs cache usage when caching is enabled', async () => {
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
	let apiTestContext: ReturnType<typeof setupApiTestContext>;

	beforeEach(() => {
		runtimeConfigReturnValue = createRuntimeConfigMock({ enableServerSideCaching: false });
		apiTestContext = setupApiTestContext();
	});

	afterEach(() => {
		apiTestContext.dispose();
	});

	it('calls fetchData directly when caching is globally disabled', async () => {
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
