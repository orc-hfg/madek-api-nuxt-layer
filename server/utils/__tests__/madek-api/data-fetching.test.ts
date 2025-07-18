import type { $Fetch } from 'nitropack';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fetchData } from '../../madek-api';
import { createApiTestContext } from './test-helpers';

/**
 * TODO: @upgrade-node24
 * When we bump the project to Node ≥ 24 LTS:
 *  1. Remove every beforeEach / afterEach that only calls createApiTestContext/ctx.dispose
 *  2. Inside each test block add: `using apiTestContext = createApiTestContext();`
 *  3. Drop the `dispose` property from the context (remove dispose: cleanup)
 *  See: https://www.epicweb.dev/better-test-setup-with-disposable-objects
 */

describe('data fetching', () => {
	let apiTestContext: ReturnType<typeof createApiTestContext>;

	beforeEach(() => {
		apiTestContext = createApiTestContext();
	});

	afterEach(() => {
		apiTestContext.dispose();
	});

	it('builds correct request configuration and calls $fetch', async () => {
		await fetchData(
			'https://api.example.com/test',
			{ needsAuth: true, query: { param: 'value' } },
			'test-token',
			apiTestContext.fetchMock as unknown as $Fetch,
		);

		expect(apiTestContext.fetchMock).toHaveBeenCalledWith(
			'https://api.example.com/test',
			expect.objectContaining({
				headers: { Authorization: 'token test-token' },
				query: { param: 'value' },
			}),
		);
	});
});
