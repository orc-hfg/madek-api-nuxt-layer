import type { H3Event } from 'h3';
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { createError } from 'h3';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FetchError } from 'ofetch';

export interface ApiOptions {
	needsAuth?: boolean;
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
	fetchFromApi: (endpoint: string, options?: ApiOptions) => Promise<T>;
} {
	const runtimeConfig = useRuntimeConfig(event);

	function getAuthHeader(): Record<string, string> | undefined {
		const token = runtimeConfig.madekApi.token;

		return token ? { Authorization: `token ${token}` } : undefined;
	}

	function buildRequestConfig(needsAuth: boolean): NitroFetchOptions<NitroFetchRequest> {
		return {
			headers: needsAuth ? getAuthHeader() : undefined,
		};
	}

	async function fetchData<T>(url: string, options: ApiOptions): Promise<T> {
		try {
			const response = await $fetch<T>(url, buildRequestConfig(options.needsAuth ?? false));

			return response as T;
		}
		catch (error) {
			handleFetchError(error);
			throw error; // Explicit fallback throw to satisfy TypeScript
		}
	}

	async function fetchFromApi<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
		const url = `${runtimeConfig.madekApi.baseUrl}${endpoint}`;

		async function fetchFunction(): Promise<T> {
			return fetchData<T>(url, options);
		}

		// Do not cache in development or if caching is not configured
		if (import.meta.dev || !options.cache) {
			return fetchFunction();
		}

		const cacheOptions = typeof options.cache === 'object' ? options.cache : {};
		return defineCachedFunction(fetchFunction, {
			...cacheOptions,
			getKey: cacheOptions.getKey ?? ((): string => event.path),
		})();
	}

	return { fetchFromApi };
}
