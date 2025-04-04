import type { H3Event } from 'h3';
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { createError } from 'h3';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FetchError } from 'ofetch';

interface MadekApiOptions {
	needsAuth?: boolean;
	query?: NitroFetchOptions<NitroFetchRequest>['query'];
}

interface MadekApiRequestConfig {
	apiOptions?: MadekApiOptions;
	publicDataCache?: CacheOptions;
}

function handleFetchError(error: unknown): void {
	if (error instanceof FetchError) {
		throw createError({
			statusCode: error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage:
				error.statusMessage
				?? error.statusText
				?? getReasonPhrase(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR),
		});
	}

	throw error;
}

export function createMadekApiClient<T>(event: H3Event): {
	fetchFromApi: (endpoint: string, apiRequestConfig?: MadekApiRequestConfig) => Promise<T>;
} {
	const runtimeConfig = useRuntimeConfig(event);

	function getAuthHeader(): Record<string, string> | undefined {
		const token = runtimeConfig.madekApi.token;

		return token ? { Authorization: `token ${token}` } : undefined;
	}

	function buildRequestConfig(apiOptions: MadekApiOptions = {}): NitroFetchOptions<NitroFetchRequest> {
		return {
			headers: apiOptions.needsAuth ? getAuthHeader() : undefined,
			query: apiOptions.query,
		};
	}

	async function fetchData<T>(url: string, apiOptions: MadekApiOptions = {}): Promise<T> {
		try {
			const response = await $fetch<T>(url, buildRequestConfig(apiOptions));

			return response as T;
		}
		catch (error) {
			handleFetchError(error);
			throw error; // Explicit fallback throw to satisfy TypeScript
		}
	}

	async function fetchFromApi<T>(endpoint: string, apiRequestConfig: MadekApiRequestConfig = {}): Promise<T> {
		const url = `${runtimeConfig.public.madekApi.baseUrl}${endpoint}`;

		// Authentication disables caching - shouldSkipCache ensures authenticated requests are never cached
		const isAuthNeeded = apiRequestConfig.apiOptions?.needsAuth === true;
		const shouldSkipCache = import.meta.dev || isAuthNeeded;

		if (isAuthNeeded && apiRequestConfig.publicDataCache !== noCache) {
			console.warn(
				`[madek-api] Warning: Authenticated requests should only use 'noCache' for publicDataCache (or none at all). Other cache configurations are ignored. Request: ${endpoint}`,
			);
		}

		const cacheOptions = apiRequestConfig.publicDataCache;
		const shouldUseCache = !shouldSkipCache && cacheOptions !== undefined;

		if (shouldUseCache) {
			return defineCachedFunction(
				async () => fetchData<T>(url, apiRequestConfig.apiOptions || {}),
				{
					...cacheOptions,
					name: 'madek-api',
					getKey: (): string => {
						const query = apiRequestConfig.apiOptions?.query || {};
						const queryString = Object.keys(query).length > 0
							? `?${new URLSearchParams(query).toString()}`
							: '';
						const rawKey = `${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}${queryString}`;
						const safeKey = rawKey
							.replaceAll('/', ':')
							.replaceAll('?', ':')
							.replaceAll('=', ':')
							.replaceAll('&', '.');

						return safeKey;
					},
				},
			)();
		}

		return fetchData<T>(url, apiRequestConfig.apiOptions || {});
	}

	return {
		fetchFromApi,
	};
}
