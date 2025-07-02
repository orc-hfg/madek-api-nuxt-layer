import { describe, expect, it } from 'vitest';
import { catchError, createFetchError } from './__tests__/madek-api/test-helpers';
import { convertFetchToH3Error } from './error-handling';

describe('error handling', () => {
	it('passes FetchError status message correctly', () => {
		const fetchError = createFetchError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		});

		const caughtError = catchError(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe('Unauthorized');
	});

	it('uses statusCode when no statusMessage is provided', () => {
		const fetchError = createFetchError({
			statusCode: 404,
		});

		const caughtError = catchError(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe('Not Found');
	});

	it('handles FetchError without statusCode or statusMessage', () => {
		const fetchError = createFetchError();

		const caughtError = catchError(() => {
			throw convertFetchToH3Error(fetchError);
		});

		expect(caughtError?.message).toBe('Internal Server Error');
	});
});
