import { describe, expect, it } from 'vitest';
import { buildRequestConfig, getAuthHeader } from '../../madek-api';

describe('request configuration', () => {
	describe('getAuthHeader', () => {
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

	describe('buildRequestConfig', () => {
		it('returns empty config when no options are provided', () => {
			const result = buildRequestConfig();

			expect(result).toStrictEqual({ headers: undefined, query: undefined });
		});

		it('includes auth header when needsAuth is true', () => {
			const token = 'test-token';
			const result = buildRequestConfig({ needsAuth: true }, token);

			expect(result).toStrictEqual({
				headers: { Authorization: `token ${token}` },
				query: undefined,
			});
		});

		it('does not include auth header when needsAuth is false', () => {
			const token = 'test-token';
			const result = buildRequestConfig({ needsAuth: false }, token);

			expect(result).toStrictEqual({ headers: undefined, query: undefined });
		});

		it('includes query parameters when provided', () => {
			const query = { parameter1: 'value1', parameter2: 'value2' };
			const result = buildRequestConfig({ query });

			expect(result).toStrictEqual({ headers: undefined, query });
		});

		it('combines auth headers and query parameters when both are provided', () => {
			const token = 'test-token';
			const query = { parameter1: 'value1', parameter2: 'value2' };
			const result = buildRequestConfig({ needsAuth: true, query }, token);

			expect(result).toStrictEqual({
				headers: { Authorization: `token ${token}` },
				query,
			});
		});
	});
});
