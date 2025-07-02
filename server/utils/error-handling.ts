import type { H3Error } from 'h3';
import type { Logger } from './logger';
import { createError } from 'h3';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FetchError } from 'ofetch';

export function convertFetchToH3Error(error: FetchError): H3Error {
	return createError({
		statusCode: error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
		statusMessage: error.statusMessage ?? getReasonPhrase(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR),
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
