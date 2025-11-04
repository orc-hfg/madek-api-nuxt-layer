import type { $Fetch } from 'nitropack';
import { describe, expect, it } from 'vitest';
import { setupApiTestContext } from '../../../tests/mocks/madek-api';
import { fetchData } from '../madek-api';

/*
 * Note: Tests use the `using` keyword (Node 24+, TypeScript 5.2+) for automatic resource cleanup.
 * The test context is automatically disposed at the end of each test, even if assertions fail.
 * See readme.testing.md → Explicit Resource Management for details.
 */

describe('fetchData()', () => {
	describe('in development mode', () => {
		it('builds correct request configuration with authentication headers and calls $fetch', async () => {
			/* Setup test context with automatic cleanup via `using` keyword */
			using apiTestContext = setupApiTestContext();

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

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith('https://api.example.com/test', expectedConfig);
		});

		it('builds request configuration without headers when authentication is not needed', async () => {
			using apiTestContext = setupApiTestContext();

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

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith('https://api.example.com/test', expectedConfig);
		});
	});

	describe('in production mode', () => {
		it('builds correct request configuration with cookie headers when authentication is needed', async () => {
			using apiTestContext = setupApiTestContext();

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

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith('https://api.example.com/test', expectedConfig);
		});

		it('builds request configuration without headers when authentication is not needed', async () => {
			using apiTestContext = setupApiTestContext();

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

			expect(apiTestContext.fetchMock).toHaveBeenCalledWith('https://api.example.com/test', expectedConfig);
		});
	});
});
