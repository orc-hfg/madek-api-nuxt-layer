import type { H3Event } from 'h3';
import type { MadekApiRequestConfig, PathParameters } from '../../server/utils/madek-api';
import type { ServerLoggerMock } from './logger';
import { vi } from 'vitest';
import { createMadekApiClient } from '../../server/utils/madek-api';
import { setupServerLoggerMock } from './logger';

export const mockEvent = {} as H3Event;

/*
 * API Test Context with Explicit Resource Management
 *
 * This context implements the Disposable pattern (Node 24+, TypeScript 5.2+) via [Symbol.dispose].
 * When used with the `using` keyword, cleanup is automatically triggered at the end of the scope.
 *
 * Example:
 *   using apiTestContext = setupApiTestContext();
 *   // Test code here...
 *   // Cleanup (vi.restoreAllMocks, vi.unstubAllGlobals) happens automatically!
 *
 * See readme.testing.md → Explicit Resource Management for details.
 */
interface ApiTestContext extends ServerLoggerMock {
	client: {
		fetchFromApi: (endpoint: string, config?: MadekApiRequestConfig) => Promise<unknown>;
		fetchFromApiWithPathParameters: (endpointTemplate: string, pathParameters: PathParameters, config?: MadekApiRequestConfig) => Promise<unknown>;
	};
	fetchMock: ReturnType<typeof vi.fn>;
	fetchDataFunctionMock: ReturnType<typeof vi.fn>;
	defineCachedFunctionMock: ReturnType<typeof vi.fn>;
	mockEvent: H3Event;
	[Symbol.dispose]: () => void;
}

export function setupApiTestContext(): ApiTestContext {
	const fetchMock = vi.fn();
	const fetchDataFunctionMock = vi.fn();
	const defineCachedFunctionMock = vi.fn().mockImplementation((cacheableFunction: () => unknown): (() => unknown) => (): unknown => cacheableFunction());

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
	};
}
