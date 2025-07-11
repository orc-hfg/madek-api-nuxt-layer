import type { Logger } from '../../app/utils/logger';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockLoggerWithSpies } from '../../test/helpers/logger-mocks';
import { catchH3Error, createFetchError } from './__tests__/helpers';
import { convertFetchToH3Error, handleServiceError } from './error-handling';

describe('convertFetchToH3Error()', () => {
	it('passes FetchError status message correctly', () => {
		const fetchError = createFetchError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		});

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe('Unauthorized');
	});

	it('uses statusCode when no statusMessage is provided', () => {
		const fetchError = createFetchError({
			statusCode: 404,
		});

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe('Not Found');
	});

	it('handles FetchError without statusCode or statusMessage', () => {
		const fetchError = createFetchError();

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe('Internal Server Error');
	});

	it('preserves string data from FetchError', () => {
		const stringData = 'Error details from API';
		const fetchError = createFetchError({ statusCode: 400 });
		fetchError.data = stringData;

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.data).toBe(stringData);
	});

	it('converts object data from FetchError to JSON string', () => {
		const objectData = { message: 'Validation failed', fields: ['name', 'email'] };
		const fetchError = createFetchError({ statusCode: 422 });
		fetchError.data = objectData;

		const caughtError = catchH3Error(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.data).toBe(JSON.stringify(objectData));
	});

	it('handles FetchError without data', () => {
		const fetchError = createFetchError({ statusCode: 403 });
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

	it('logs error and converts FetchError to H3Error', () => {
		const fetchError = createFetchError({
			statusCode: 403,
			statusMessage: 'Forbidden',
		});

		const serviceName = 'testService';

		const caughtError = catchH3Error(() => {
			handleServiceError(fetchError, mockLogger, serviceName);
		});

		expect(loggerErrorSpy).toHaveBeenCalledWith(
			serviceName,
			'Failed to complete operation',
			fetchError,
		);

		expect(caughtError?.message).toBe('Forbidden');
	});

	it('logs error with custom message', () => {
		const fetchError = createFetchError({
			statusCode: 404,
		});

		const serviceName = 'testService';
		const customMessage = 'Custom error message';

		catchH3Error(() => {
			handleServiceError(fetchError, mockLogger, serviceName, customMessage);
		});

		expect(loggerErrorSpy).toHaveBeenCalledWith(
			serviceName,
			customMessage,
			fetchError,
		);
	});

	it('throws original error for non-FetchError types', () => {
		const originalError = new Error('Original error');
		const serviceName = 'testService';

		const caughtError = catchH3Error(() => {
			handleServiceError(originalError, mockLogger, serviceName);
		});

		expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

		expect(caughtError).toBe(originalError);
	});
});
