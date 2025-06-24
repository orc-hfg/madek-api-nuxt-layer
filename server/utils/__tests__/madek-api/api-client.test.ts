import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApiTestContext } from './test-helpers';

/**
 * TODO: @upgrade-node24
 * When we bump the project to Node ≥ 24 LTS:
 *  1. Remove every beforeEach / afterEach that only calls createApiTestContext/ctx.dispose
 *  2. Inside each test block add: `using apiTestContext = createApiTestContext();`
 *  3. Drop the `dispose` property from the context (remove dispose: cleanup)
 *  See: https://www.epicweb.dev/better-test-setup-with-disposable-objects
 */

describe('createMadekApiClient', () => {
	let apiTestContext: ReturnType<typeof createApiTestContext>;

	beforeEach(() => {
		apiTestContext = createApiTestContext();
	});

	afterEach(() => {
		apiTestContext.dispose();
	});

	it('returns an object with fetchFromApi method that calls fetchData with correct parameters', async () => {
		const endpoint = 'resources/123';
		const apiOptions = { needsAuth: true, query: { param: 'value' } };

		await apiTestContext.client.fetchFromApi(endpoint, { apiOptions });

		expect(apiTestContext.warnSpy).toHaveBeenCalledTimes(1);
		expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
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
			'https://api.example.com/api/v2/collection/abc-123/meta-datum/meta_key.456',
			{},
			'test-api-token',
		);
	});

	describe('caching mechanism', () => {
		beforeEach(() => {
			apiTestContext = createApiTestContext();
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

		it('skips caching and directly calls fetchData when auth is needed', async () => {
			await apiTestContext.client.fetchFromApi('authenticated-endpoint', {
				apiOptions: { needsAuth: true },
				publicDataCache: { maxAge: 3600 },
			});

			expect(apiTestContext.warnSpy).toHaveBeenCalledTimes(1);
			expect(apiTestContext.fetchDataFunctionMock).toHaveBeenCalledWith(
				'https://api.example.com/authenticated-endpoint',
				{ needsAuth: true },
				'test-api-token',
			);
			expect(apiTestContext.defineCachedFunctionMock).not.toHaveBeenCalled();
		});
	});
});
