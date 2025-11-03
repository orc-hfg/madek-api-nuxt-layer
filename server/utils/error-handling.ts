import type { FetchError } from 'ofetch';
import { H3Error } from 'h3';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export function convertFetchToH3Error(error: FetchError): H3Error {
	const statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
	const statusMessage = error.statusMessage ?? getReasonPhrase(statusCode);

	let data: unknown;

	if (error.data !== undefined) {
		data = typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
	}

	return createError({
		statusCode,
		statusMessage,
		data,
	});
}

/*
 * Type-safe FetchError detection using duck-typing
 * Note: instanceof FetchError doesn't work reliably due to module boundary issues
 * where FetchError instances from different module contexts are not recognized
 */
export function isFetchError(error: unknown): error is FetchError {
	return typeof error === 'object'
		&& error !== null
		&& 'name' in error
		&& (error as { name: unknown }).name === 'FetchError'
		&& 'statusCode' in error
		&& typeof (error as { statusCode: unknown }).statusCode === 'number'
		&& 'message' in error
		&& typeof (error as { message: unknown }).message === 'string';
}

export function isH3NotFoundError(error: unknown): boolean {
	if (error instanceof H3Error) {
		return error.statusCode === (StatusCodes.NOT_FOUND as number);
	}

	return false;
}

export function isH3UnauthorizedError(error: unknown): boolean {
	if (error instanceof H3Error) {
		return error.statusCode === (StatusCodes.UNAUTHORIZED as number);
	}

	return false;
}

export function handleServiceError(serverLogger: Logger, error: unknown, message = 'Failed to complete operation.'): never {
	serverLogger.error(message, error);

	throw error;
}
