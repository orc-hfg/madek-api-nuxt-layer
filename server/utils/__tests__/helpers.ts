import type { H3Error } from 'h3';
import type { Logger } from '../logger';
import { FetchError } from 'ofetch';
import { vi } from 'vitest';

export function createMockLogger(): {
	errorSpy: ReturnType<typeof vi.spyOn>;
	infoSpy: ReturnType<typeof vi.spyOn>;
	logger: Logger;
	warnSpy: ReturnType<typeof vi.spyOn>;
} {
	const mockLogger = {
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	};
	const infoSpy = vi.spyOn(mockLogger, 'info');
	const warnSpy = vi.spyOn(mockLogger, 'warn');
	const errorSpy = vi.spyOn(mockLogger, 'error');

	return {
		logger: mockLogger as unknown as Logger,
		infoSpy,
		warnSpy,
		errorSpy,
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
