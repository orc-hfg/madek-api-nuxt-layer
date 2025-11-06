import type { H3Event } from 'h3';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { AllowedCacheOptions } from '../constants/cache';
import { getRequestHeaders } from 'h3';
import { isDevelopmentEnvironment as defaultIsDevelopmentEnvironment } from '../../shared/utils/environment';
import { noCache } from '../constants/cache';
import { isFetchError } from './error-handling';
import { createServerLogger } from './server-logger';

const LOGGER_SOURCE = 'Utility: madekApi';

type QueryParameters = Record<string, string>;

type HttpHeaders = Record<string, string>;

export type PathParameters = Record<string, string>;

export interface MadekApiOptions {
	isAuthenticationNeeded: boolean;
	query?: NitroFetchOptions<NitroFetchRequest>['query'];
}

export interface MadekApiRequestConfig {
	apiOptions: MadekApiOptions;
	publicDataCache: AllowedCacheOptions;
}

export function generateCacheKey(endpoint: string, query?: QueryParameters): string {
	// Ensure query parameters are consistently ordered by sorting them alphabetically
	const sortedQuery: QueryParameters = {};
	if (query) {
		for (const key of Object.keys(query)
			.toSorted((a, b) => a.localeCompare(b))) {
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

export function getAuthenticationHeaders(event: H3Event, apiToken?: string, isDevelopmentEnvironment = defaultIsDevelopmentEnvironment): HttpHeaders {
	const serverLogger = createServerLogger(event, LOGGER_SOURCE);
	const headers: HttpHeaders = {};

	// For development: use API token if available
	if (isDevelopmentEnvironment && isNonEmptyString(apiToken)) {
		serverLogger.info('Using API token for authentication.');
		headers.Authorization = `token ${apiToken}`;
	}

	// For production: forward cookie from request if available
	else if (!isDevelopmentEnvironment) {
		const { cookie } = getRequestHeaders(event);
		if (isNonEmptyString(cookie)) {
			serverLogger.info('Using cookie for authentication.');
			headers.cookie = cookie;
		}
	}

	return headers;
}

export function buildRequestConfig(
	event: H3Event,
	apiOptions: MadekApiOptions,
	apiToken?: string,
	isDevelopmentEnvironment = defaultIsDevelopmentEnvironment,
): NitroFetchOptions<NitroFetchRequest> {
	const { isAuthenticationNeeded, query } = apiOptions;
	const config: NitroFetchOptions<NitroFetchRequest> = {};

	if (query !== undefined) {
		config.query = query;
	}

	if (isAuthenticationNeeded) {
		const authenticationHeaders = getAuthenticationHeaders(event, apiToken, isDevelopmentEnvironment);
		if (Object.keys(authenticationHeaders).length > 0) {
			config.headers = authenticationHeaders;
		}
	}

	return config;
}

export async function fetchData<TResponse>(
	event: H3Event,
	url: string,
	apiOptions: MadekApiOptions,
	apiToken?: string,
	fetchFunction = $fetch,
	isDevelopmentEnvironment = defaultIsDevelopmentEnvironment,
): Promise<TResponse> {
	try {
		const requestConfig = buildRequestConfig(event, apiOptions, apiToken, isDevelopmentEnvironment);
		const response = await fetchFunction<TResponse>(url, requestConfig);

		return response as TResponse;
	}
	catch (error) {
		if (isFetchError(error)) {
			throw convertFetchToH3Error(error);
		}

		throw error;
	}
}

export function shouldUseCaching(isServerSideCachingEnabled: boolean, isAuthenticationNeeded: boolean, cacheOptions: AllowedCacheOptions): boolean {
	return isServerSideCachingEnabled
		&& !isAuthenticationNeeded
		&& cacheOptions !== noCache
		&& cacheOptions.maxAge > 0;
}

function replacePathParameters(template: string, parameters: PathParameters): string {
	let result = template;

	for (const [key, value] of Object.entries(parameters)) {
		result = result.replace(`:${key}`, value);
	}

	return result;
}

export function createMadekApiClient<TResponse>(event: H3Event, fetchDataFunction = fetchData): {
	fetchFromApi: (endpoint: string, apiRequestConfig: MadekApiRequestConfig) => Promise<TResponse>;
	fetchFromApiWithPathParameters: (endpointTemplate: string, endpointPathParameters: PathParameters, apiRequestConfig: MadekApiRequestConfig) => Promise<TResponse>;
} {
	const serverLogger = createServerLogger(event, LOGGER_SOURCE);
	const config = useRuntimeConfig(event);
	const publicConfig = config.public;
	const apiBaseURL = publicConfig.madekApi.baseURL;
	const apiToken = config.madekApi.token;

	async function fetchFromApi(endpoint: string, apiRequestConfig: MadekApiRequestConfig): Promise<TResponse> {
		const url = `${apiBaseURL}${endpoint}`;
		const isServerSideCachingEnabled = publicConfig.enableServerSideCaching;
		const { apiOptions, publicDataCache: cacheOptions } = apiRequestConfig;
		const { isAuthenticationNeeded } = apiOptions;

		if (isAuthenticationNeeded && cacheOptions !== noCache) {
			serverLogger.warn('Authenticated requests should use noCache for publicDataCache. Other cache configurations are ignored.', endpoint);
		}

		if (shouldUseCaching(isServerSideCachingEnabled, isAuthenticationNeeded, cacheOptions)) {
			serverLogger.info(`Using cache for request: ${endpoint}`, cacheOptions);

			return defineCachedFunction(
				async () => fetchDataFunction<TResponse>(event, url, apiOptions, apiToken),
				{
					...cacheOptions,
					name: 'madek-api',
					getKey: () => generateCacheKey(endpoint, apiOptions.query ?? {}),
				},
			)();
		}

		return fetchDataFunction<TResponse>(event, url, apiOptions, apiToken);
	}

	async function fetchFromApiWithPathParameters(endpointTemplate: string, endpointPathParameters: PathParameters, apiRequestConfig: MadekApiRequestConfig): Promise<TResponse> {
		const endpoint = replacePathParameters(endpointTemplate, endpointPathParameters);

		return fetchFromApi(endpoint, apiRequestConfig);
	}

	return { fetchFromApi, fetchFromApiWithPathParameters };
}
