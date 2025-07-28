import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockLoggerWithSpies } from '../../tests/mocks/logger';
import { catchH3Error, createFetchError } from '../../tests/unit/helpers/error';
import { convertFetchToH3Error, handleServiceError } from './error-handling';

describe('convertFetchToH3Error()', () => {
	it('passes FetchError status message correctly', () => {
		const fetchError = createFetchError({
			statusCode: StatusCodes.UNAUTHORIZED,
			statusMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED),
		});

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe(getReasonPhrase(StatusCodes.UNAUTHORIZED));
	});

	it('uses statusCode when no statusMessage is provided', () => {
		const fetchError = createFetchError({
			statusCode: StatusCodes.NOT_FOUND,
		});

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe(getReasonPhrase(StatusCodes.NOT_FOUND));
	});

	it('handles FetchError without statusCode or statusMessage', () => {
		const fetchError = createFetchError();

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
	});

	it('preserves string data from FetchError', () => {
		const stringData = 'Error details from API';
		const fetchError = createFetchError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
		fetchError.data = stringData;

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.data).toBe(stringData);
	});

	it('converts object data from FetchError to JSON string', () => {
		const objectData = { message: 'Validation failed', fields: ['name', 'email'] };
		const fetchError = createFetchError({
			statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
			statusMessage: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
		});
		fetchError.data = objectData;

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.data).toBe(JSON.stringify(objectData));
	});

	it('handles FetchError without data', () => {
		const fetchError = createFetchError({
			statusCode: StatusCodes.FORBIDDEN,
			statusMessage: getReasonPhrase(StatusCodes.FORBIDDEN),
		});
		fetchError.data = undefined;

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.data).toBeUndefined();
	});
});

describe('handleServiceError()', () => {
	let mockLogger: Logger;
	let loggerErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		const mockLoggerSetup = createMockLoggerWithSpies();

		mockLogger = mockLoggerSetup.logger;
		loggerErrorSpy = mockLoggerSetup.errorSpy;
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('logs error and re-throws H3Error', () => {
		const h3Error = createError({
			statusCode: StatusCodes.FORBIDDEN,
			statusMessage: getReasonPhrase(StatusCodes.FORBIDDEN),
		});

		const serviceName = 'testService';

		const caughtError = catchH3Error(() => {
			handleServiceError(h3Error, serviceName, mockLogger, 'Failed to complete operation');
		});

		expect(loggerErrorSpy).toHaveBeenCalledWith(serviceName, 'Failed to complete operation', h3Error);

		expect(caughtError?.statusCode).toBe(StatusCodes.FORBIDDEN);
		expect(caughtError?.statusMessage).toBe(getReasonPhrase(StatusCodes.FORBIDDEN));
	});

	it('logs error with custom message', () => {
		const h3Error = createError({
			statusCode: StatusCodes.NOT_FOUND,
			statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
		});

		const serviceName = 'testService';
		const customMessage = 'Custom error message';

		catchH3Error(() => {
			handleServiceError(h3Error, serviceName, mockLogger, customMessage);
		});

		expect(loggerErrorSpy).toHaveBeenCalledWith(serviceName, customMessage, h3Error);
	});

	it('logs and re-throws generic Error types', () => {
		const genericError = new Error('Generic error');
		const serviceName = 'testService';

		const caughtError = catchH3Error(() => {
			handleServiceError(genericError, serviceName, mockLogger, 'Failed to complete operation');
		});

		expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

		expect(caughtError).toBe(genericError);
	});
});
