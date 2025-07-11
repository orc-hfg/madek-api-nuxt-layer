import type { H3Error } from 'h3';
import type { Logger } from '../../app/utils/logger';
import { createError } from 'h3';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FetchError } from 'ofetch';

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
	error: unknown,
	logger: Logger,
	serviceName: string,
	message = 'Failed to complete operation',
): never {
	logger.error(serviceName, message, error);

	if (error instanceof FetchError) {
		throw convertFetchToH3Error(error);
	}

	throw error;
}
