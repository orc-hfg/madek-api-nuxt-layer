import { describe, expect, it } from 'vitest';
import { buildRequestConfig, getAuthHeader } from '../../madek-api';
import { mockEvent } from './api-test-helpers';

describe('getAuthHeader()', () => {
	it('returns undefined when token is undefined', () => {
		const result = getAuthHeader();

		expect(result).toBeUndefined();
	});

	it('returns undefined when token is empty string', () => {
		const result = getAuthHeader('');

		expect(result).toBeUndefined();
	});

	it('returns correctly formatted auth header when token is provided', () => {
		const token = 'test-token-123';
		const result = getAuthHeader(token);

		expect(result).toBeDefined();
		expect(result).toStrictEqual({ Authorization: `token ${token}` });
	});
});

describe('buildRequestConfig()', () => {
	describe('in development mode', () => {
		it('returns empty config when no options are provided', () => {
			const result = buildRequestConfig(mockEvent, {}, undefined, true);

			expect(result).toStrictEqual({});
		});

		it('includes auth header when isAuthenticationNeeded is true', () => {
			const token = 'test-token';
			const result = buildRequestConfig(mockEvent, { isAuthenticationNeeded: true }, token, true);

			expect(result).toStrictEqual({
				headers: { Authorization: `token ${token}` },
			});
		});

		it('does not include auth header when isAuthenticationNeeded is false', () => {
			const token = 'test-token';
			const result = buildRequestConfig(mockEvent, { isAuthenticationNeeded: false }, token, true);

			expect(result).toStrictEqual({});
		});

		it('includes query parameters when provided', () => {
			const query = { parameter1: 'value1', parameter2: 'value2' };
			const result = buildRequestConfig(mockEvent, { query }, undefined, true);

			expect(result).toStrictEqual({ query });
		});

		it('combines auth headers and query parameters when both are provided', () => {
			const token = 'test-token';
			const query = { parameter1: 'value1', parameter2: 'value2' };
			const result = buildRequestConfig(mockEvent, { isAuthenticationNeeded: true, query }, token, true);

			expect(result).toStrictEqual({
				headers: { Authorization: `token ${token}` },
				query,
			});
		});
	});

	describe('in production mode', () => {
		it('returns empty config when no options are provided', () => {
			const result = buildRequestConfig(mockEvent, {}, undefined, false);

			expect(result).toStrictEqual({});
		});

		it('includes cookie header when isAuthenticationNeeded is true', () => {
			const token = 'test-token';
			const result = buildRequestConfig(mockEvent, { isAuthenticationNeeded: true }, token, false);

			expect(result).toStrictEqual({
				headers: { cookie: 'test-cookie=123' },
			});
		});

		it('includes only query parameters when authentication is not needed', () => {
			const query = { parameter1: 'value1', parameter2: 'value2' };
			const result = buildRequestConfig(mockEvent, { query }, undefined, false);

			expect(result).toStrictEqual({ query });
		});

		it('includes both query parameters and cookie headers when authentication is needed', () => {
			const token = 'test-token';
			const query = { parameter1: 'value1', parameter2: 'value2' };
			const result = buildRequestConfig(mockEvent, { isAuthenticationNeeded: true, query }, token, false);

			expect(result).toStrictEqual({
				headers: { cookie: 'test-cookie=123' },
				query,
			});
		});
	});
});
