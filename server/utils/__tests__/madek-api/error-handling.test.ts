import { describe, expect, it } from 'vitest';
import { handleFetchError } from '../../madek-api';
import { catchError, createFetchError } from './test-helpers';

describe('error handling', () => {
	it('passes FetchError status message correctly', () => {
		const fetchError = createFetchError({
			message: 'Original message',
			statusCode: 401,
			statusMessage: 'Unauthorized',
		});

		const caughtError = catchError(() => {
			handleFetchError(fetchError);
		});

		expect(caughtError?.message).toBe('Unauthorized');
	});

	it('uses statusCode when no message is provided', () => {
		const fetchError = createFetchError({
			message: 'Network Error',
			statusCode: 404,
		});

		const caughtError = catchError(() => {
			handleFetchError(fetchError);
		});

		expect(caughtError?.message).toBe('Not Found');
	});

	it('handles FetchError without statusCode or statusMessage', () => {
		const fetchError = createFetchError({ message: 'Fetch Error' });

		const caughtError = catchError(() => {
			handleFetchError(fetchError);
		});

		expect(caughtError?.message).toBe('Internal Server Error');
	});

	it('uses statusText as fallback when statusMessage is missing', () => {
		const fetchError = createFetchError({
			message: 'Network Error',
			statusCode: 403,
			statusText: 'Forbidden Access',
		});

		const caughtError = catchError(() => {
			handleFetchError(fetchError);
		});

		expect(caughtError?.message).toBe('Forbidden Access');
	});
});
