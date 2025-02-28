import type { H3Event } from 'h3';
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { createError } from 'h3';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FetchError } from 'ofetch';

export interface MadekApiOptions {
	needsAuth?: boolean;
	query?: NitroFetchOptions<NitroFetchRequest>['query'];
}

export interface MadekApiRequestConfig {
	apiOptions?: MadekApiOptions;
	cache?: CacheOptions;
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

export function useMadekApi<T>(event: H3Event): {
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
		const url = `${runtimeConfig.madekApi.baseUrl}${endpoint}`;

		async function fetchFunction(): Promise<T> {
			return fetchData<T>(url, apiRequestConfig.apiOptions || {});
		}

		// Do not cache in development or if caching is not configured
		if (import.meta.dev || !apiRequestConfig.cache) {
			return fetchFunction();
		}

		const cacheOptions = typeof apiRequestConfig.cache === 'object' ? apiRequestConfig.cache : {};
		return defineCachedFunction(fetchFunction, {
			...cacheOptions,
			getKey: cacheOptions.getKey ?? ((): string => event.path),
		})();
	}

	return {
		fetchFromApi,
	};
}
