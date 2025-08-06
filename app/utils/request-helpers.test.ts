import type { FetchContext, FetchRequest } from 'ofetch';
import { describe, expect, it } from 'vitest';
import { TEST_COOKIE } from '../../shared/constants/test';
import { createMockLogger } from '../../tests/mocks/logger';
import { forwardCookieHeader } from './request-helpers';

const LOGGER_SOURCE = 'Utility: request-helpers';

function setupTestContext({
	initialHeaders = new Headers(),
	cookie = TEST_COOKIE,
	hasCookie = true,
} = {}) {
	const mockContext: FetchContext = {
		options: {
			headers: initialHeaders,
		},
		request: {} as FetchRequest,
	};

	const mockCookieHeader = hasCookie ? { cookie } : undefined;

	const mockLogger = createMockLogger();

	return {
		mockContext,
		mockCookieHeader,
		mockLogger,
		testCookie: cookie,
	};
}

describe('forwardCookieHeader()', () => {
	it('forwards cookie headers when on server and cookie exists', () => {
		const { mockContext, mockCookieHeader, mockLogger, testCookie } = setupTestContext();

		forwardCookieHeader(
			mockContext,
			{
				cookieHeader: mockCookieHeader,
				isServerEnvironment: true,
				logger: mockLogger,
			},
		);

		expect(mockContext.options.headers.get('cookie')).toBe(testCookie);
		expect(mockLogger.info).toHaveBeenCalledWith(LOGGER_SOURCE, 'Cookie header forwarded.');
	});

	it('returns false when on client side', () => {
		const { mockContext, mockCookieHeader, mockLogger } = setupTestContext();

		forwardCookieHeader(
			mockContext,
			{
				cookieHeader: mockCookieHeader,
				isServerEnvironment: false,
				logger: mockLogger,
			},
		);

		expect(mockContext.options.headers.get('cookie')).toBeNull();
		expect(mockLogger.info).not.toHaveBeenCalled();
	});

	it('returns false when no cookie is found', () => {
		const { mockContext, mockCookieHeader, mockLogger } = setupTestContext({
			hasCookie: false,
		});

		forwardCookieHeader(
			mockContext,
			{
				cookieHeader: mockCookieHeader,
				isServerEnvironment: true,
				logger: mockLogger,
			},
		);

		expect(mockContext.options.headers.get('cookie')).toBeNull();
		expect(mockLogger.info).toHaveBeenCalledWith(LOGGER_SOURCE, 'No cookie header found to forward.');
	});

	it('handles existing headers properly', () => {
		const existingHeaders = new Headers();
		existingHeaders.set('content-type', 'application/json');

		const { mockContext, mockCookieHeader, mockLogger, testCookie } = setupTestContext({
			initialHeaders: existingHeaders,
		});

		forwardCookieHeader(
			mockContext,
			{
				cookieHeader: mockCookieHeader,
				isServerEnvironment: true,
				logger: mockLogger,
			},
		);

		expect(mockContext.options.headers.get('content-type')).toBe('application/json');
		expect(mockContext.options.headers.get('cookie')).toBe(testCookie);
		expect(mockLogger.info).toHaveBeenCalledWith(LOGGER_SOURCE, 'Cookie header forwarded.');
	});
});
