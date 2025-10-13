import type { H3Event } from 'h3';
import type { MadekApiRequestConfig, PathParameters } from '../../server/utils/madek-api';
import type { ServerLoggerMock } from './logger';
import { vi } from 'vitest';
import { createMadekApiClient } from '../../server/utils/madek-api';
import { setupServerLoggerMock } from './logger';

export const mockEvent = {} as H3Event;

/*
 * TODO: @upgrade-node24
 * When we bump the project to Node ≥ 24 LTS:
 *  1. Remove every beforeEach / afterEach that only calls setupApiTestContext/ctx.dispose
 *  2. Inside each test block add: `using apiTestContext = setupApiTestContext();`
 *  3. Drop the `dispose` property from the context (remove dispose: cleanup)
 *  See: https://www.epicweb.dev/better-test-setup-with-disposable-objects
 */

interface ApiTestContext extends ServerLoggerMock {
	client: {
		fetchFromApi: (endpoint: string, config?: MadekApiRequestConfig) => Promise<unknown>;
		fetchFromApiWithPathParameters: (
			endpointTemplate: string,
			pathParameters: PathParameters,
			config?: MadekApiRequestConfig
		) => Promise<unknown>;
	};
	fetchMock: ReturnType<typeof vi.fn>;
	fetchDataFunctionMock: ReturnType<typeof vi.fn>;
	defineCachedFunctionMock: ReturnType<typeof vi.fn>;
	mockEvent: H3Event;
	[Symbol.dispose]: () => void;
	dispose: () => void;
}

export function setupApiTestContext(): ApiTestContext {
	const fetchMock = vi.fn();
	const fetchDataFunctionMock = vi.fn();
	const defineCachedFunctionMock = vi.fn().mockImplementation(
		(cacheableFunction: () => unknown): (() => unknown) => (): unknown => cacheableFunction(),
	);

	const loggerMock = setupServerLoggerMock();

	function cleanup(): void {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	}

	vi.stubGlobal('$fetch', fetchMock);
	vi.stubGlobal('defineCachedFunction', defineCachedFunctionMock);

	const client = createMadekApiClient(mockEvent, fetchDataFunctionMock);

	return {
		client,
		fetchMock,
		fetchDataFunctionMock,
		defineCachedFunctionMock,
		mockEvent,
		...loggerMock,
		[Symbol.dispose]: cleanup,
		dispose: cleanup,
	};
}
