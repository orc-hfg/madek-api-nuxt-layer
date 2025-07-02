import type { H3Event } from 'h3';
import type { MadekApiRequestConfig } from '../../madek-api';
import { FetchError } from 'ofetch';
import { vi } from 'vitest';
import * as loggerModule from '../../logger';
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
	loggerInfoSpy: ReturnType<typeof vi.spyOn>;
	loggerWarnSpy: ReturnType<typeof vi.spyOn>;
	loggerErrorSpy: ReturnType<typeof vi.spyOn>;
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

	const mockLogger = {
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	};
	const loggerInfoSpy = vi.spyOn(mockLogger, 'info');
	const loggerWarnSpy = vi.spyOn(mockLogger, 'warn');
	const loggerErrorSpy = vi.spyOn(mockLogger, 'error');
	vi.spyOn(loggerModule, 'createLogger').mockReturnValue(mockLogger);

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
		loggerInfoSpy,
		loggerWarnSpy,
		loggerErrorSpy,
		[Symbol.dispose]: cleanup,
		dispose: cleanup,
	};
}

export function createFetchError(options: Partial<Pick<FetchError, 'statusCode' | 'statusMessage'>> = {}): FetchError {
	const error = new FetchError(options.statusMessage ?? 'Error');

	if (options.statusCode !== undefined) {
		error.statusCode = options.statusCode;
	}
	if (options.statusMessage !== undefined) {
		error.statusMessage = options.statusMessage;
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
