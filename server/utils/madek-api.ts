import type { H3Event } from 'h3';
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { createError } from 'h3';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FetchError } from 'ofetch';
import { noCache } from '../constants/cache';

interface MadekApiOptions {
	needsAuth?: boolean;
	query?: NitroFetchOptions<NitroFetchRequest>['query'];
}

interface MadekApiRequestConfig {
	apiOptions?: MadekApiOptions;
	publicDataCache?: CacheOptions;
}

export interface MadekApiConfig {
	baseUrl: string;
	token?: string;
}

export function generateCacheKey(endpoint: string, query?: Record<string, string>): string {
	const queryString = Object.keys(query ?? {}).length > 0
		? `?${new URLSearchParams(query).toString()}`
		: '';

	const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
	const rawKey = `${normalizedEndpoint}${queryString}`;
	const safeKey = rawKey
		.replaceAll('/', ':')
		.replaceAll('?', ':')
		.replaceAll('=', ':')
		.replaceAll('&', '.');

	return safeKey;
}

export function handleFetchError(error: FetchError): void {
	throw createError({
		statusCode: error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
		statusMessage:
			error.statusMessage
			?? error.statusText
			?? getReasonPhrase(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR),
	});
}

export function getAuthHeader(token?: string): Record<string, string> | undefined {
	if (token === undefined || token === '') {
		return undefined;
	}

	return { Authorization: `token ${token}` };
}

export function buildRequestConfig(apiOptions: MadekApiOptions = {}, token?: string): NitroFetchOptions<NitroFetchRequest> {
	return {
		headers: apiOptions.needsAuth ? getAuthHeader(token) : undefined,
		query: apiOptions.query,
	};
}

export async function fetchData<T>(
	url: string,
	apiOptions: MadekApiOptions = {},
	token?: string,
): Promise<T> {
	try {
		const response = await $fetch<T>(url, buildRequestConfig(apiOptions, token));
		return response as T;
	}
	catch (error) {
		// Only pass FetchError types to the handler
		if (error instanceof FetchError) {
			handleFetchError(error);
		}
		throw error;
	}
}

export function shouldUseCaching(
	isAuthNeeded: boolean,
	cacheOptions?: CacheOptions,
	isDevelopment = import.meta.dev,
): boolean {
	return !isDevelopment && !isAuthNeeded && cacheOptions !== undefined;
}

export function createMadekApiClient<T>(event: H3Event): {
	fetchFromApi: (endpoint: string, apiRequestConfig?: MadekApiRequestConfig) => Promise<T>;
} {
	const runtimeConfig = useRuntimeConfig(event);
	const config: MadekApiConfig = {
		baseUrl: runtimeConfig.public.madekApi.baseUrl,
		token: runtimeConfig.madekApi.token,
	};

	async function fetchFromApi(endpoint: string, apiRequestConfig: MadekApiRequestConfig = {}): Promise<T> {
		const url = `${config.baseUrl}${endpoint}`;
		const isAuthNeeded = apiRequestConfig.apiOptions?.needsAuth === true;
		const cacheOptions = apiRequestConfig.publicDataCache;

		if (isAuthNeeded && apiRequestConfig.publicDataCache !== noCache) {
			console.warn(
				`[madek-api] Warning: Authenticated requests should only use 'noCache' for publicDataCache (or none at all). Other cache configurations are ignored. Request: ${endpoint}`,
			);
		}

		if (shouldUseCaching(isAuthNeeded, cacheOptions)) {
			return defineCachedFunction(
				async () => fetchData<T>(url, apiRequestConfig.apiOptions || {}, config.token),
				{
					...cacheOptions,
					name: 'madek-api',
					getKey: () => generateCacheKey(endpoint, apiRequestConfig.apiOptions?.query || {}),
				},
			)();
		}

		return fetchData<T>(url, apiRequestConfig.apiOptions || {}, config.token);
	}

	return { fetchFromApi };
}
