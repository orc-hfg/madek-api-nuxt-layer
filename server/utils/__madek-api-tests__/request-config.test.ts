import { describe, expect, it } from 'vitest';
import { mockEvent } from '../../../tests/mocks/madek-api';
import { buildRequestConfig, getAuthenticationHeaders } from '../madek-api';

describe('getAuthenticationHeaders()', () => {
	it('returns empty object when token is undefined in development mode', () => {
		const result = getAuthenticationHeaders(mockEvent, undefined, true);

		expect(result).toBeDefined();
		expect(Object.keys(result)).toHaveLength(0);
		expect(result).toStrictEqual({});
	});

	it('returns empty object when token is empty string in development mode', () => {
		const result = getAuthenticationHeaders(mockEvent, '', true);

		expect(result).toBeDefined();
		expect(Object.keys(result)).toHaveLength(0);
		expect(result).toStrictEqual({});
	});

	it('returns Authorization header when token is provided in development mode', () => {
		const token = 'test-token-123';
		const result = getAuthenticationHeaders(mockEvent, token, true);

		expect(result).toBeDefined();
		expect(result).toStrictEqual({ Authorization: `token ${token}` });
	});

	it('returns cookie header in production mode', () => {
		const result = getAuthenticationHeaders(mockEvent, undefined, false);

		expect(result).toBeDefined();
		expect(result).toStrictEqual({ cookie: 'test-cookie=value123' });
	});
});

describe('buildRequestConfig()', () => {
	describe('in development mode', () => {
		it('returns empty config when no options are provided', () => {
			const result = buildRequestConfig(mockEvent, {}, undefined, true);

			expect(result).toStrictEqual({});
		});

		it('includes authentication header when isAuthenticationNeeded is true', () => {
			const token = 'test-token';
			const result = buildRequestConfig(mockEvent, { isAuthenticationNeeded: true }, token, true);

			expect(result).toStrictEqual({
				headers: { Authorization: `token ${token}` },
			});
		});

		it('does not include authentication header when isAuthenticationNeeded is false', () => {
			const token = 'test-token';
			const result = buildRequestConfig(mockEvent, { isAuthenticationNeeded: false }, token, true);

			expect(result).toStrictEqual({});
		});

		it('includes query parameters when provided', () => {
			const query = { parameter1: 'value1', parameter2: 'value2' };
			const result = buildRequestConfig(mockEvent, { query }, undefined, true);

			expect(result).toStrictEqual({ query });
		});

		it('combines authentication headers and query parameters when both are provided', () => {
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
				headers: { cookie: 'test-cookie=value123' },
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
				headers: { cookie: 'test-cookie=value123' },
				query,
			});
		});
	});
});
