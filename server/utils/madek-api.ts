import type { H3Event } from 'h3';
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
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
	isAuthenticationNeeded?: boolean;
	query?: NitroFetchOptions<NitroFetchRequest>['query'];
}

export interface MadekApiRequestConfig {
	apiOptions?: MadekApiOptions;
	publicDataCache?: CacheOptions;
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

export function getAuthenticationHeaders(
	event: H3Event,
	apiToken?: string,
	isDevelopmentEnvironment = defaultIsDevelopmentEnvironment,
): HttpHeaders {
	const serverLogger = createServerLogger(event, LOGGER_SOURCE);
	const headers: HttpHeaders = {};

	// For development: use API token if available
	if (isDevelopmentEnvironment && apiToken !== undefined && apiToken.trim() !== '') {
		serverLogger.info('Using API token for authentication.');
		headers.Authorization = `token ${apiToken}`;
	}

	// For production: forward cookie from request if available
	else if (!isDevelopmentEnvironment) {
		const { cookie } = getRequestHeaders(event);
		if (cookie !== undefined) {
			serverLogger.info('Using cookie for authentication.');
			headers.cookie = cookie;
		}
	}

	return headers;
}

export function buildRequestConfig(
	event: H3Event,
	apiOptions: MadekApiOptions = {},
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

export async function fetchData<T>(
	event: H3Event,
	url: string,
	apiOptions: MadekApiOptions = {},
	apiToken?: string,
	fetchFunction = $fetch,
	isDevelopmentEnvironment = defaultIsDevelopmentEnvironment,
): Promise<T> {
	try {
		const requestConfig = buildRequestConfig(event, apiOptions, apiToken, isDevelopmentEnvironment);
		const response = await fetchFunction<T>(url, requestConfig);

		return response as T;
	}
	catch (error) {
		if (isFetchError(error)) {
			throw convertFetchToH3Error(error);
		}

		throw error;
	}
}

export function shouldUseCaching(
	isServerSideCachingEnabled: boolean,
	isAuthenticationNeeded: boolean,
	cacheOptions?: CacheOptions,
): boolean {
	return isServerSideCachingEnabled && !isAuthenticationNeeded && cacheOptions !== undefined;
}

function replacePathParameters(template: string, parameters: PathParameters): string {
	let result = template;

	for (const [key, value] of Object.entries(parameters)) {
		result = result.replace(`:${key}`, value);
	}

	return result;
}

export function createMadekApiClient<T>(event: H3Event, fetchDataFunction = fetchData): {
	fetchFromApi: (endpoint: string, apiRequestConfig?: MadekApiRequestConfig) => Promise<T>;
	fetchFromApiWithPathParameters: (endpointTemplate: string, endpointPathParameters: PathParameters, apiRequestConfig?: MadekApiRequestConfig) => Promise<T>;
} {
	const serverLogger = createServerLogger(event, LOGGER_SOURCE);
	const config = useRuntimeConfig(event);
	const publicConfig = config.public;
	const apiBaseURL = publicConfig.madekApi.baseURL;
	const apiToken = config.madekApi.token;

	async function fetchFromApi(endpoint: string, apiRequestConfig: MadekApiRequestConfig = {}): Promise<T> {
		const url = `${apiBaseURL}${endpoint}`;
		const isServerSideCachingEnabled = publicConfig.enableServerSideCaching;
		const isAuthenticationNeeded = apiRequestConfig.apiOptions?.isAuthenticationNeeded === true;
		const cacheOptions = apiRequestConfig.publicDataCache;

		if (isAuthenticationNeeded && apiRequestConfig.publicDataCache !== noCache) {
			serverLogger.warn('Authenticated requests should only use \'noCache\' for publicDataCache (or none at all). Other cache configurations are ignored.', endpoint);
		}

		if (shouldUseCaching(isServerSideCachingEnabled, isAuthenticationNeeded, cacheOptions)) {
			serverLogger.info(`Using cache for request: ${endpoint}`, cacheOptions);

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

	async function fetchFromApiWithPathParameters(endpointTemplate: string, endpointPathParameters: PathParameters, apiRequestConfig: MadekApiRequestConfig = {}): Promise<T> {
		const endpoint = replacePathParameters(endpointTemplate, endpointPathParameters);

		return fetchFromApi(endpoint, apiRequestConfig);
	}

	return { fetchFromApi, fetchFromApiWithPathParameters };
}
