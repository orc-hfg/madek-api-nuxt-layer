import type { H3Event } from 'h3';
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { getRequestHeaders } from 'h3';
import { FetchError } from 'ofetch';
import { noCache } from '../constants/cache';
import { createLogger } from './logger';

export interface MadekApiOptions {
	needsAuth?: boolean;
	query?: NitroFetchOptions<NitroFetchRequest>['query'];
}

export interface MadekApiRequestConfig {
	apiOptions?: MadekApiOptions;
	publicDataCache?: CacheOptions;
}

export function generateCacheKey(endpoint: string, query?: Record<string, string>): string {
	// Ensure query parameters are consistently ordered by sorting them alphabetically
	const sortedQuery: Record<string, string> = {};
	if (query) {
		for (const key of Object.keys(query)
			.sort((a, b) => a.localeCompare(b))) {
			sortedQuery[key] = query[key] ?? '';
		}
	}

	const queryString = Object.keys(sortedQuery).length > 0
		? `?${new URLSearchParams(sortedQuery).toString()}`
		: '';

	const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
	const rawKey = `${normalizedEndpoint}${queryString}`;
	const safeKey = rawKey
		.replaceAll('/', ':')
		.replaceAll('?', ':')
		.replaceAll('=', ':')
		.replaceAll('&', ':');

	return safeKey;
}

export function getAuthHeader(apiToken?: string): Record<string, string> | undefined {
	if (apiToken === undefined || apiToken === '') {
		return undefined;
	}

	const logger = createLogger();
	logger.info('Utility: madekApi', 'getAuthHeader called with API token.');

	return { Authorization: `token ${apiToken}` };
}

export function buildRequestConfig(
	apiOptions: MadekApiOptions = {},
	apiToken?: string,
	isDevelopment = import.meta.dev,
): NitroFetchOptions<NitroFetchRequest> {
	if (isDevelopment) {
		return {
			headers: apiOptions.needsAuth ? getAuthHeader(apiToken) : undefined,
			query: apiOptions.query,
		};
	}

	return {
		query: apiOptions.query,
	};
}

export async function fetchData<T>(
	event: H3Event,
	url: string,
	apiOptions: MadekApiOptions = {},
	apiToken?: string,
	fetchFunction = $fetch,
	isDevelopment = import.meta.dev,
): Promise<T> {
	try {
		const requestConfig = buildRequestConfig(apiOptions, apiToken, isDevelopment);

		const logger = createLogger();
		logger.debug('Utility: madekApi', 'Request config:', requestConfig);

		const headers = getRequestHeaders(event);

		if (requestConfig.headers instanceof Headers && headers.cookie !== undefined) {
			requestConfig.headers.set('cookie', headers.cookie);
			logger.debug('Utility: madekApi', 'Forwarding request headers', requestConfig.headers);
		}

		const response = await fetchFunction<T>(url, requestConfig);

		return response as T;
	}
	catch (error) {
		if (error instanceof FetchError) {
			const logger = createLogger();
			logger.debug('Utility: madekApi', 'Failed to fetch data.', error);

			throw convertFetchToH3Error(error);
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

export function createMadekApiClient<T>(event: H3Event, fetchDataFunction = fetchData): {
	fetchFromApi: (endpoint: string, apiRequestConfig?: MadekApiRequestConfig) => Promise<T>;
	fetchFromApiWithPathParameters: (endpointTemplate: string, endpointPathParameters: Record<string, string>, apiRequestConfig?: MadekApiRequestConfig) => Promise<T>;
} {
	const config = useRuntimeConfig(event);
	const apiBaseURL = config.public.madekApi.baseURL;
	const apiToken = config.madekApi.token;

	async function fetchFromApi(endpoint: string, apiRequestConfig: MadekApiRequestConfig = {}): Promise<T> {
		const url = `${apiBaseURL}${endpoint}`;
		const isAuthNeeded = apiRequestConfig.apiOptions?.needsAuth === true;
		const cacheOptions = apiRequestConfig.publicDataCache;

		if (isAuthNeeded && apiRequestConfig.publicDataCache !== noCache) {
			const logger = createLogger();
			logger.warn('Utility: madekApi', 'Authenticated requests should only use \'noCache\' for publicDataCache (or none at all). Other cache configurations are ignored.', endpoint);
		}

		if (shouldUseCaching(isAuthNeeded, cacheOptions)) {
			return defineCachedFunction(
				async () => fetchDataFunction<T>(event, url, apiRequestConfig.apiOptions ?? {}, apiToken),
				{
					...cacheOptions,
					name: 'madek-api',
					getKey: () => generateCacheKey(endpoint, apiRequestConfig.apiOptions?.query ?? {}),
				},
			)();
		}

		return fetchDataFunction<T>(event, url, apiRequestConfig.apiOptions ?? {}, apiToken);
	}

	async function fetchFromApiWithPathParameters(endpointTemplate: string, endpointPathParameters: Record<string, string>, apiRequestConfig: MadekApiRequestConfig = {}): Promise<T> {
		let endpoint = endpointTemplate;

		for (const [key, value] of Object.entries(endpointPathParameters)) {
			endpoint = endpoint.replace(`:${key}`, value);
		}

		return fetchFromApi(endpoint, apiRequestConfig);
	}

	return { fetchFromApi, fetchFromApiWithPathParameters };
}
