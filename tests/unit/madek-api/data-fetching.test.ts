import type { $Fetch } from 'nitropack';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fetchData } from '../../../server/utils/madek-api';
import { setupApiTestContext } from '../helpers/madek-api';

/**
 * TODO: @upgrade-node24
 * When we bump the project to Node ≥ 24 LTS:
 *  1. Remove every beforeEach / afterEach that only calls setupApiTestContext/ctx.dispose
 *  2. Inside each test block add: `using apiTestContext = setupApiTestContext();`
 *  3. Drop the `dispose` property from the context (remove dispose: cleanup)
 *  See: https://www.epicweb.dev/better-test-setup-with-disposable-objects
 */

describe('fetchData()', () => {
	let apiTestContext: ReturnType<typeof setupApiTestContext>;

	beforeEach(() => {
		apiTestContext = setupApiTestContext();
	});

	afterEach(() => {
		apiTestContext.dispose();
	});

	describe('in development mode', () => {
		it('builds correct request configuration with auth headers and calls $fetch', async () => {
			await fetchData(
				apiTestContext.mockEvent,
				'https://api.example.com/test',
				{ isAuthenticationNeeded: true, query: { param: 'value' } },
				'test-token',
				apiTestContext.fetchMock as unknown as $Fetch,
				true,
			);

			const expectedConfig = {
				headers: { Authorization: 'token test-token' },
				query: { param: 'value' },
			};

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith(
				'https://api.example.com/test',
				expectedConfig,
			);
		});

		it('builds request configuration without headers when authentication is not needed', async () => {
			await fetchData(
				apiTestContext.mockEvent,
				'https://api.example.com/test',
				{ isAuthenticationNeeded: false, query: { param: 'value' } },
				'test-token',
				apiTestContext.fetchMock as unknown as $Fetch,
				true,
			);

			const expectedConfig = {
				query: { param: 'value' },
			};

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith(
				'https://api.example.com/test',
				expectedConfig,
			);
		});
	});

	describe('in production mode', () => {
		it('builds correct request configuration with cookie headers when authentication is needed', async () => {
			await fetchData(
				apiTestContext.mockEvent,
				'https://api.example.com/test',
				{ isAuthenticationNeeded: true, query: { param: 'value' } },
				'test-token',
				apiTestContext.fetchMock as unknown as $Fetch,
				false,
			);

			const expectedConfig = {
				headers: { cookie: 'test-cookie=value123' },
				query: { param: 'value' },
			};

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith(
				'https://api.example.com/test',
				expectedConfig,
			);
		});

		it('builds request configuration without headers when authentication is not needed', async () => {
			await fetchData(
				apiTestContext.mockEvent,
				'https://api.example.com/test',
				{ isAuthenticationNeeded: false, query: { param: 'value' } },
				'test-token',
				apiTestContext.fetchMock as unknown as $Fetch,
				false,
			);

			const expectedConfig = {
				query: { param: 'value' },
			};

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith(
				'https://api.example.com/test',
				expectedConfig,
			);
		});
	});
});
