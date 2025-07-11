import type { H3Error } from 'h3';
import { FetchError } from 'ofetch';

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
