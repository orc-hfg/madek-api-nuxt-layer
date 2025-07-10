import type { H3Error } from 'h3';
import type { Logger } from '../logger';
import { FetchError } from 'ofetch';
import { vi } from 'vitest';

export function createMockLogger(): {
	debugSpy: ReturnType<typeof vi.spyOn>;
	infoSpy: ReturnType<typeof vi.spyOn>;
	warnSpy: ReturnType<typeof vi.spyOn>;
	errorSpy: ReturnType<typeof vi.spyOn>;
	logger: Logger;
} {
	const mockLogger = {
		debug: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	};
	const debugSpy = vi.spyOn(mockLogger, 'debug');
	const infoSpy = vi.spyOn(mockLogger, 'info');
	const warnSpy = vi.spyOn(mockLogger, 'warn');
	const errorSpy = vi.spyOn(mockLogger, 'error');

	return {
		debugSpy,
		infoSpy,
		warnSpy,
		errorSpy,
		logger: mockLogger as unknown as Logger,
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

export function catchH3Error(errorThrowingFunction: () => void): H3Error | undefined {
	try {
		errorThrowingFunction();

		return undefined;
	}
	catch (error) {
		return error as H3Error;
	}
}
