import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { catchH3Error, createFetchError } from '../../tests/helpers/error';
import { setupDirectLoggerMock } from '../../tests/mocks/logger';
import { convertFetchToH3Error, handleServiceError, isFetchError, isH3NotFoundError, isH3UnauthorizedError } from './error-handling';

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
		const { loggerErrorSpy: errorSpy, mockLogger: logger } = setupDirectLoggerMock();
		loggerErrorSpy = errorSpy;
		mockLogger = logger;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('logs error and re-throws H3Error', () => {
		const h3Error = createError({
			statusCode: StatusCodes.FORBIDDEN,
			statusMessage: getReasonPhrase(StatusCodes.FORBIDDEN),
		});

		const caughtError = catchH3Error(() => {
			handleServiceError(mockLogger, h3Error, 'Failed to complete operation');
		});

		expect(loggerErrorSpy).toHaveBeenCalledWith('Failed to complete operation', h3Error);

		expect(caughtError?.statusCode).toBe(StatusCodes.FORBIDDEN);
		expect(caughtError?.statusMessage).toBe(getReasonPhrase(StatusCodes.FORBIDDEN));
	});

	it('logs error with custom message', () => {
		const h3Error = createError({
			statusCode: StatusCodes.NOT_FOUND,
			statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
		});

		const customMessage = 'Custom error message';

		catchH3Error(() => {
			handleServiceError(mockLogger, h3Error, customMessage);
		});

		expect(loggerErrorSpy).toHaveBeenCalledWith(customMessage, h3Error);
	});

	it('logs and re-throws generic Error types', () => {
		const genericError = new Error('Generic error');

		const caughtError = catchH3Error(() => {
			handleServiceError(mockLogger, genericError, 'Failed to complete operation');
		});

		expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

		expect(caughtError).toBe(genericError);
	});
});

describe('isFetchError()', () => {
	it('correctly identifies valid FetchError objects', () => {
		const fetchError = createFetchError({
			statusCode: StatusCodes.NOT_FOUND,
			statusMessage: 'Not Found',
		});

		expect(isFetchError(fetchError)).toBe(true);
	});

	it('returns false for H3Error objects', () => {
		const h3Error = createError({
			statusCode: StatusCodes.NOT_FOUND,
			statusMessage: 'Not Found',
		});

		expect(isFetchError(h3Error)).toBe(false);
	});

	it('returns false for objects missing required properties', () => {
		// Missing statusCode and message
		const invalidError1 = { name: 'FetchError' };

		// Missing message
		const invalidError2 = { name: 'FetchError', statusCode: StatusCodes.NOT_FOUND };

		// Missing statusCode
		const invalidError3 = { name: 'FetchError', message: 'Error' };

		// Wrong name
		const invalidError4 = { name: 'SomeOtherError', statusCode: StatusCodes.NOT_FOUND, message: 'Error' };

		expect(isFetchError(invalidError1)).toBe(false);
		expect(isFetchError(invalidError2)).toBe(false);
		expect(isFetchError(invalidError3)).toBe(false);
		expect(isFetchError(invalidError4)).toBe(false);
	});

	it('returns false for undefined and primitive values', () => {
		expect(isFetchError(undefined)).toBe(false);
		expect(isFetchError('string')).toBe(false);
		expect(isFetchError(StatusCodes.NOT_FOUND)).toBe(false);
		expect(isFetchError(true)).toBe(false);
	});

	it('validates statusCode is a number', () => {
		const invalidError = {
			name: 'FetchError',
			statusCode: 'not-a-number',
			message: 'Not Found',
		};

		expect(isFetchError(invalidError)).toBe(false);
	});

	it('validates message is a string', () => {
		const invalidError = {
			name: 'FetchError',
			statusCode: StatusCodes.NOT_FOUND,
			message: 404,
		};

		expect(isFetchError(invalidError)).toBe(false);
	});
});

describe('isH3NotFoundError()', () => {
	it('correctly identifies H3Error with 404 status code', () => {
		const h3Error = createError({
			statusCode: StatusCodes.NOT_FOUND,
			statusMessage: 'Not Found',
		});

		expect(isH3NotFoundError(h3Error)).toBe(true);
	});

	it('returns false for H3Error with non-404 status codes', () => {
		const h3Error500 = createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Internal Server Error',
		});

		const h3Error400 = createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: 'Bad Request',
		});

		expect(isH3NotFoundError(h3Error500)).toBe(false);
		expect(isH3NotFoundError(h3Error400)).toBe(false);
	});

	it('returns false for FetchError objects', () => {
		const fetchError = createFetchError({
			statusCode: StatusCodes.NOT_FOUND,
			statusMessage: 'Not Found',
		});

		expect(isH3NotFoundError(fetchError)).toBe(false);
	});

	it('returns false for non-error objects', () => {
		expect(isH3NotFoundError(undefined)).toBe(false);
		expect(isH3NotFoundError({})).toBe(false);
		expect(isH3NotFoundError('error')).toBe(false);
		expect(isH3NotFoundError(404)).toBe(false);
	});

	it('returns false for generic Error objects', () => {
		const genericError = new Error('Generic error');

		expect(isH3NotFoundError(genericError)).toBe(false);
	});
});

describe('isH3UnauthorizedError()', () => {
	it('correctly identifies H3Error with 401 status code', () => {
		const h3Error = createError({
			statusCode: StatusCodes.UNAUTHORIZED,
			statusMessage: 'Unauthorized',
		});

		expect(isH3UnauthorizedError(h3Error)).toBe(true);
	});

	it('returns false for H3Error with non-401 status codes', () => {
		const h3Error404 = createError({
			statusCode: StatusCodes.NOT_FOUND,
			statusMessage: 'Not Found',
		});

		const h3Error403 = createError({
			statusCode: StatusCodes.FORBIDDEN,
			statusMessage: 'Forbidden',
		});

		expect(isH3UnauthorizedError(h3Error404)).toBe(false);
		expect(isH3UnauthorizedError(h3Error403)).toBe(false);
	});

	it('returns false for FetchError objects', () => {
		const fetchError = createFetchError({
			statusCode: StatusCodes.UNAUTHORIZED,
			statusMessage: 'Unauthorized',
		});

		expect(isH3UnauthorizedError(fetchError)).toBe(false);
	});

	it('returns false for non-error objects', () => {
		expect(isH3UnauthorizedError(undefined)).toBe(false);
		expect(isH3UnauthorizedError({})).toBe(false);
		expect(isH3UnauthorizedError('error')).toBe(false);
		expect(isH3UnauthorizedError(401)).toBe(false);
	});

	it('returns false for generic Error objects', () => {
		const genericError = new Error('Generic error');

		expect(isH3UnauthorizedError(genericError)).toBe(false);
	});
});
