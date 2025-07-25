import type { H3Event } from 'h3';
import type { FetchError } from 'ofetch';
import type { MadekApiRequestConfig } from '../../madek-api';
import { vi } from 'vitest';
import { createMadekApiClient } from '../../madek-api';

/**
 * TODO: @upgrade-node24
 * When we bump the project to Node ≥ 24 LTS:
 *  1. Remove every beforeEach / afterEach that only calls createApiTestContext/ctx.dispose
 *  2. Inside each test block add: `using apiTestContext = createApiTestContext();`
 *  3. Drop the `dispose` property from the context (remove dispose: cleanup)
 *  See: https://www.epicweb.dev/better-test-setup-with-disposable-objects
 */

interface ApiTestContext {
	client: {
		fetchFromApi: (endpoint: string, config?: MadekApiRequestConfig) => Promise<unknown>;
		fetchFromApiWithPathParameters: (
			endpointTemplate: string,
			pathParameters: Record<string, string>,
			config?: MadekApiRequestConfig
		) => Promise<unknown>;
	};
	fetchMock: ReturnType<typeof vi.fn>;
	fetchDataFunctionMock: ReturnType<typeof vi.fn>;
	defineCachedFunctionMock: ReturnType<typeof vi.fn>;
	warnSpy: ReturnType<typeof vi.spyOn>;
	[Symbol.dispose]: () => void;
	dispose: () => void;
}

export function createApiTestContext(): ApiTestContext {
	const fetchMock = vi.fn();
	const fetchDataFunctionMock = vi.fn();
	const defineCachedFunctionMock = vi.fn().mockImplementation(
		(cacheableFunction: () => unknown): (() => unknown) => (): unknown => cacheableFunction(),
	);
	const mockEvent = {} as H3Event;
	const warnSpy = vi.spyOn(console, 'warn').mockReturnValue();

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
		warnSpy,
		[Symbol.dispose]: cleanup,
		dispose: cleanup,
	};
}

export function createFetchError(options: {
	message?: string;
	statusCode?: number;
	statusMessage?: string;
	statusText?: string;
}): FetchError {
	const error = new Error(options.message ?? 'Error') as FetchError;
	if (options.statusCode !== undefined) {
		error.statusCode = options.statusCode;
	}
	if (options.statusMessage !== undefined) {
		error.statusMessage = options.statusMessage;
	}
	if (options.statusText !== undefined) {
		error.statusText = options.statusText;
	}

	return error;
}

export function catchError(errorThrowingFunction: () => void): Error | undefined {
	try {
		errorThrowingFunction();

		return undefined;
	}
	catch (error) {
		return error as Error;
	}
}
