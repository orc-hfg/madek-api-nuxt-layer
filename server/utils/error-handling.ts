import type { H3Error } from 'h3';
import type { FetchError } from 'ofetch';
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

export function handleServiceError(
	serverLogger: Logger,
	error: unknown,
	message = 'Failed to complete operation',
): never {
	serverLogger.error(message, error);

	throw error;
}
