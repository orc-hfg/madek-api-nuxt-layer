import type { FetchContext, FetchRequest } from 'ofetch';
import { describe, expect, it, vi } from 'vitest';
import { TEST_COOKIE } from '../../shared/constants/test';
import { createMockLogger } from '../../tests/mocks/logger';
import { forwardCookieHeaders } from './request-helpers';

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

	const mockGetRequestHeaders = vi.fn(((headers?: string[]) => {
		if (!hasCookie) {
			return {};
		}

		if (headers?.includes('cookie')) {
			return {
				cookie,
			};
		}

		return {};
	}) as typeof useRequestHeaders);

	const mockLogger = createMockLogger();

	return {
		mockContext,
		mockGetRequestHeaders,
		mockLogger,
		testCookie: cookie,
	};
}

describe('forwardCookieHeaders()', () => {
	it('forwards cookie headers when on server and cookie exists', () => {
		const { mockContext, mockGetRequestHeaders, mockLogger, testCookie } = setupTestContext();

		const result = forwardCookieHeaders(
			mockContext,
			{
				getRequestHeaders: mockGetRequestHeaders,
				isServerEnvironment: true,
				logger: mockLogger,
			},
		);

		expect(result).toBe(true);
		expect(mockContext.options.headers.get('cookie')).toBe(testCookie);
		expect(mockGetRequestHeaders).toHaveBeenCalledWith(['cookie']);
		expect(mockLogger.info).toHaveBeenCalledWith('Utility: request-helpers', 'Cookie header forwarded.');
	});

	it('returns false when on client side', () => {
		const { mockContext, mockGetRequestHeaders, mockLogger } = setupTestContext();

		const result = forwardCookieHeaders(
			mockContext,
			{
				getRequestHeaders: mockGetRequestHeaders,
				isServerEnvironment: false,
				logger: mockLogger,
			},
		);

		expect(result).toBe(false);
		expect(mockContext.options.headers.get('cookie')).toBeNull();
		expect(mockGetRequestHeaders).not.toHaveBeenCalled();
		expect(mockLogger.info).not.toHaveBeenCalled();
	});

	it('returns false when no cookie is found', () => {
		const { mockContext, mockGetRequestHeaders, mockLogger } = setupTestContext({
			hasCookie: false,
		});

		const result = forwardCookieHeaders(
			mockContext,
			{
				getRequestHeaders: mockGetRequestHeaders,
				isServerEnvironment: true,
				logger: mockLogger,
			},
		);

		expect(result).toBe(false);
		expect(mockContext.options.headers.get('cookie')).toBeNull();
		expect(mockGetRequestHeaders).toHaveBeenCalledWith(['cookie']);
		expect(mockLogger.info).toHaveBeenCalledWith('Utility: request-helpers', 'No cookie header found to forward.');
	});

	it('handles existing headers properly', () => {
		const existingHeaders = new Headers();
		existingHeaders.set('content-type', 'application/json');

		const { mockContext, mockGetRequestHeaders, mockLogger, testCookie } = setupTestContext({
			initialHeaders: existingHeaders,
		});

		forwardCookieHeaders(
			mockContext,
			{
				getRequestHeaders: mockGetRequestHeaders,
				isServerEnvironment: true,
				logger: mockLogger,
			},
		);

		expect(mockContext.options.headers.get('content-type')).toBe('application/json');
		expect(mockContext.options.headers.get('cookie')).toBe(testCookie);
		expect(mockLogger.info).toHaveBeenCalledWith('Utility: request-helpers', 'Cookie header forwarded.');
	});
});
